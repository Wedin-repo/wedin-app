'use client';

import { Input } from '@/components/ui/input';
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
import { Button } from '@/components/ui/button';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';
import { FiEdit3 } from 'react-icons/fi';
import { GiftSchema } from '@/schemas/index';

import React from 'react';
import { Category, Gift } from '@prisma/client';
import { z } from 'zod';

type GiftFormProps = {
  form: any;
  gift?: Gift;
  categories: Category[] | null;
  isLoading: boolean;
  onSubmit: (values: z.infer<typeof GiftSchema>) => void;
  handleRemoveGiftFromWishList?: () => void;
  formattedPrice?: string;
};

const GiftForm = ({
  form,
  gift,
  categories,
  isLoading,
  onSubmit,
  handleRemoveGiftFromWishList,
  formattedPrice,
}: GiftFormProps) => {
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
                        placeholder={gift?.name ?? 'Nombre del regalo'}
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
                        placeholder={formattedPrice ?? 'Valor del regalo'}
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
              {gift && (
                <div className="w-full">
                  <Button
                    type="button"
                    onClick={handleRemoveGiftFromWishList}
                    variant="deleteGiftButton"
                    disabled={isLoading}
                  >
                    Eliminar regalo
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <FaRegTrashAlt fontSize={'16px'} />
                    )}
                  </Button>
                </div>
              )}
              <div className="w-full">
                <Button
                  type="submit"
                  variant="editGiftButton"
                  disabled={isLoading}
                >
                  {gift ? 'Editar regalo' : 'Guardar y agregar a la lista'}
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <FiEdit3 fontSize={'16px'} />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default GiftForm;
