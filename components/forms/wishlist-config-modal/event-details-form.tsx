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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { EventDetailsFormSchema } from '@/schemas/form';
import Image from 'next/image';
import { Event } from '@prisma/client';
import { FiEdit3 } from 'react-icons/fi';
import { MdOutlineFileUpload } from 'react-icons/md';
import { Loader2 } from 'lucide-react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { countries } from '@/app/(onboarding)/onboarding/countries';
import { cn } from '@/lib/utils';

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

  const onSubmit = () => {
    console.log('hello world');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <FormItem>
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
          </div>
          <div className="border border-[#E2E8F0] w-full rounded-full mt-4 mb-2"></div>
        </div>

        <div className="flex flex-col gap-3">
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
                <FormItem>
                  <FormLabel>Ciudad del evento</FormLabel>
                  <FormControl>
                    <Input className="!mt-1" {...field} />
                  </FormControl>
                  <FormMessage className="font-normal text-red-600" />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="eventCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>País del evento</FormLabel>
                  <FormControl>
                    <Input className="!mt-1" {...field} />
                  </FormControl>
                  <FormMessage className="font-normal text-red-600" />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="eventCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pais del evento</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="!mt-1">
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn('w-[200px] justify-between')}
                        >
                          {field.value
                            ? countries.find(
                                country => country?.name === field.value
                              )?.name
                            : 'Elige un pais'}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Buscar pais"
                          className="h-9"
                        />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {countries.map(country => (
                            <CommandItem
                              value={country?.name}
                              key={country?.id}
                              onSelect={() => {
                                form.setValue('eventCountry', country.name);
                              }}
                            >
                              {country?.name}
                              <CheckIcon
                                className={cn(
                                  'ml-auto h-4 w-4',
                                  country?.name === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-1/2">
            <FormField
              control={form.control}
              name="eventGuestList"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Cantidad de invitados
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <AiOutlineQuestionCircle fontSize={'20px'} />
                        </TooltipTrigger>
                        <TooltipContent className="bg-white">
                          <p>this is probably some info tooltip or som shit</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <FormControl>
                    <Input className="!mt-1" {...field} />
                  </FormControl>

                  <FormMessage className="font-normal text-red-600" />
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

export default EventDetailsForm;
