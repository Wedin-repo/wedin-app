import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { updateEventCoverImageUrl } from '@/actions/data/event';
import { uploadImageToAws } from '@/lib/s3';
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
//import { LuImage } from 'react-icons/lu';
//import imageSvg from '@/public/images/image-icon.svg';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { MdOutlineFileUpload } from 'react-icons/md';
import imageOutline from '@/public/images/image.svg';

type EventCoverImageFormProps = {
  event: Event | null;
};

const EventCoverImageForm = ({ event }: EventCoverImageFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    resolver: zodResolver(EventCoverImageFormSchema),
    defaultValues: {
      eventId: event?.id ?? '',
      eventCoverImage: imageOutline,
      eventCoverImageUrl: event?.coverImageUrl ?? '',
    },
  });

  const { formState } = form;

  const handleFileChange = async (
    action: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = action.target.files?.[0] ?? null;

    if (event?.coverImageUrl) {
      URL.revokeObjectURL(event?.coverImageUrl);
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

  const onSubmit = async (
    values: z.infer<typeof EventCoverImageFormSchema>
  ) => {
    setIsLoading(true);
    if (!Object.keys(formState.dirtyFields).length) {
      setIsLoading(false);
      return;
    }
    const validatedFields = EventCoverImageFormSchema.safeParse(values);

    if (!validatedFields.success) {
      toast({
        title: 'Error',
        description: 'Archivo invalido, por favor intenta de nuevo.',
        variant: 'destructive',
      });

      setIsLoading(false);
      return;
    }

    if (selectedFile) {
      const uploadResponse = await uploadImageToAws({
        file: selectedFile,
        id: event?.id ?? '',
        type: 'eventId',
      });

      if (uploadResponse?.error) {
        toast({
          title: 'Error',
          description: uploadResponse.error,
          variant: 'destructive',
        });

        setIsLoading(false);
        return;
      }

      const updatedEvent = await updateEventCoverImageUrl({
        eventId: event?.id ?? '',
        eventCoverImageUrl: event?.coverImageUrl ?? '',
      });

      if (updatedEvent?.error) {
        return { error: updatedEvent.error };
      }

      toast({
        title: 'Exito!',
        description: 'se actualizo la imagen de portada del evento.',
        className: 'bg-white',
      });
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-between h-full"
      >
        <div>
          <FormField
            control={form.control}
            name="eventCoverImage"
            render={({ field: { onChange, value, ...fieldProps } }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg flex items-end gap-2">
                  Imagen del regalo
                  {/* <span className="!text-sm font-normal text-secondaryTextColor">
                    372px por 322px
                  </span> */}
                </FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex flex-col gap-3 p-4 rounded-xl bg-primaryBorderColor">
                      <div className="flex overflow-hidden justify-center items-center rounded-xl border-2 border-dashed border-primaryTextColor h-[322px]">
                        <Image
                          src={
                            previewUrl || event?.coverImageUrl || imageOutline
                          }
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
                          {event?.coverImageUrl
                            ? 'Cambiar imagen'
                            : 'Subir imagen'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="font-normal text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventCoverImageUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" className="hidden" {...field} />
                </FormControl>
                <FormMessage className="font-normal text-red-600" />
              </FormItem>
            )}
          />
        </div>

        <Button variant="editGiftButton" type="submit" disabled={isLoading}>
          Guardar
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};

export default EventCoverImageForm;
