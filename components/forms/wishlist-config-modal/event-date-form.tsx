import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
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
import { cn } from '@/lib/utils';
import { es } from 'date-fns/locale';
import { EventDateFormSchema } from '@/schemas/form';
import { Event } from '@prisma/client';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

type EventDateFormProps = {
  event?: Event | null;
};

const EventDateForm = ({ event }: EventDateFormProps) => {
  const [isDeciding, setIsDeciding] = useState<boolean | string>(false);
  const form = useForm({
    resolver: zodResolver(EventDateFormSchema),
    defaultValues: {
      eventDate: event?.date ?? undefined,
      isDecidingEventDate: false,
    },
  });

  const handleIsDecidingChange = (value: boolean | string) => {
    setIsDeciding(value);
    if (value) {
      form.setValue('eventDate', undefined);
    }
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
        <div className="flex flex-col gap-2 items-center">
          <div className="flex flex-col justify-start items-start sm:items-center w-full font-medium sm:flex-row">
            Fecha del evento
            {/* <span className="font-normal text-xs text-[#64748B]">
              (No te preocupes, puede cambiarlo mas adelante)
            </span> */}
          </div>

          <div className="flex flex-col gap-3 w-full">
            {!isDeciding ? (
              <FormField
                control={form.control}
                name="eventDate"
                render={({ field }) => (
                  <FormItem>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
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
                      <PopoverContent
                        className="p-0 w-auto bg-white"
                        align="start"
                      >
                        <Calendar
                          locale={es}
                          mode="single"
                          selected={field.value}
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
            ) : (
              <div className="w-full">
                <Button
                  disabled
                  variant={'outline'}
                  className={cn(
                    'w-full pl-3 text-left font-normal text-[#94A3B8]'
                  )}
                >
                  <span className="text-[#94A3B8]">dd/mm/aa</span>
                  <CalendarIcon className="ml-auto w-4 h-4 opacity-50" />
                </Button>
              </div>
            )}
            <FormField
              control={form.control}
              name="isDecidingEventDate"
              render={({ field }) => (
                <FormItem className="flex gap-3 items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={checked => {
                        field.onChange(checked);
                        handleIsDecidingChange(checked);
                      }}
                    />
                  </FormControl>
                  <div className="!m-0">
                    <FormLabel className="font-normal cursor-pointer sm:text-base">
                      Aún estamos decidiendo
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button variant="editGiftButton" type="submit" className="mt-5">
          Guardar
        </Button>
      </form>
    </Form>
  );
};

export default EventDateForm;
