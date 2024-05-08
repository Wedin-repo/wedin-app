'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GiftSchema } from '@/schemas/index';
import { Input } from '@/components/ui/input';
import { Category, Gift } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import ImageUpload from '@/components/ImageUpload';
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { formatPrice } from '@/utils/format';
import { Button } from '@/components/ui/button';
import AddToWishListForm from '@/components/cards/gifts/components/add-to-wishlist-form';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';
import { FiEdit3 } from 'react-icons/fi';
import { createGiftToWishList } from '@/actions/data/wishlist';
import { redirect, useRouter } from 'next/navigation';
import { IoGiftOutline } from 'react-icons/io5';

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-4 sm:gap-8 pt-6 lg:pt-0">
          <div className="w-full lg:w-1/2">
            <ImageUpload />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col gap-3 sm:gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombre del regalo"
                        className="!mt-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-normal text-yellow-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="!mb-[-5px]">Categoria</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="!mt-0">
                          <SelectValue placeholder="Selecciona una categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-60 bg-white">
                        {categories?.map(category => (
                          <div key={category.id}>
                            <SelectItem
                              value={category.id}
                              className="cursor-pointer"
                            >
                              {category.name}
                            </SelectItem>
                            {/* this is just a border for aesthetic purposes */}
                            <div
                              className="flex justify-center items-center w-5/6 border border-b-secondaryBorderColor"
                              style={{ margin: '0 auto' }}
                            ></div>
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="font-normal text-yellow-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Precio</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Valor del regalo"
                        type="number"
                        min="1"
                        className="!mt-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-normal text-yellow-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isFavoriteGift"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <FormLabel className="text-base font-normal">
                      Marcar como el que más queremos ⭐️
                    </FormLabel>
                    <FormControl className="!mt-0">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage className="font-normal text-yellow-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isGroupGift"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <FormLabel className="text-base font-normal">
                      Regalo grupal 🎁
                    </FormLabel>
                    <FormControl className="!mt-0">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage className="font-normal text-yellow-600" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-3 items-center justify-center w-full mt-6">
              <Button
                type="submit"
                variant="saveAndCreateButton"
                disabled={isLoading}
              >
                Guardar y agregar regalo
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default CreateGiftForm;
