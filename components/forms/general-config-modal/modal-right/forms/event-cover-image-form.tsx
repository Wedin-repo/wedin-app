import { useState, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { MdOutlineFileUpload } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
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
import { updateEventCoverImageUrl } from '@/actions/data/event';
import { uploadImageToAws } from '@/lib/s3';
import imageOutline from '@/public/images/image.svg';
import GeneralConfigModalButton from '../modal-submit-button';
import { Event } from '@prisma/client';
import { z } from 'zod';

type EventCoverImageFormProps = {
  event: Event | null;
};

const EventCoverImageForm = ({ event }: EventCoverImageFormProps) => {
  if (!event) return null;
  const form = useForm({
    resolver: zodResolver(EventCoverImageFormSchema),
    defaultValues: {
      eventId: event?.id,
      eventCoverImage: imageOutline,
      eventCoverImageUrl: event?.coverImageUrl ?? '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { formState } = form;

  const handleFileChange = (action: React.ChangeEvent<HTMLInputElement>) => {
    const file = action.target.files?.[0] ?? null;

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
        id: event?.id,
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
        eventId: event?.id,
        eventCoverImageUrl: uploadResponse?.imageUrl,
      });

      if (updatedEvent?.error) {
        toast({
          title: 'Error',
          description: updatedEvent.error,
          variant: 'destructive',
        });
      }
      toast({
        title: 'Exito! 🖼️🎉',
        description: 'Imagen de la portada actualizada correctamente.',
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
        <div>
          <FormField
            control={form.control}
            name="eventCoverImage"
            render={({ field: { onChange, ...fieldProps } }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg">Imagen del regalo</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex flex-col gap-3 p-4 rounded-xl bg-Gray100">
                      <div className="flex overflow-hidden justify-center items-center rounded-xl border-2 border-dashed border-Gray300 h-[322px]">
                        <Image
                          src={
                            previewUrl || event?.coverImageUrl || imageOutline
                          }
                          width={390}
                          height={340}
                          alt="Vista previa de la imagen seleccionada"
                          className="object-cover w-full h-full rounded-xl"
                        />
                      </div>
                      <div className="">
                        <input
                          id="imageUpload"
                          type="file"
                          className="hidden"
                          accept="image/jpeg, image/png, image/heic, image/webp, image/svg+xml"
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
                          {event?.coverImageUrl || previewUrl
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
        <GeneralConfigModalButton isLoading={isLoading} formState={formState} />
      </form>
    </Form>
  );
};

export default EventCoverImageForm;
