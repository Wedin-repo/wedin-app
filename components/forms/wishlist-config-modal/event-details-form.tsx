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
import { EventDetailsFormSchema } from '@/schemas/form';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { Event } from '@prisma/client';
import { FiEdit3 } from 'react-icons/fi';
import { MdOutlineFileUpload } from 'react-icons/md';
import { zodResolver } from '@hookform/resolvers/zod';

import type { z } from 'zod';
import { useForm } from 'react-hook-form';

type EventDetailsFormProps = {
  event?: Event;
};

const EventDetailsForm = ({ event }: EventDetailsFormProps) => {
  const form = useForm({
    resolver: zodResolver(EventDetailsFormSchema),
    defaultValues: {
      eventType: event?.id,
      name: event?.name ?? '',
      lastName: event?.name,
      partnerName: event?.name,
      partnerLastName: event?.name,
      eventCity: event?.name,
      eventCountry: event?.name,
      eventGuestList: event?.name,
    },
  });

  const onSubmit = async (values: z.infer<typeof EventDetailsFormSchema>) => {
    console.log('hello world');
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 justify-center items-center pt-6 w-full sm:justify-between lg:flex-row lg:pt-0">
          <div className="flex flex-col gap-4 justify-evenly w-full lg:w-6/12">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del evento</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={event?.name ?? 'Nombre del evento'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="font-normal text-red-600" />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">Guardar</Button>
      </form>
    </Form>
  );
};

export default EventDetailsForm;
