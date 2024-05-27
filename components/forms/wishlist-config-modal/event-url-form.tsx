import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EventUrlFormSchema } from '@/schemas/form';
import { Event } from '@prisma/client';
import { toast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { updateEventUrl } from '@/actions/data/event';

type EventUrlFormProps = {
  event?: Event | null;
};

const EventUrlForm = ({ event }: EventUrlFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(EventUrlFormSchema),
    defaultValues: {
      eventId: event?.id ?? '',
      eventUrl: event?.url ?? '30crisley',
    },
  });

  const { formState } = form;

  const onSubmit = async (values: z.infer<typeof EventUrlFormSchema>) => {
    setIsLoading(true);

    if (!Object.keys(formState.dirtyFields).length) {
      setIsLoading(false);
      return;
    }

    const validatedFields = EventUrlFormSchema.safeParse(values);

    if (validatedFields.success) {
      const response = await updateEventUrl(validatedFields.data);
      toast({
        title: response.status,
        description: response.description,
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
          name="eventUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col">
                  <p className="font-medium text-[#0F172A] mb-2 sm:text-start text-center">
                    ¿Qué dirección quieres para tu evento? Escribe la dirección
                    para comprobar su disponibilidad
                  </p>
                  <div className="flex gap-3 items-center">
                    <div className="bg-[#9CA3AF] rounded-lg h-10 px-4 flex items-center justify-center text-white text-sm font-medium">
                      wedin.app/
                    </div>
                    <Input placeholder={event?.url ?? '30crisley'} {...field} />
                  </div>
                </div>
              </FormControl>
              <FormMessage className="font-normal text-red-600" />
              <p className="text-sm text-yellow-600 mt-2">
                *La dirección no puede incluir caracteres especiales (.*%$#&...)
              </p>
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

export default EventUrlForm;
