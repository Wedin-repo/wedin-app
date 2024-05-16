import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import ringSvg from '@/public/images/rings.svg';
import type { GiftFormSchema } from '@/schemas/form';
import type { Category, Gift } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { FiEdit3 } from 'react-icons/fi';
import { MdOutlineFileUpload } from 'react-icons/md';
import type { z } from 'zod';
import PriceField from './price-field-input';

type GiftFormProps = {
  categories: Category[] | null;
  form: UseFormReturn<z.infer<typeof GiftFormSchema>>;
  gift?: Gift;
  isLoading: boolean;
  previewUrl: string | null;
  selectedFile: File | null;
  onSubmit: (values: z.infer<typeof GiftFormSchema>) => void;
  setPreviewUrl: (url: string | null) => void;
  setSelectedFile: (file: File | null) => void;
  buttonLabel?: string;
};

const GiftForm = ({
  categories,
  form,
  gift,
  isLoading,
  previewUrl,
  onSubmit,
  setPreviewUrl,
  setSelectedFile,
  buttonLabel,
}: GiftFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] ?? null;

    if (gift?.imageUrl) {
      URL.revokeObjectURL(gift?.imageUrl);
    }

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setSelectedFile(file);
    } else {
      setPreviewUrl(null);
      setSelectedFile(null);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 justify-center items-center pt-6 w-full sm:justify-between lg:flex-row lg:pt-0">
          <div className="w-full lg:w-7/12">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field: { onChange, value, ...fieldProps } }) => (
                <FormItem className="w-full">
                  <FormLabel>Imagen del regalo</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-1.5">
                      <span className="!text-xs font-normal text-secondaryTextColor">
                        372px por 322px
                      </span>
                      <div className="flex flex-col gap-3 p-4 rounded-xl bg-primaryBorderColor">
                        <div className="flex overflow-hidden justify-center items-center rounded-xl border-2 border-dashed border-primaryTextColor h-[322px]">
                          <Image
                            src={previewUrl || gift?.imageUrl || ringSvg}
                            width={390}
                            height={340}
                            alt="Vista previa de la imagen seleccionada"
                            className="object-cover min-w-full min-h-full rounded-xl"
                          />
                        </div>
                        <div className="">
                          <Input
                            id="imageUpload"
                            type="file"
                            className="hidden"
                            accept="image/jpeg, image/png, image/heic, image/webp, image/svg+xml"
                            {...fieldProps}
                            ref={fileInputRef}
                            onChange={event => {
                              onChange(event.target.files?.[0]);
                              handleFileChange(event);
                            }}
                          />
                          <Button
                            type="button"
                            variant="uploadImageButton"
                            onClick={handleButtonClick}
                          >
                            <MdOutlineFileUpload fontSize={'18px'} />
                            {gift?.imageUrl ? 'Cambiar imagen' : 'Subir imagen'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="font-normal text-red-600" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-4 justify-evenly w-full lg:w-6/12">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={gift?.name ?? 'Nombre del regalo'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="font-normal text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="">Categoria</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
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
                          />
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="font-normal text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => <PriceField field={field} />}
            />

            <FormField
              control={form.control}
              name="isFavoriteGift"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center">
                  <FormLabel className="text-base font-normal">
                    Marcar como el que más queremos ⭐
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage className="font-normal text-red-600" />
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
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage className="font-normal text-red-600" />
                </FormItem>
              )}
            />

            <div className="w-full">
              <Button
                type="submit"
                variant="editGiftButton"
                disabled={isLoading}
              >
                {buttonLabel ?? 'Guardar'}
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <FiEdit3 fontSize={'16px'} />
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default GiftForm;
