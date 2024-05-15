import { editOrCreateGift } from '@/actions/data/gift';
import GiftForm from '@/components/forms/shared/gift-form';
import { useToast } from '@/components/ui/use-toast';
import { uploadImageToAws } from '@/lib/s3';
import ringSvg from '@/public/images/rings.svg';
import { GiftPostSchema } from '@/schemas/forms';
import { GiftParamSchema } from '@/schemas/forms/params';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Category, Gift } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

type EditGiftFormProps = {
  gift: Gift;
  wishlistId: string;
  eventId: string;
  categories: Category[];
  setIsOpen?: (value: boolean) => void;
};

function EditGiftForm({
  gift,
  eventId,
  categories,
  setIsOpen,
  wishlistId,
}: EditGiftFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(GiftPostSchema),
    defaultValues: {
      name: gift.name,
      categoryId: gift.categoryId,
      price: gift.price,
      isFavoriteGift: false,
      isGroupGift: false,
      wishlistId: wishlistId,
      eventId: eventId,
      imageUrl: ringSvg,
    },
  });

  const { formState } = form;

  const onSubmit = async (values: z.infer<typeof GiftPostSchema>) => {
    setIsLoading(true);
    if (!Object.keys(formState.dirtyFields).length) {
      if (setIsOpen) {
        setIsOpen(false);
      }
      setIsLoading(false);
      return;
    }

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

    const validatedParams = GiftParamSchema.safeParse(validatedFields.data);

    if (!validatedParams.success) return null;

    const response = await editOrCreateGift(validatedParams.data, gift.id);

    if (response?.error) {
      toast({
        title: 'Error',
        description: response.error,
        variant: 'destructive',
      });

      setIsLoading(false);
      return;
    }

    if (selectedFile) {
      const uploadResponse = await uploadImageToAws({
        file: selectedFile,
        giftId: gift.id,
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
      description: 'Regalo actualizado.',
      className: 'bg-white',
    });

    if (setIsOpen) {
      setIsOpen(false);
    }

    setIsLoading(false);
  };

  return (
    <GiftForm
      categories={categories}
      form={form}
      gift={gift}
      isLoading={isLoading}
      previewUrl={previewUrl}
      selectedFile={selectedFile}
      onSubmit={onSubmit}
      setPreviewUrl={setPreviewUrl}
      setSelectedFile={setSelectedFile}
    />
  );
}

export default EditGiftForm;
