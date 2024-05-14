import { updateGiftImageUrl } from '@/actions/data/gift';
import {
  deleteGiftFromWishList,
  editOrCreateGift,
} from '@/actions/data/wishlist';
import { getSignedURL } from '@/actions/upload-to-s3';
import AddToWishListForm from '@/components/forms/shared/add-to-wishlist-form';
import GiftForm from '@/components/forms/shared/gift-form';
import { useToast } from '@/components/ui/use-toast';
import { computeSHA256, formatPrice } from '@/lib/utils';
import ringSvg from '@/public/images/rings.svg';
import {
  GiftParamSchema,
  GiftSchema,
  GiftWishListSchema,
} from '@/schemas/forms';
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
      imageUrl: ringSvg,
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

    if (!validatedFields.success || !selectedFile) {
      toast({
        title: 'Validation Error',
        description: 'Please check your input and try again.',
        className: 'bg-white',
      });

      setIsLoading(false);
      return;
    }

    const validatedParams = GiftParamSchema.safeParse(validatedFields.data);

    if (!validatedParams.success) return null;

    const response = await editOrCreateGift(validatedParams.data);

    if (response?.error) {
      toast({
        title: 'Error',
        description: response.error,
        className: 'bg-white',
      });

      setIsLoading(false);
      return;
    }

    const checksum = await computeSHA256(selectedFile);

    const presignResponse = await getSignedURL({
      fileName: selectedFile.name,
      fileType: selectedFile.type,
      fileSize: selectedFile.size,
      giftId: validatedFields.data.id,
      checksum: checksum,
    });

    if (presignResponse.error || !presignResponse?.success) {
      setError('Error al subir la imagen');
      toast({
        variant: 'destructive',
        title: 'Error al conseguir presign URL',
        description: presignResponse.error,
      });

      setIsLoading(false);
      return;
    }

    const imageUrl = presignResponse.success.split('?')[0];

    const awsImagePosting = await fetch(imageUrl, {
      method: 'PUT',
      body: selectedFile,
      headers: {
        'Content-Type': selectedFile.type,
        metadata: JSON.stringify({ giftId: validatedFields.data.id }),
      },
    });

    if (!awsImagePosting.ok) {
      setError('Error al subir la imagen a AWS');
      toast({
        variant: 'destructive',
        title: 'error al subir la imagen a AWS',
        description: presignResponse.error,
      });

      setIsLoading(false);
      return;
    }

    await updateGiftImageUrl(imageUrl, validatedFields.data.id);

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
        description: 'Error al eliminar el regalo de la lista',
        className: 'bg-white',
      });

      setIsLoading(false);
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
      setIsLoading(false);
      return;
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
      error={error}
      fileInputRef={fileInputRef}
      form={form}
      formattedPrice={formattedPrice}
      gift={gift}
      handleRemoveGiftFromWishList={handleRemoveGiftFromWishList}
      selectedFile={selectedFile}
      isLoading={isLoading}
      onSubmit={onSubmit}
      wishlistId={wishlistId}
      previewUrl={previewUrl}
      setError={setError}
      setPreviewUrl={setPreviewUrl}
      setSelectedFile={setSelectedFile}
    />
  );
}

export default EditGiftForm;
