'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { GiftSchema } from '@/schemas/index';
import { Category, Gift } from '@prisma/client';
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { createGiftToWishList } from '@/actions/data/wishlist';
import { useRouter } from 'next/navigation';
import { IoGiftOutline } from 'react-icons/io5';
import GiftForm from '@/components/GiftForm';

type CreateGiftFormProps = {
  wishlistId: string;
  categories?: Category[] | null;
};

function CreateGiftForm({ categories, wishlistId }: CreateGiftFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  //const formattedPrice = formatPrice(Number(gift.price));

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

    if (validatedFields.success) {
      try {
        const response = await createGiftToWishList(validatedFields.data);

        if (response.status === 'Success') {
          toast({
            title: 'Éxito! 🎁🗑️',
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
          router.push('/gifts?tab=predefinedGifts');
        } else {
          toast({
            title: 'Error',
            description: 'Ocurrío un error al intentar agregar el regalo',
            className: 'bg-white',
          });
        }
      } catch (error: any) {
        toast({
          title: 'Error',
          description:
            error.message || 'Ocurrío un error al intentar agregar el regalo',
          className: 'bg-white',
        });
      }
    } else {
      toast({
        title: 'Validation Error',
        description: 'Please check your input and try again.',
        className: 'bg-white',
      });
    }

    setIsLoading(false);
  };

  return (
    <GiftForm
      form={form}
      categories={categories}
      isLoading={isLoading}
      onSubmit={onSubmit}
    />
  );
}

export default CreateGiftForm;
