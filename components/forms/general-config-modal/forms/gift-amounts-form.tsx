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
import { GiftAmountsFormSchema } from '@/schemas/form';
import { Event } from '@prisma/client';
import { toast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { updateEventGiftAmounts } from '@/actions/data/event';
import { giftAmounts } from '@/lib/gift-amounts';
import { formatPrice } from '@/lib/utils';

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
      giftAmounts: [],
    },
  });

  const { watch, setValue, formState } = form;
  const selectedAmounts = watch('giftAmounts') as string[];

  const handleCheckboxChange = (value: string) => {
    console.log('value');
    if (selectedAmounts.includes(value)) {
      setValue(
        'giftAmounts',
        selectedAmounts.filter((item: string) => item !== value) as string[]
      );
    } else {
      setValue('giftAmounts', [...selectedAmounts, value] as string[]);
    }
  };

  const renderCheckbox = (value: string, label: string) => (
    <div key={value} className="flex items-center gap-3">
      <Checkbox
        value={value}
        checked={selectedAmounts.includes(value)}
        onChange={() => handleCheckboxChange(value)}
      />
      <p>{`${formatPrice(Number(label))}`}</p>
    </div>
  );

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
        description:
          'Lo sugerencia de regalo ha sido actualizado correctamente.',
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
          name="giftAmounts"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium">
                Monto que sugerís que los invitados te regalen caso seleccionen
                regalo en efectivo, podes elegir hasta 3 opciones.
              </FormLabel>
              <FormControl>
                <div className="grid grid-cols-3 gap-4">
                  {giftAmounts.map(amount =>
                    renderCheckbox(amount.value, amount.label)
                  )}
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
