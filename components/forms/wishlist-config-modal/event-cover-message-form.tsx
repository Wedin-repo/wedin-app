import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { EventCoverMessageFormSchema } from '@/schemas/form';
import { Event } from '@prisma/client';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { updateEventCoverMessage } from '@/actions/data/event';

type EventCoverMessageFormProps = {
  event?: Event | null;
};

const EventCoverMessageForm = ({ event }: EventCoverMessageFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(EventCoverMessageFormSchema),
    defaultValues: {
      eventId: event?.id ?? '',
      eventCoverMessage: event?.coverMessage ?? '',
    },
  });

  const { formState } = form;

  const onSubmit = async (
    values: z.infer<typeof EventCoverMessageFormSchema>
  ) => {
    setIsLoading(true);

    if (!Object.keys(formState.dirtyFields).length) {
      setIsLoading(false);
      return;
    }

    const validatedFields = EventCoverMessageFormSchema.safeParse(values);

    if (validatedFields.success) {
      const response = await updateEventCoverMessage(validatedFields.data);

      if (response?.error) {
        toast({
          variant: 'destructive',
          title: 'Error! 😢',
          description:
            'Ocurrio un error al actualizar el mensaje para tus invitados. Por favor intenta de nuevo.',
        });
        setIsLoading(false);
        return;
      }

      toast({
        title: 'Exito! 🎎🎉',
        description:
          'El mensaje para tus invitados ha sido actualizado correctamente.',
        className: 'bg-white',
      });
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full flex flex-col justify-between"
      >
        <FormField
          control={form.control}
          name="eventCoverMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium text-[#0F172A]">
                Tu mensaje de bienvenida a tu lista para tus invitados
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={
                    event?.coverMessage ??
                    'Ej. Gracias por ser parte de nuestro gran día. 😄🎉'
                  }
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-normal text-red-600" />
            </FormItem>
          )}
        />

        <Button variant="editGiftButton" type="submit" disabled={isLoading}>
          Guardar
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};

export default EventCoverMessageForm;
