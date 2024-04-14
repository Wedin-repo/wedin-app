'use client';

import { Button } from '@/components/ui/button';
import { FiEdit3 } from 'react-icons/fi';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Gift } from '@prisma/client';
import { formatPrice } from '@/utils/format';
import EditGiftFromWishListForm from './edit-gift-from-wishlist-form';
import { Category } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  name: z.string(),
  price: z.string(),
  category: z.string(),
});

type EditGiftFormProps = {
  gift: Gift;
  wishlistId?: string | null;
  categories?: string[] | Category[] | null;
};

function EditGiftForm({ gift, wishlistId, categories }: EditGiftFormProps) {
  const { name, description, price, id, categoryId } = gift;

  const formattedPrice = formatPrice(Number(price));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: '',
      category: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('first');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 mb-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder={name} className="!mt-1.5" {...field} />
                </FormControl>
                <FormMessage className="font-normal text-yellow-600" />
              </FormItem>
            )}
          />

          {categoryId && (
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {categories?.map(category => (
                        <>
                          <SelectItem
                            key={category.id}
                            value={category.name}
                            className="cursor-pointer"
                          >
                            {category.name}
                          </SelectItem>
                          <div className='border border-b-secondaryBorderColor flex items-center w-5/6 justify-center' style={{ margin: '0 auto'}}></div>
                        </>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="font-normal text-yellow-600" />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input
                    placeholder={formattedPrice}
                    className="!mt-1.5"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="font-normal text-yellow-600" />
              </FormItem>
            )}
          />
        </div>
        <EditGiftFromWishListForm giftId={id} />
      </form>
    </Form>
  );
}

export default EditGiftForm;
