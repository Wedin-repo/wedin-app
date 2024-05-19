import { editTransaction } from '@/actions/data/transaction';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { TransactionEditSchema } from '@/schemas/form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Event, Gift, Transaction, WishlistGift } from '@prisma/client';
import { Switch } from '@radix-ui/react-switch';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit3 } from 'react-icons/fi';
import type { z } from 'zod';
import { Input } from '../ui/input';

type EditTransactionFormProps = {
  setIsOpen: (value: boolean) => void;
  transaction: Transaction & {
    wishlistGift: WishlistGift & {
      gift: Gift;
      event: Event;
    };
  };
};

export default function EditTransactionForm({
  transaction,
  setIsOpen,
}: EditTransactionFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const gift = transaction.wishlistGift.gift;
  const wishlistGift = transaction.wishlistGift;

  const form = useForm({
    resolver: zodResolver(TransactionEditSchema),
    defaultValues: {
      notes: transaction.notes ?? '',
      status: transaction.status,
    },
  });

  const { formState } = form;

  const onSubmit = async (values: z.infer<typeof TransactionEditSchema>) => {
    setIsLoading(true);

    if (!Object.keys(formState.dirtyFields).length) {
      setIsLoading(false);
      if (setIsOpen) {
        setIsOpen(false);
      }
      return;
    }

    const validatedFields = TransactionEditSchema.safeParse(values);

    if (!validatedFields.success) {
      toast({
        title: 'Error',
        description: 'Datos inválidos, por favor verifica tus datos.',
        variant: 'destructive',
      });

      setIsLoading(false);
      return;
    }

    const response = await editTransaction(validatedFields.data, transaction);

    if (response?.error) {
      toast({
        title: 'Error',
        description: response.error,
        variant: 'destructive',
      });

      setIsLoading(false);
      return;
    }

    toast({
      title: 'Éxito! 🎁🎉',
      description: 'Transacción actualizada.',
      className: 'bg-white',
    });

    setIsOpen(false);
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 justify-center items-center pt-6 w-full sm:justify-between lg:flex-row lg:pt-0">
          <div className="w-full lg:w-7/12">
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Agregar notas..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Alguna nota especial que quieras agregar a esta transacción.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-4 justify-evenly w-full lg:w-6/12">
            {/* Display-only fields */}
            <div className="flex flex-col gap-4">
              <div className="w-full">
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input value={gift.name} disabled />
                  </FormControl>
                </FormItem>
              </div>

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="">Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-60 bg-white">
                        {[
                          'OPEN',
                          'PENDING',
                          'COMPLETED',
                          'FAILED',
                          'REFUNDED',
                        ].map(status => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="font-normal text-red-600" />
                  </FormItem>
                )}
              />

              <div className="w-full">
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input value={gift.price} disabled />
                  </FormControl>
                </FormItem>
              </div>

              <div className="w-full">
                <FormItem className="flex justify-between items-center">
                  <FormLabel className="text-base font-normal">
                    Regalo grupal 🎁
                  </FormLabel>
                  <FormControl>
                    <Switch checked={wishlistGift.isGroupGift} disabled />
                  </FormControl>
                </FormItem>
              </div>
            </div>

            <div className="w-full">
              <Button
                type="submit"
                variant="primaryButton"
                disabled={isLoading}
              >
                Guardar
                {isLoading ? (
                  <Loader2 className="ml-2 w-4 h-4 animate-spin" />
                ) : (
                  <FiEdit3 fontSize={'16px'} className="ml-2" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
