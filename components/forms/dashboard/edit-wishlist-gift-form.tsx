import {
  createGift,
  editGift,
  updateGiftImageUrl,
  getGift,
} from '@/actions/data/gift';
import {
  createWishlistGift,
  deleteGiftFromWishlist,
  updateWishlistGift,
} from '@/actions/data/wishlist-gifts';
import GiftForm from '@/components/forms/shared/gift-form';
import { useToast } from '@/components/ui/use-toast';
import { uploadImageToAws } from '@/lib/s3';
import ringSvg from '@/public/images/rings.svg';
import { GiftFormSchema, GiftPostSchema } from '@/schemas/form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Category, Gift, WishlistGift } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

type EditWishlistGiftWithGiftFormProps = {
  categories: Category[];
  eventId: string;
  wishlistId: string;
  wishlistGift: WishlistGift & { gift: Gift };
  setIsOpen?: (value: boolean) => void;
};

function EditWishlistGiftWithGiftForm({
  categories,
  eventId,
  wishlistGift,
  wishlistId,
  setIsOpen,
}: EditWishlistGiftWithGiftFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { gift } = wishlistGift;

  const form = useForm({
    resolver: zodResolver(GiftFormSchema),
    defaultValues: {
      name: gift.name,
      categoryId: gift.categoryId,
      price: gift.price,
      isDefault: false,
      isEditedVersion: gift.isEditedVersion,
      sourceGiftId: gift.sourceGiftId ?? '',
      eventId: eventId,

      image: ringSvg,
      imageUrl: gift.imageUrl ?? '',

      isFavoriteGift: wishlistGift.isFavoriteGift,
      isGroupGift: wishlistGift.isGroupGift,
      wishlistId: wishlistId,
    },
  });

  const { formState } = form;

  const onSubmit = async (values: z.infer<typeof GiftFormSchema>) => {
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

    let newWishlistGift: WishlistGift | null = null;

    if (gift.isDefault) {
      giftResponse = await createGift({
        ...validatedParams.data,
        isEditedVersion: true,
        sourceGiftId: gift.id,
        isDefault: false,
      });

      if (giftResponse?.error || !giftResponse.giftId) {
        toast({
          title: 'Error',
          description: giftResponse.error,
          variant: 'destructive',
        });

        setIsLoading(false);
        return;
      }

      await deleteGiftFromWishlist({
        wishlistId: wishlistId,
        giftId: gift.id,
      });

      const createWishlistGiftResponse = await createWishlistGift({
        ...validatedParams.data,
        giftId: giftResponse.giftId,
        wishlistId: wishlistId,
      });

      if (createWishlistGiftResponse.error) {
        toast({
          title: 'Error',
          description: createWishlistGiftResponse.error,
          variant: 'destructive',
        });
      }

      if (createWishlistGiftResponse.wishlistGift) {
        newWishlistGift = createWishlistGiftResponse.wishlistGift;
      }
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

    if (selectedFile && formState.dirtyFields.image) {
      const uploadResponse = await uploadImageToAws({
        file: selectedFile,
        id: giftResponse.giftId,
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

    const latestGift = await getGift(giftResponse.giftId);

    if (!latestGift) {
      toast({
        title: 'Error',
        description:
          'Error obteniendo los datos del regalo para actualizar la url de la imagen.',
        variant: 'destructive',
      });

      setIsLoading(false);
      return;
    }

    if (
      (formState.dirtyFields.isGroupGift ||
        formState.dirtyFields.isFavoriteGift) &&
      newWishlistGift
    ) {
      const wishlistGiftResponse = await updateWishlistGift({
        ...validatedParams.data,
        wishlistGiftId: newWishlistGift.id,
        giftId: giftResponse.giftId,
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

      const updatedGift = await updateGiftImageUrl(
        latestGift.imageUrl,
        latestGift.id
      );

      if (updatedGift?.error) {
        return { error: updatedGift.error };
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

export default EditWishlistGiftWithGiftForm;
