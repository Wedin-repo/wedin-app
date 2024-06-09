import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { toast } from '@/components/ui/use-toast';
import { Event, User } from '@prisma/client';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { countries } from '@/lib/countries';
import { updateEventDetails } from '@/actions/data/event';
import ModalSubmitButton from '../modal-submit-button';

type EventDetailsFormProps = {
  event: Event | null;
  eventPrimaryUser: User | null;
  eventSecondaryUser: User | null;
};

const EventDetailsForm = ({
  event,
  eventPrimaryUser,
  eventSecondaryUser,
}: EventDetailsFormProps) => {
  const form = useForm({
    resolver: zodResolver(EventDetailsFormSchema),
    defaultValues: {
      eventId: event?.id ?? '',
      eventType: event?.eventType.toString() ?? '',
      name: eventPrimaryUser?.name ?? '',
      lastName: eventPrimaryUser?.lastName ?? '',
      partnerName: eventSecondaryUser?.name ?? '',
      partnerLastName: eventSecondaryUser?.lastName ?? '',
      partnerEmail: eventSecondaryUser?.email ?? '',
      eventCity: event?.city ?? '',
      eventCountry: event?.country ?? '',
      eventGuests: event?.guests ?? '',
    },
  });
  const { formState } = form;

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof EventDetailsFormSchema>) => {
    setIsLoading(true);
    if (!Object.keys(formState.dirtyFields).length) {
      setIsLoading(false);
      console.log('No hay campos modificados');
      return;
    }
    const validatedFields = EventDetailsFormSchema.safeParse(values);
    if (validatedFields.success) {
      const response = await updateEventDetails(validatedFields.data);

      if (response?.error) {
        toast({
          variant: 'destructive',
          title: 'Error! 😢',
          description: response.error,
        });
      }

      toast({
        title: 'Exito! ⛪🥳',
        description: 'Tipo y datos del evento actualizados correctamente.',
        className: 'bg-white',
      });
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col h-full justify-between gap-8 md:gap-0"
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-5">
            <div className="flex justify-between gap-4">
              <FormField
                control={form.control}
                name="eventType"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Tipo de evento</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="!mt-1 text-base">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un tipo de evento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        <SelectItem value="WEDDING">Boda</SelectItem>
                        <SelectItem value="BIRTHDAY">Cumpleaños</SelectItem>
                        <SelectItem value="BABY_SHOWER">Baby Shower</SelectItem>
                        <SelectItem value="OTHER">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="font-normal text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="eventGuests"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel className="flex items-center gap-1.5 text-xs sm:text-sm">
                      Cantidad de invitados
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <AiOutlineQuestionCircle fontSize={'18px'} />
                          </TooltipTrigger>
                          <TooltipContent className="bg-white">
                            <p>
                              necesitamos saber la cantidad de tus invitados
                              porque Si
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="!mt-2.5"
                        type="number"
                        placeholder=""
                        {...field}
                      />
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
                        placeholder={eventPrimaryUser?.name ?? ''}
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
                        placeholder={eventPrimaryUser?.lastName ?? ''}
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
                      <Input
                        className="!mt-1"
                        placeholder={
                          eventSecondaryUser?.name ?? 'Nombre de tu pareja'
                        }
                        {...field}
                      />
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
                      <Input
                        className="!mt-1"
                        placeholder={
                          eventSecondaryUser?.lastName ??
                          'Apellido de tu pareja'
                        }
                        {...field}
                      />
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
                    <Input className="!mt-1" {...field} disabled />
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
                    <FormLabel>País del evento</FormLabel>
                    <FormControl className="!mt-1">
                      <Combobox
                        options={countries}
                        placeholder="Elegí un país"
                        selected={field.value}
                        onChange={field.onChange}
                        width="w-60"
                      />
                    </FormControl>
                    <FormMessage className="font-normal text-red-600" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <ModalSubmitButton isLoading={isLoading} formState={formState} />
      </form>
    </Form>
  );
};

export default EventDetailsForm;
