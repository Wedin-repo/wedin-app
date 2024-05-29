import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
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
import { EventCoverImageFormSchema } from '@/schemas/form';
import { Event } from '@prisma/client';
import { LuImage } from 'react-icons/lu';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { MdOutlineFileUpload } from 'react-icons/md';
import { updateEventCoverImage } from '@/actions/data/event';

type EventCoverImageFormProps = {
  event: Event | null;
};

const EventCoverImageForm = ({ event }: EventCoverImageFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    resolver: zodResolver(EventCoverImageFormSchema),
    defaultValues: {
      eventId: event?.id ?? '',
      eventCoverImage: event?.coverImageUrl ?? null,
      eventCoverImgUrl: event?.coverImageUrl ?? '',
    },
  });

  const { formState } = form;

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] ?? null;
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (
    values: z.infer<typeof EventCoverImageFormSchema>
  ) => {
    setIsLoading(true);

    if (!Object.keys(formState.dirtyFields).length) {
      setIsLoading(false);
      return;
    }

    const validatedFields = EventCoverImageFormSchema.safeParse(values);

    if (validatedFields.success) {
      const response = await updateEventCoverImage(validatedFields.data);

      if (response?.error) {
        toast({
          variant: 'destructive',
          title: 'Error! 😢',
          description:
            'Ocurrio un error al actualizar la dirección de tu evento. Por favor intenta de nuevo.',
        });
        setIsLoading(false);
        return;
      }

      toast({
        title: 'Exito! 🔗🎉',
        description:
          'La dirección de tu evento ha sido actualizada correctamente.',
        className: 'bg-white',
      });
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-between h-full"
      >
        <FormField
          control={form.control}
          name="eventCoverImage"
          render={({ field: { onChange, value, ...fieldProps } }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg text-[#0F172A] font-medium">
                Imagen de la portada
                <span className="!text-sm font-normal text-secondaryTextColor ml-2">
                  1px por 1px
                </span>
              </FormLabel>
              <FormControl>
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-col gap-3 p-4 rounded-xl bg-primaryBorderColor">
                    <div className="flex overflow-hidden justify-center items-center rounded-xl border-2 border-dashed border-primaryTextColor h-[322px]">
                      {event?.coverImageUrl ? (
                        <Image
                          src={event?.coverImageUrl}
                          width={390}
                          height={340}
                          alt="Vista previa de la imagen seleccionada"
                          className="object-cover min-w-full min-h-full rounded-xl"
                        />
                      ) : (
                        <LuImage className="text-secondaryBorderColor w-10 h-10" />
                      )}
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

        <Button variant="editGiftButton" type="submit">
          Guardar
        </Button>
      </form>
    </Form>
  );
};

export default EventCoverImageForm;
