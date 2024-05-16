import { createGift, editGift } from '@/actions/data/gift';
import {
  addGiftToWishList,
  deleteGiftFromWishList,
  editWishlistGift,
} from '@/actions/data/wishlist-gifts';
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
  wishlistId: string;
  wishlistGift: WishListGift & { gift: Gift };
  setIsOpen?: (value: boolean) => void;
};

function EditGiftForm({
  categories,
  eventId,
  wishlistGift,
  wishlistId,
  setIsOpen,
}: EditGiftFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { gift } = wishlistGift;

  const form = useForm({
    resolver: zodResolver(GiftFormPostSchema),
    defaultValues: {
      name: gift.name,
      categoryId: gift.categoryId,
      price: gift.price,
      isDefault: false,
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

    let giftResponse:
      | {
          error: string;
          giftId?: undefined;
        }
      | {
          giftId: string;
          error?: undefined;
        };

    if (gift.isDefault) {
      // Create a new gift based on the default one
      const newGiftParams = {
        ...validatedParams.data,
        isEditedVersion: true,
        sourceGiftId: gift.id,
        isDefault: false,
      };

      giftResponse = await createGift(newGiftParams);

      if (giftResponse?.error || !giftResponse.giftId) {
        toast({
          title: 'Error',
          description: giftResponse.error,
          variant: 'destructive',
        });

        setIsLoading(false);
        return;
      }

      await deleteGiftFromWishList({
        wishlistId: wishlistId,
        giftId: gift.id,
      });

      await addGiftToWishList({
        ...validatedParams.data,
        giftId: giftResponse.giftId,
      });
    } else {
      giftResponse = await editGift(validatedParams.data, gift.id);
    }

    if (giftResponse?.error || !giftResponse.giftId) {
      toast({
        title: 'Error',
        description: giftResponse.error,
        variant: 'destructive',
      });

      setIsLoading(false);
      return;
    }

    if (selectedFile && formState.dirtyFields.imageUrl) {
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
      buttonLabel="Guardar"
    />
  );
}

export default EditGiftForm;
