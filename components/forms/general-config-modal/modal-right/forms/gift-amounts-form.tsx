import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { GiftAmountsFormSchema } from '@/schemas/form';
import { Event } from '@prisma/client';
import { toast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { updateEventGiftAmounts } from '@/actions/data/event';
import ModalSubmitButton from '../modal-submit-button';
import GiftAmountsFormPriceInput from '../gift-amounts-form-price-input';

type GiftAmountsFormProps = {
  event: Event | null;
};

type GiftAmountsFormValues = z.infer<typeof GiftAmountsFormSchema>;

const GiftAmountsForm = ({ event }: GiftAmountsFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<GiftAmountsFormValues>({
    resolver: zodResolver(GiftAmountsFormSchema),
    defaultValues: {
      eventId: event?.id ?? '',
      giftAmount1: event?.giftAmounts[0] ?? '',
      giftAmount2: event?.giftAmounts[1] ?? '',
      giftAmount3: event?.giftAmounts[2] ?? '',
      giftAmount4: event?.giftAmounts[3] ?? '',
    },
  });

  const { formState, setValue, watch } = form;

  const onSubmit = async (values: GiftAmountsFormValues) => {
    setIsLoading(true);
    if (!Object.keys(formState.dirtyFields).length) {
      setIsLoading(false);
      console.log('No hay campos modificados');
      return;
    }
    const validatedFields = GiftAmountsFormSchema.safeParse(values);
    if (validatedFields.success) {
      const response = await updateEventGiftAmounts(validatedFields.data);

      if (response?.error) {
        toast({
          variant: 'destructive',
          title: 'Error! 😢',
          description: response.error,
        });
      }

      toast({
        title: 'Exito! 🎁🎉',
        description: 'Sugerencia montos de regalos actualizados correctamente.',
        className: 'bg-white',
      });
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full flex flex-col justify-between gap-8 md:gap-0"
      >
        <div className="flex flex-col gap-5">
          <p className="text-lg font-medium text-[#0F172A]">
            Monto que sugerís que los invitados te regalen caso seleccionen
            regalo en efectivo, podes elegir hasta 4 opciones.{' '}
            <span className="font-normal text-xs text-Zinc400">
              Desde Gs. 99.999 hasta Gs. 9.999.999
            </span>
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between w-full gap-4">
              <FormField
                control={form.control}
                name="giftAmount1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sugerencia de regalo 1</FormLabel>
                    <FormControl>
                      <GiftAmountsFormPriceInput
                        value={field.value}
                        onChange={value => setValue('giftAmount1', value)}
                      />
                    </FormControl>
                    <FormMessage className="font-normal text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="giftAmount2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sugerencia de regalo 2</FormLabel>
                    <FormControl>
                      <Input
                        className="!mt-1"
                        placeholder={'Ej: Gs. 840,000'}
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
                name="giftAmount3"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sugerencia de regalo 3</FormLabel>
                    <FormControl>
                      <Input
                        className="!mt-1"
                        placeholder={'Ej: Gs. 2,399,000'}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-normal text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="giftAmount4"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sugerencia de regalo 4</FormLabel>
                    <FormControl>
                      <Input
                        className="!mt-1"
                        placeholder={'Ej: Gs. 9,860,000'}
                        {...field}
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

export default GiftAmountsForm;
