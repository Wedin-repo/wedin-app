import {
  deleteGiftFromWishList,
  editOrCreateGift,
} from '@/actions/data/wishlist';
import GiftForm from '@/components/GiftForm';
import AddToWishListForm from '@/components/forms/shared/add-to-wishlist-form';
import { useToast } from '@/components/ui/use-toast';
import { formatPrice } from '@/lib/utils';
import { GiftSchema, GiftWishListSchema } from '@/schemas/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Category, Gift } from '@prisma/client';
import { useRef, useState } from 'react';
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

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    const validatedFields = GiftWishListSchema.safeParse({
      giftId: gift.id,
      wishlistId: wishlistId,
    });

    if (!validatedFields.success) {
      toast({
        title: 'Error',
        description: 'Error al eliminar el regalo de la lista',
        className: 'bg-white',
      });

      return;
    }

    const response = await deleteGiftFromWishList(validatedFields.data);

    if (response.status === 'Error') {
      toast({
        title: 'Error',
        description:
          response.message ||
          'An error occurred while deleting the gift from the wishlist.',
        className: 'bg-white',
      });
    }

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

    if (setIsOpen) {
      setIsOpen(false);
    }
    setIsLoading(false);
  };

  return (
    <GiftForm
      categories={categories}
      form={form}
      formattedPrice={formattedPrice}
      gift={gift}
      handleRemoveGiftFromWishList={handleRemoveGiftFromWishList}
      isLoading={isLoading}
      onSubmit={onSubmit}
      selectedFile={selectedFile}
      setSelectedFile={setSelectedFile}
      previewUrl={previewUrl}
      setPreviewUrl={setPreviewUrl}
      setError={setError}
      error={error}
      fileInputRef={fileInputRef}
    />
  );
}

export default EditGiftForm;
