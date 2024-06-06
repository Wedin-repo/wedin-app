import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { GiftAmountsFormSchema } from '@/schemas/form';
import { Event } from '@prisma/client';
import { toast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { giftAmounts } from '@/lib/gift-amounts';

type GiftAmountsFormProps = {
  event: Event | null;
};

const GiftAmountsForm = ({ event }: GiftAmountsFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(GiftAmountsFormSchema),
    defaultValues: {
      eventId: event?.id ?? '',
      giftAmounts: [],
    },
  });

  const { formState, watch } = form;
  const selectedAmounts = watch('giftAmounts');

  const onSubmit = async (values: z.infer<typeof GiftAmountsFormSchema>) => {
    setIsLoading(true);
    toast({
      title: 'Exito! 🔗🎉',
      description:
        'La dirección de tu evento ha sido actualizada correctamente.',
      className: 'bg-white',
    });
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
          name="giftAmounts"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-normal">
                Monto que sugerís que los invitados te regalen caso seleccionen
                regalo en efectivo, podes elegir hasta 3 opciones.
              </FormLabel>
              <FormControl>
                <div className="grid grid-cols-3 gap-4">
                  {giftAmounts.map(amount => (
                    <div key={amount.value} className="flex items-center gap-3">
                      <Checkbox
                        value={amount.value}
                        checked={selectedAmounts.includes(amount.value)}
                        onChange={() => {
                          if (selectedAmounts.includes(amount.value)) {
                            form.setValue(
                              'giftAmounts',
                              selectedAmounts.filter(
                                (item: string) => item !== amount.value
                              )
                            );
                          } else {
                            if (selectedAmounts.length < 3) {
                              form.setValue('giftAmounts', [
                                ...selectedAmounts,
                                amount.value,
                              ]);
                            } else {
                              toast({
                                title: 'Error',
                                description:
                                  'Puedes seleccionar hasta 3 opciones.',
                                className: 'bg-white',
                              });
                            }
                          }
                        }}
                      />
                      <p>{`Gs. ${amount.label}`}</p>
                    </div>
                  ))}
                  <div className="flex items-center gap-3">
                    <Checkbox
                      value="other"
                      checked={selectedAmounts.includes('other')}
                      onChange={() => {
                        if (selectedAmounts.includes('other')) {
                          form.setValue(
                            'giftAmounts',
                            selectedAmounts.filter(
                              (item: string) => item !== 'other'
                            )
                          );
                        } else {
                          if (selectedAmounts.length < 3) {
                            form.setValue('giftAmounts', [
                              ...selectedAmounts,
                              'other',
                            ]);
                          } else {
                            toast({
                              title: 'Error',
                              description:
                                'Puedes seleccionar hasta 3 opciones.',
                              className: 'bg-white',
                            });
                          }
                        }
                      }}
                    />
                    <p>Otro monto</p>
                  </div>
                </div>
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

export default GiftAmountsForm;
