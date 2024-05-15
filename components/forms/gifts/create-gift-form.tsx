'use client';

import { createWishListGift } from '@/actions/data/wishlist-gifts';
import GiftForm from '@/components/forms/shared/gift-form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { uploadImageToAws } from '@/lib/s3';
import ringSvg from '@/public/images/rings.svg';
import { GiftParamSchema, GiftSchema } from '@/schemas/forms';
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
    resolver: zodResolver(GiftSchema),
    defaultValues: {
      name: '',
      categoryId: '',
      price: '',
      isFavoriteGift: false,
      isGroupGift: false,
      wishlistId: wishlistId,
      eventId: eventId,
      imageUrl: ringSvg,
    },
  });

  const onSubmit = async (values: z.infer<typeof GiftSchema>) => {
    setIsLoading(true);
    const validatedFields = GiftSchema.safeParse(values);

    if (!validatedFields.success) {
      toast({
        title: 'Error',
        description: 'Datos inválidos, por favor verifica tus datos.',
        variant: 'destructive',
      });

      setIsLoading(false);
      return;
    }

    const validatedParams = GiftParamSchema.safeParse(validatedFields.data);

    if (!validatedParams.success) return null;

    const wishlistGiftResponse = await createWishListGift(validatedParams.data);

    if (wishlistGiftResponse.error || !wishlistGiftResponse.giftId) {
      toast({
        title: 'Error al crear el regalo',
        description: wishlistGiftResponse.error,
        variant: 'destructive',
      });

      setIsLoading(false);
      return;
    }

    if (selectedFile) {
      const uploadResponse = await uploadImageToAws({
        file: selectedFile,
        giftId: wishlistGiftResponse.giftId,
      });

      if (uploadResponse?.error) {
        toast({
          title: 'Error',
          description: uploadResponse.error,
          variant: 'destructive',
        });

        setIsLoading(false);
        return;
      }
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
    />
  );
}

export default CreateGiftForm;
