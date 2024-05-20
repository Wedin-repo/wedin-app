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

type CreateTransactionFormProps = {
  wishlistGift: WishlistGift & { gift: Gift; transactions: Transaction[] };
};

export default function CreateTransactionForm({
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
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreateTransaction)}>
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => <PriceField field={field} disabled={true} />}
        />

        <Button
          variant="primaryButton"
          className="mt-6"
          type="submit"
          disabled={isLoading}
        >
          Pagar
        </Button>
      </form>
    </Form>
  );
}
