import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Combobox } from '@/components/ui/combobox';
import { EventDetailsFormSchema } from '@/schemas/form';
import Image from 'next/image';
import { Event } from '@prisma/client';
import { FiEdit3 } from 'react-icons/fi';
import { MdOutlineFileUpload } from 'react-icons/md';
import { Loader2 } from 'lucide-react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { cn } from '@/lib/utils';
import { countries } from '@/lib/countries';

type EventDetailsFormProps = {
  event?: Event;
  //currentUser?: User | null;
};

const EventDetailsForm = ({ event }: EventDetailsFormProps) => {
  const form = useForm({
    resolver: zodResolver(EventDetailsFormSchema),
    defaultValues: {
      eventType: 'wedding',
      name: 'Alex',
      lastName: 'Nico',
      partnerName: 'Fernan',
      partnerLastName: 'Alicia',
      partnerEmail: 'felicia@thagoat.com',
      eventCity: event?.city ?? 'San Lorenzo',
      eventCountry: event?.country ?? 'Paraguay',
      eventGuestList: '252',
    },
  });

  const [typeSelected, setTypeSelected] = useState<string | string[]>('');
  const [options, setOptions] = useState(
    countries.map(option => ({
      value: option.value.toString(),
      label: option.label,
    }))
  );
  const handleCreateOptions = (value: string) => {
    const newOption = { value, label: value };
    setOptions([...options, newOption]);
    setTypeSelected(value);
  };

  const onSubmit = () => {
    console.log('hello world');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col h-full justify-between"
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-5">
            <div className="flex justify-between w-full gap-4">
              <FormField
                control={form.control}
                name="eventType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Tipo de evento</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="!mt-1">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un tipo de evento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        <SelectItem value="wedding">Boda</SelectItem>
                        <SelectItem value="birthday">Cumpleaños</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="font-normal text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="eventGuestList"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="flex items-center gap-2">
                      Cantidad de invitados
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <AiOutlineQuestionCircle fontSize={'20px'} />
                          </TooltipTrigger>
                          <TooltipContent className="bg-white">
                            <p>
                              necesitamos saber la cantidad de tus invitados
                              porque SIII
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <FormControl>
                      <Input className="!mt-2" {...field} />
                    </FormControl>

                    <FormMessage className="font-normal text-red-600" />
                  </FormItem>
                )}
              />
            </div>
            <div className="border border-[#E2E8F0] w-full rounded-full"></div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between w-full gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tu nombre</FormLabel>
                    <FormControl>
                      <Input
                        className="!mt-1"
                        placeholder={event?.name ?? ''}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-normal text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tu apellido</FormLabel>
                    <FormControl>
                      <Input
                        className="!mt-1"
                        placeholder={event?.city ?? ''}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-normal text-red-600" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between w-full gap-4">
              <FormField
                control={form.control}
                name="partnerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>El nombre de tu pareja</FormLabel>
                    <FormControl>
                      <Input className="!mt-1" {...field} />
                    </FormControl>
                    <FormMessage className="font-normal text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="partnerLastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>El apellido de tu pareja</FormLabel>
                    <FormControl>
                      <Input className="!mt-1" {...field} />
                    </FormControl>
                    <FormMessage className="font-normal text-red-600" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="partnerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail de tu pareja</FormLabel>
                  <FormControl>
                    <Input className="!mt-1" {...field} />
                  </FormControl>
                  <FormMessage className="font-normal text-red-600" />
                </FormItem>
              )}
            />

            <div className="flex justify-between w-full gap-4">
              <FormField
                control={form.control}
                name="eventCity"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Ciudad del evento</FormLabel>
                    <FormControl>
                      <Input className="!mt-1" {...field} />
                    </FormControl>
                    <FormMessage className="font-normal text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="eventCountry"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Entidad</FormLabel>
                    <FormControl className="!mt-1">
                      <Combobox
                        mode="single"
                        options={countries.map(country => ({
                          value: country.value.toString(),
                          label: country.label,
                        }))}
                        placeholder="Elegí una entidad"
                        selected={typeSelected}
                        onChange={value => {
                          setTypeSelected(value);
                          field.onChange(value);
                        }}
                        onCreate={handleCreateOptions}
                      />
                    </FormControl>
                    <FormMessage className="font-normal text-red-600" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Button variant="editGiftButton" type="submit">
          Guardar
        </Button>
      </form>
    </Form>
  );
};

export default EventDetailsForm;
