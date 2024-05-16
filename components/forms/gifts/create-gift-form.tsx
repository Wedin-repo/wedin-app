'use client';

import { createGift } from '@/actions/data/gift';
import { createWishlistGift } from '@/actions/data/wishlist-gifts';
import GiftForm from '@/components/forms/shared/gift-form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { uploadImageToAws } from '@/lib/s3';
import ringSvg from '@/public/images/rings.svg';
import { GiftFormSchema, GiftPostSchema } from '@/schemas/form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Category } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoGiftOutline } from 'react-icons/io5';
import type { z } from 'zod';

type CreateGiftFormProps = {
  eventId: string;
  wishlistId: string;
  categories: Category[];
};

function CreateGiftForm({
  eventId,
  categories,
  wishlistId,
}: CreateGiftFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(GiftFormSchema),
    defaultValues: {
      name: '',
      categoryId: '',
      price: '',
      isDefault: false,
      isEditedVersion: false,
      sourceGiftId: '',
      eventId: eventId,

      // Event though it si the url string in our DB
      // here is the actual image file object we dont
      // upload the image to mongoDB, we upload it to AWS
      // and save the url in our DB
      imageUrl: ringSvg,

      // Wishlist Gift params
      wishlistId: wishlistId,
      isFavoriteGift: false,
      isGroupGift: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof GiftFormSchema>) => {
    setIsLoading(true);
    const validatedFields = GiftPostSchema.safeParse(values);

    if (!validatedFields.success) {
      toast({
        title: 'Error',
        description: 'Datos inválidos, por favor verifica tus datos.',
        variant: 'destructive',
      });

      setIsLoading(false);
      return;
    }

    const giftResponse = await createGift(validatedFields.data);

    if (giftResponse.error || !giftResponse.giftId) {
      toast({
        title: 'Error al crear el regalo',
        description: giftResponse.error,
        variant: 'destructive',
      });

      setIsLoading(false);
      return;
    }

    if (selectedFile) {
      const uploadResponse = await uploadImageToAws({
        file: selectedFile,
        giftId: giftResponse.giftId,
      });

      if (uploadResponse?.error) {
        toast({
          title: 'Error',
          description: uploadResponse.error,
          variant: 'destructive',
        });

        setIsLoading(false);
      }
    }

    const wishlistGiftResponse = await createWishlistGift({
      giftId: giftResponse.giftId,
      wishlistId: validatedFields.data.wishlistId,
      isFavoriteGift: validatedFields.data.isFavoriteGift,
      isGroupGift: validatedFields.data.isGroupGift,
    });

    if (wishlistGiftResponse?.error) {
      toast({
        title: 'Error',
        description: wishlistGiftResponse.error,
        variant: 'destructive',
      });

      setIsLoading(false);
      return;
    }

    toast({
      title: 'Éxito! 🎁🎉',
      description: 'Regalo creado y agregado a tu lista.',
      action: (
        <Button
          onClick={() => router.push('/dashboard?page=1')}
          variant="outline"
          className="gap-1 px-3 h-8 hover:text-white border-borderColor hover:bg-primaryBackgroundColor"
        >
          <IoGiftOutline />
          Ver lista
        </Button>
      ),
      className: 'bg-white',
    });

    setIsLoading(false);
    setPreviewUrl(null);
    setSelectedFile(null);
    form.reset();
  };

  return (
    <GiftForm
      categories={categories}
      form={form}
      isLoading={isLoading}
      previewUrl={previewUrl}
      selectedFile={selectedFile}
      onSubmit={onSubmit}
      setPreviewUrl={setPreviewUrl}
      setSelectedFile={setSelectedFile}
      buttonLabel="Guardar y agregar regalo"
    />
  );
}

export default CreateGiftForm;
