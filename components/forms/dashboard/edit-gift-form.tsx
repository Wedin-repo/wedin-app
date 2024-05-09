import {
  deleteGiftFromWishList,
  editOrCreateGift,
} from '@/actions/data/wishlist';
import GiftForm from '@/components/GiftForm';
import AddToWishListForm from '@/components/cards/gifts/components/add-to-wishlist-form';
import { useToast } from '@/components/ui/use-toast';
import { formatPrice } from '@/lib/utils';
import { GiftSchema } from '@/schemas/index';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Category, Gift } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

type EditGiftFormProps = {
  gift: Gift;
  wishlistId: string;
  categories?: Category[] | null;
  setIsOpen?: (value: boolean) => void;
};

function EditGiftForm({
  gift,
  categories,
  setIsOpen,
  wishlistId,
}: EditGiftFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(GiftSchema),
    defaultValues: {
      id: gift.id,
      name: gift.name,
      categoryId: gift.categoryId,
      price: gift.price.toString(),
      isFavoriteGift: gift.isFavoriteGift,
      isGroupGift: gift.isGroupGift,
      wishListId: wishlistId,
    },
  });

  const { formState } = form;

  if (!categories) return null;

  const formattedPrice = formatPrice(Number(gift.price));

  const onSubmit = async (values: z.infer<typeof GiftSchema>) => {
    setIsLoading(true);
    if (!Object.keys(formState.dirtyFields).length) {
      if (setIsOpen) {
        setIsOpen(false);
      }
      setIsLoading(false);
      return;
    }

    const validatedFields = GiftSchema.safeParse(values);

    if (!validatedFields.success) {
      toast({
        title: 'Validation Error',
        description: 'Please check your input and try again.',
        className: 'bg-white',
      });

      return;
    }

    const response = await editOrCreateGift(validatedFields.data);

    if (response.status === 'Error') {
      toast({
        title: 'Error',
        description: response.message,
        className: 'bg-white',
      });
    } else {
      toast({
        title: 'Éxito! 🎁🎉',
        description: 'Regalo actualizado.',
        className: 'bg-white',
      });
    }

    if (setIsOpen) {
      setIsOpen(false);
    }
    setIsLoading(false);
  };

  const handleRemoveGiftFromWishList = async () => {
    setIsLoading(true);
    const formData = new FormData();

    formData.append('content', gift.id);
    try {
      const response = await deleteGiftFromWishList(wishlistId, formData);
      toast({
        title: response.status,
        description: response.message,
        action: (
          <AddToWishListForm
            giftId={gift.id}
            wishlistId={wishlistId}
            variant="undoButton"
          />
        ),
        className: 'bg-white',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description:
          error.message ||
          'An error occurred while deleting the gift from the wishlist.',
        className: 'bg-white',
      });
    }

    if (setIsOpen) {
      setIsOpen(false);
    }
    setIsLoading(false);
  };

  return (
    <GiftForm
      form={form}
      gift={gift}
      categories={categories}
      isLoading={isLoading}
      onSubmit={onSubmit}
      handleRemoveGiftFromWishList={handleRemoveGiftFromWishList}
      formattedPrice={formattedPrice}
    />
  );
}

export default EditGiftForm;
