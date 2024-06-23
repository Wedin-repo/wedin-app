'use client';

import { createTransaction } from '@/actions/data/transaction';
import PriceField from '@/components/forms/shared/price-field-input';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { TransactionCreateSchema } from '@/schemas/form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Gift, Transaction, WishlistGift } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { Progress } from '@/components/ui/progress';
import { formatPrice } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

type CreateTransactionFormProps = {
  wishlistGift: WishlistGift & { gift: Gift; transactions: Transaction[] };
  setIsOpen?: (value: boolean) => void;
};

export default function CreateTransactionForm({
  setIsOpen,
  wishlistGift,
}: CreateTransactionFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const totalCost = Number.parseInt(wishlistGift.gift.price);
  const { toast } = useToast();

  let amountToPay = totalCost;

  if (wishlistGift.isGroupGift && wishlistGift.groupGiftParts) {
    amountToPay = totalCost / Number.parseInt(wishlistGift.groupGiftParts);
  }

  const form = useForm({
    resolver: zodResolver(TransactionCreateSchema),
    defaultValues: {
      amount: amountToPay.toString(),
    },
  });

  const handleCreateTransaction = async (
    data: z.infer<typeof TransactionCreateSchema>
  ) => {
    setIsLoading(true);
    const validatedData = TransactionCreateSchema.safeParse(data);

    if (!validatedData.success) {
      toast({
        title: 'Error',
        description: 'Datos inválidos. Por favor, revisa los campos.',
        variant: 'destructive',
      });

      setIsLoading(false);
      return;
    }

    const response = await createTransaction(
      validatedData.data,
      'INVITEE',
      'ORGANIZER',
      wishlistGift
    );

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
      title: 'Success!',
      description: 'Transaction created successfully.',
      className: 'bg-white',
    });

    setIsLoading(false);
    setIsOpen?.(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateTransaction)}
        className="flex flex-col h-full justify-between"
      >
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-medium text-primaryTextColor">
            {wishlistGift.gift.name}
          </h2>

          <div className="flex flex-col">
            <p className="text-base text-Gray300">Valor total</p>
            <p className="text-xl text-primaryTextColor">
              {formatPrice(totalCost)}
            </p>
          </div>

          <div className="flex flex-col">
            <p className="text-base text-Gray300">Aún faltan</p>
            <p className="text-xl text-primaryTextColor mb-2">
              {formatPrice(amountToPay)}
            </p>
            <div className="flex flex-col">
              <Progress value={35} />
              <span className="text-sm text-Gray300 flex justify-end mt-1">
                35%
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {/* <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <PriceField field={field} title={'Monto a contribuir'} />
            )}
          /> */}

          <div className="flex flex-col gap-2">
            <p className="text-base text-Gray300">Monto a contribuir</p>
            <Input placeholder="Gs." />
            <div className="flex items-center gap-2">
              <Checkbox />
              <p className="text-sm text-Gray300">
                Completar el valor total del regalo
              </p>
            </div>
          </div>

          <Button
            variant="primaryButton"
            className=""
            type="submit"
            disabled={isLoading}
          >
            Contribuir
          </Button>
        </div>
      </form>
    </Form>
  );
}
