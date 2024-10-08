'use client';

import { createTransaction } from '@/actions/data/transaction';
import PriceField from '@/components/forms/shared/price-field-input';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { TransactionCreateSchema } from '@/schemas/form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Gift, Transaction, WishlistGift } from '@prisma/client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { Progress } from '@/components/ui/progress';
import { formatPrice } from '@/lib/utils';
import { Input } from '@/components/ui/input';
//import { Checkbox } from '@/components/ui/checkbox';
import { useCart } from '@/lib/context/cart-context';

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
  const [contributeAmount, setContributeAmount] = useState('');
  const [progress, setProgress] = useState(0);
  const [isFullAmountChecked, setIsFullAmountChecked] = useState(false);
  const { toast } = useToast();
  const { addItem } = useCart();
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

  const { formState } = form;

  useEffect(() => {
    form.setValue('amount', contributeAmount);
  }, [contributeAmount, form]);

  const formatAndLimitAmount = (value: string) => {
    const numericValue = parseInt(value.replace(/\D/g, '') || '0', 10);
    const limitedValue = Math.min(numericValue, amountToPay);
    return limitedValue.toLocaleString();
  };

  const calculateProgress = (amount: number) => {
    return Math.min(100, (amount / totalCost) * 100);
  };

  const handleContributeAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formattedAmount = formatAndLimitAmount(event.target.value);
    const numericAmount = parseInt(formattedAmount.replace(/,/g, ''), 10);
    setContributeAmount(formattedAmount);
    setProgress(calculateProgress(numericAmount));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckedState = event.target.checked;
    setIsFullAmountChecked(newCheckedState);
    setContributeAmount(newCheckedState ? amountToPay.toString() : '');
    setProgress(newCheckedState ? 100 : 0);
  };

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

    const pureAmountToGift = Number.parseInt(
      validatedData.data.amount.replace(/\D/g, '')
    );
    handleAddToCart(pureAmountToGift);

    // const response = await createTransaction(
    //   validatedData.data,
    //   'INVITEE',
    //   'ORGANIZER',
    //   wishlistGift
    // );

    // if (response?.error) {
    //   toast({
    //     title: 'Error',
    //     description: response.error,
    //     variant: 'destructive',
    //   });

    //   setIsLoading(false);
    //   return;
    // }

    toast({
      title: 'Exito! 🎁🎉',
      description: 'Regalo agregado al carrito.',
      className: 'bg-white',
    });

    setIsLoading(false);
    setIsOpen?.(false);
    //TODO: redirect to cart
  };

  const handleAddToCart = (amountToGift: number) => {
    const cartItem = {
      ...wishlistGift,
      amountToGift,
    };
    addItem(cartItem);
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
              <Progress value={progress} />
              <span className="text-sm text-Gray300 flex justify-end mt-1">
                {Math.floor(progress)}% {progress === 100 ? '🎉' : ''}
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
            {!isFullAmountChecked ? (
              <Input
                name="amount"
                value={contributeAmount}
                onChange={handleContributeAmountChange}
                placeholder="Gs."
                disabled={isFullAmountChecked}
              />
            ) : (
              <Input
                value={formatPrice(Number(contributeAmount))}
                disabled={true}
              />
            )}
            <div className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                checked={isFullAmountChecked}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded-full border border-borderColor cursor-pointer"
              />
              <p className="text-sm text-Gray300">
                Completar el valor total del regalo
              </p>
            </div>
          </div>

          <Button
            variant="primaryButton"
            className=""
            type="submit"
            disabled={isLoading || !formState.isDirty}
          >
            Agregar
          </Button>
        </div>
      </form>
    </Form>
  );
}
