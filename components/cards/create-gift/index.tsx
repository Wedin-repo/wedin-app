'use client';

import { createGiftToWishList } from '@/actions/data/wishlist';
import GiftForm from '@/components/GiftForm';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { GiftSchema } from '@/schemas/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Category } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoGiftOutline } from 'react-icons/io5';
import type { z } from 'zod';

type CreateGiftFormProps = {
  wishlistId: string;
  categories?: Category[] | null;
};

function CreateGiftForm({ categories, wishlistId }: CreateGiftFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

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
      return;
    }

    const response = await createGiftToWishList(validatedFields.data);

    if (response.status === 'Success') {
      toast({
        title: 'Éxito! 🎁🗑',
        description: response.message,
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
      form.reset();
      setIsLoading(false);
      return;
    }

    toast({
      title: 'Error',
      description: 'Ocurrío un error al intentar agregar el regalo',
      className: 'bg-white',
    });
    if (setIsLoading) {
      setIsLoading(false);
    }
  };

  return (
    <GiftForm
      form={form}
      categories={categories}
      isLoading={isLoading}
      onSubmit={onSubmit}
      buttonTitle={'Agregar regalo'}
    />
  );
}

export default CreateGiftForm;
