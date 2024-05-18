import { createTransaction } from '@/actions/data/transaction';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { TransactionCreateSchema } from '@/schemas/form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Gift, WishListGift } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import PriceField from '../shared/price-field-input';

type TransactionFormProps = {
  wishlistGift: WishListGift & { gift: Gift };
};

const TransactionForm = ({ wishlistGift }: TransactionFormProps) => {
  const form = useForm({
    resolver: zodResolver(TransactionCreateSchema),
    defaultValues: {
      wishListGift: {
        ...wishlistGift,
        groupGiftParts: '0',
      },
      amount: '',
    },
  });

  const router = useRouter();
  const { toast } = useToast();

  const handleCreateTransaction = async (
    data: z.infer<typeof TransactionCreateSchema>
  ) => {
    const response = await createTransaction(data);

    if (response?.error) {
      toast({
        title: 'Error',
        description: response.error,
        variant: 'destructive',
      });
      return;
    }

    // toast({
    //   title: 'Success!',
    //   description: 'Transaction created successfully.',
    // });

    router.push('/dashboard');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreateTransaction)}>
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => <PriceField field={field} />}
        />
        <Button type="submit">Create Transaction</Button>
      </form>
    </Form>
  );
};

export default TransactionForm;
