'use client';

import { updateGiftImageUrl } from '@/actions/data/gift';
import { createGiftToWishList } from '@/actions/data/wishlist';
import { getSignedURL } from '@/actions/upload-to-s3';
import GiftForm from '@/components/forms/shared/gift-form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { GiftSchema } from '@/schemas/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Category } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoGiftOutline } from 'react-icons/io5';
import type { z } from 'zod';

type CreateGiftFormProps = {
  wishlistId: string;
  categories?: Category[] | null;
};

const computeSHA256 = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

function CreateGiftForm({ categories, wishlistId }: CreateGiftFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    resolver: zodResolver(GiftSchema),
    defaultValues: {
      id: '',
      name: '',
      categoryId: '',
      price: '',
      isFavoriteGift: false,
      isGroupGift: false,
      wishListId: wishlistId,
    },
  });

  if (!categories) return null;

  const onSubmit = async (values: z.infer<typeof GiftSchema>) => {
    setIsLoading(true);
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

    const giftCreateResponse = await createGiftToWishList(validatedFields.data);

    if (giftCreateResponse.error || !giftCreateResponse.gift) {
      toast({
        variant: 'destructive',
        title: 'error al crear el regalo',
        description: giftCreateResponse.error,
      });

      setIsLoading(false);
      return;
    }

    const checksum = await computeSHA256(selectedFile);

    const presignResponse = await getSignedURL({
      fileName: selectedFile.name,
      fileType: selectedFile.type,
      fileSize: selectedFile.size,
      giftId: giftCreateResponse.gift.id,
      checksum: checksum,
    });

    if (presignResponse.error || !presignResponse?.success?.url) {
      setError('Error al subir la imagen');
      toast({
        variant: 'destructive',
        title: 'Error al conseguir presign URL',
        description: presignResponse.error,
      });

      setIsLoading(false);
      return;
    }

    const imageUrl = presignResponse.success.url.split('?')[0];

    const awsImagePosting = await fetch(imageUrl, {
      method: 'PUT',
      body: selectedFile,
      headers: {
        'Content-Type': selectedFile.type,
        metadata: JSON.stringify({ giftId: giftCreateResponse.gift.id }),
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

    await updateGiftImageUrl(imageUrl, giftCreateResponse.gift.id);

    toast({
      title: 'Éxito! 🎁🗑',
      description: giftCreateResponse.success,
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
    return;
  };

  return (
    <GiftForm
      categories={categories}
      form={form}
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

export default CreateGiftForm;
