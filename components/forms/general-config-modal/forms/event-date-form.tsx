import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { es } from 'date-fns/locale';
import { z } from 'zod';
import { EventDateFormSchema } from '@/schemas/form';
import { Event } from '@prisma/client';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { updateEventDate } from '@/actions/data/event';

type EventDateFormProps = {
  event: Event | null;
};

const EventDateForm = ({ event }: EventDateFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(EventDateFormSchema),
    defaultValues: {
      eventId: event?.id ?? '',
      eventDate: event?.date ?? null,
    },
  });

  const { formState } = form;

  const onSubmit = async (values: z.infer<typeof EventDateFormSchema>) => {
    setIsLoading(true);

    if (!Object.keys(formState.dirtyFields).length) {
      setIsLoading(false);
      return;
    }

    const validatedFields = EventDateFormSchema.safeParse(values);

    if (validatedFields.success) {
      const response = await updateEventDate(validatedFields.data);

      if (response?.error) {
        toast({
          variant: 'destructive',
          title: 'Error! 😢',
          description:
            'Ocurrio un error al actualizar la fecha de tu evento. Por favor intenta de nuevo.',
        });
        setIsLoading(false);
        return;
      }

      toast({
        title: 'Exito! 🔗🎉',
        description: 'La fecha de tu evento ha sido actualizada correctamente.',
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
          name="eventDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg flex items-end gap-2 text-[#0F172A]">
                Imagen del regalo
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal text-base',
                        !field.value && 'text-[#94A3B8]'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP', { locale: es })
                      ) : (
                        <span className="text-[#94A3B8]">dd/mm/aa</span>
                      )}
                      <CalendarIcon className="ml-auto w-4 h-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-auto bg-white" align="start">
                  <Calendar
                    locale={es}
                    mode="single"
                    selected={field.value || undefined}
                    onSelect={field.onChange}
                    disabled={date => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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

export default EventDateForm;
