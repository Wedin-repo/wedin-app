'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GiftSchema } from '@/schemas/index';
import { editOrCreateGift } from '@/actions/data/wishlist';
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
//import { formatPrice } from '@/utils/format';
import RemoveFromWishListForm from './delete-from-wishlist-form';
import WishListFormButton from '../../gifts/components/wishlist-form-button';
import ImageUpload from '@/components/ImageUpload';
import { toast } from '@/components/ui/use-toast';
import { FaCheck } from 'react-icons/fa6';
import { z } from 'zod';
import { formatPrice } from '@/utils/format';

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
  const formattedPrice = formatPrice(Number(gift.price));

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

  const onSubmit = async (values: z.infer<typeof GiftSchema>) => {
    if (!Object.keys(formState.dirtyFields).length) {
      console.log('No changes made');
      return;
    }

    const validatedFields = GiftSchema.safeParse(values);

    if (validatedFields.success) {
      try {
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
            description: 'Regalo actualizado kp',
            className: 'bg-white',
          });
        }
      } catch (error: any) {
        toast({
          title: 'Error',
          description:
            error.message || 'An error occurred while updating the gift.',
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

    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-4 sm:gap-8 pt-6 lg:pt-0">
          <div className="w-full lg:w-1/2">
            <ImageUpload imgUrl={gift?.imageUrl} />
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
                        placeholder={gift.name}
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
                        placeholder={formattedPrice}
                        type="number"
                        min="0"
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
              <div className="w-full">
                <WishListFormButton variant="deleteGiftButton" />
              </div>
              <div className="w-full">
                <WishListFormButton variant="editGiftButton" />
              </div>
              {/* <div className="w-full">
                <RemoveFromWishListForm
                  giftId={gift.id}
                  wishlistId={wishlistId}
                  variant="deleteGiftButton"
                />
              </div> */}
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default EditGiftForm;
