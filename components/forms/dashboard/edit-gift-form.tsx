import { editGift } from '@/actions/data/gift';
import { editWishlistGift } from '@/actions/data/wishlist-gifts';
import GiftForm from '@/components/forms/shared/gift-form';
import { useToast } from '@/components/ui/use-toast';
import { uploadImageToAws } from '@/lib/s3';
import ringSvg from '@/public/images/rings.svg';
import { GiftFormPostSchema, GiftPostSchema } from '@/schemas/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Category, Gift, WishListGift } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

type EditGiftFormProps = {
  categories: Category[];
  eventId: string;
  gift: Gift;
  wishlistId: string;
  wishlistGift: WishListGift;
  setIsOpen?: (value: boolean) => void;
};

function EditGiftForm({
  categories,
  eventId,
  gift,
  wishlistGift,
  wishlistId,
  setIsOpen,
}: EditGiftFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(GiftFormPostSchema),
    defaultValues: {
      name: gift.name,
      categoryId: gift.categoryId,
      price: gift.price,
      isDefault: gift.isDefault,
      isEditedVersion: gift.isEditedVersion,
      sourceGiftId: gift.sourceGiftId ?? '',
      eventId: eventId,

      imageUrl: ringSvg,

      isFavoriteGift: wishlistGift.isFavoriteGift,
      isGroupGift: wishlistGift.isGroupGift,
      wishlistId: wishlistId,
    },
  });

  const { formState } = form;

  const onSubmit = async (values: z.infer<typeof GiftFormPostSchema>) => {
    setIsLoading(true);
    if (!Object.keys(formState.dirtyFields).length) {
      setIsLoading(false);
      if (setIsOpen) {
        setIsOpen(false);
      }
      return;
    }

    const validatedParams = GiftPostSchema.safeParse(values);

    if (!validatedParams.success) {
      toast({
        title: 'Error',
        description: 'Datos inválidos, por favor verifica tus datos.',
        variant: 'destructive',
      });

      setIsLoading(false);
      return;
    }

    const giftResponse = await editGift(validatedParams.data, gift.id);

    if (giftResponse?.error) {
      toast({
        title: 'Error',
        description: giftResponse.error,
        variant: 'destructive',
      });

      setIsLoading(false);
      return;
    }

    if (selectedFile && !formState.dirtyFields.imageUrl) {
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

    if (
      formState.dirtyFields.isGroupGift ||
      formState.dirtyFields.isFavoriteGift
    ) {
      const wishlistGiftResponse = await editWishlistGift({
        ...validatedParams.data,
        id: wishlistGift.id,
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
    }

    toast({
      title: 'Éxito! 🎁🎉',
      description: 'Regalo actualizado.',
      className: 'bg-white',
    });

    if (setIsOpen) {
      // setIsOpen(false);
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
