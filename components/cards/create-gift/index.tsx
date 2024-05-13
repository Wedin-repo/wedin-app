'use client';

import { createGiftToWishList } from '@/actions/data/wishlist';
import { getS3ObjectUrl, getSignedURL } from '@/actions/upload-to-s3';
import GiftForm from '@/components/GiftForm';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { GiftSchema } from '@/schemas/forms';
import { GetObjectCommand } from '@aws-sdk/client-s3';
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

    if (!validatedFields.success) {
      toast({
        title: 'Validation Error',
        description: 'Please check your input and try again.',
        className: 'bg-white',
      });

      setIsLoading(false);
      return;
    }

    if (selectedFile) {
      const response = await getSignedURL(selectedFile.name);

      if (response.failure) {
        setError('Error al subir la imagen');
        setIsLoading(false);
        return;
      }

      const url = response?.success?.url;

      if (!url) {
        setError('Error al subir la imagen presigned URL');
        return;
      }

      const result = await fetch(url, {
        method: 'PUT',
        body: selectedFile,
        headers: {
          'Content-Type': selectedFile.type,
        },
      });

      if (result.ok) {
        const giftImageUrl = getS3ObjectUrl(selectedFile.name);
        console.log('giftImageUrl: ', giftImageUrl);
      }

      console.log('url: ', url);
      console.log('response: ', response);
      console.log('result: ', result);
    }

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
