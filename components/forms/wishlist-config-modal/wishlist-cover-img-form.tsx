import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import Image from 'next/image';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ringSvg from '@/public/images/rings.svg';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { WishlistCoverImgFormSchema } from '@/schemas/form';
import { Event } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { MdOutlineFileUpload } from 'react-icons/md';

type WishlistCoverImgFormProps = {
  event?: Event | null;
};

const WishlistCoverImgForm = ({ event }: WishlistCoverImgFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const form = useForm({
    resolver: zodResolver(WishlistCoverImgFormSchema),
    defaultValues: {
      coverImg: '',
      coverImgUrl: '',
    },
  });
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] ?? null;
  };
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = () => {
    console.log('hello world');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full flex flex-col justify-between"
      >
        <FormField
          control={form.control}
          name="coverImg"
          render={({ field: { onChange, value, ...fieldProps } }) => (
            <FormItem className="w-full">
              <FormLabel>
                Imagen de la portada
                <span className="!text-xs font-normal text-secondaryTextColor ml-2">
                  0idk0px por 0idk0px
                </span>
              </FormLabel>
              <FormControl>
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-col gap-3 p-4 rounded-xl bg-primaryBorderColor">
                    <div className="flex overflow-hidden justify-center items-center rounded-xl border-2 border-dashed border-primaryTextColor h-[322px]">
                      <Image
                        src={event?.name || ringSvg}
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
                        Subir imagen
                      </Button>
                    </div>
                  </div>
                </div>
              </FormControl>
              <FormMessage className="font-normal text-red-600" />
            </FormItem>
          )}
        />

        <Button variant="editGiftButton" type="submit" className="mt-5">
          Guardar
        </Button>
      </form>
    </Form>
  );
};

export default WishlistCoverImgForm;
