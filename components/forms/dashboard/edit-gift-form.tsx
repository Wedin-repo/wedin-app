import {
  deleteGiftFromWishList,
  editOrCreateGift,
} from '@/actions/data/wishlist';
import AddToWishListForm from '@/components/forms/shared/add-to-wishlist-form';
import GiftForm from '@/components/forms/shared/gift-form';
import { useToast } from '@/components/ui/use-toast';
import { uploadImageToAws } from '@/lib/s3';
import ringSvg from '@/public/images/rings.svg';
import {
  GiftParamSchema,
  GiftSchema,
  GiftWishListSchema,
} from '@/schemas/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Category, Gift } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

type EditGiftFormProps = {
  gift: Gift;
  wishlistId: string;
  categories: Category[];
  setIsOpen?: (value: boolean) => void;
};

function EditGiftForm({
  gift,
  categories,
  setIsOpen,
  wishlistId,
}: EditGiftFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(GiftSchema),
    defaultValues: {
      name: gift.name,
      categoryId: gift.categoryId,
      price: gift.price.toString(),
      isFavoriteGift: gift.isFavoriteGift,
      isGroupGift: gift.isGroupGift,
      wishListId: wishlistId,
      imageUrl: ringSvg,
    },
  });

  const { formState } = form;

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
  const handleRemoveGiftFromWishList = async () => {
    setIsLoading(true);

    const validatedFields = GiftWishListSchema.safeParse({
      giftId: gift.id,
      wishlistId: wishlistId,
    });

    if (!validatedFields.success) {
      toast({
        title: 'Error',
        description: 'Datos inválidos, por favor verifica tus datos.',
        variant: 'destructive',
      });

      setIsLoading(false);
      return;
    }

    const response = await deleteGiftFromWishList(validatedFields.data);

    if (response?.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: response.error,
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: 'Éxito! 🎁🗑',
      description: 'Regalo eliminado de tu lista',
      action: (
        <AddToWishListForm
          giftId={gift.id}
          wishlistId={wishlistId}
          variant="undoButton"
        />
      ),
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
      handleRemoveGiftFromWishList={handleRemoveGiftFromWishList}
      selectedFile={selectedFile}
      isLoading={isLoading}
      onSubmit={onSubmit}
      previewUrl={previewUrl}
      setPreviewUrl={setPreviewUrl}
      setSelectedFile={setSelectedFile}
    />
  );
}

export default EditGiftForm;
