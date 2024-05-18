import prismaClient from '@/prisma/client'; // Adjust the import path according to your project structure
import { TransactionCreateSchema } from '@/schemas/form';
import { TransactionStatus } from '@prisma/client';
import type { z } from 'zod';
import { getErrorMessage } from '../helper';
import { CreateTransactionParams } from '@/schemas/params';

export async function createTransaction(
  formData: z.infer<typeof CreateTransactionParams>
) {
  const validatedFields = CreateTransactionParams.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors.map(e => e.message).join(', '),
    };
  }

  const { wishlistGift, amount } = validatedFields.data;

  const formattedAmount = Number.parseFloat(amount);

  if (wishlistGift.isFullyPaid) {
    return {
      error: 'Este regalo ya está completamente pagado',
    };
  }

  const totalCost = Number.parseFloat(wishlistGift.gift.price);
  const currentPaidAmount =
    wishlistGift.transactions?.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    ) || 0;

  // Validate the amount
  if (wishlistGift.isGroupGift && wishlistGift.groupGiftParts) {
    const partCost = totalCost / Number.parseInt(wishlistGift.groupGiftParts);

    if (
      formattedAmount !== partCost &&
      formattedAmount !== totalCost - currentPaidAmount
    ) {
      return {
        error:
          'El monto debe ser igual al costo de la parte o al costo restante para regalos grupales',
      };
    }
  } else {
    if (formattedAmount !== totalCost) {
      return {
        error:
          'El monto debe ser igual al precio total del regalo para regalos no grupales',
      };
    }
  }

  const updatedPaidAmount = currentPaidAmount + formattedAmount;
  const isFullyPaid = updatedPaidAmount >= totalCost;

  console.log('isFullyPaid: ', isFullyPaid);

  try {
    // const transaction = await prismaClient.transaction.create({
    //   data: {
    //     wishlistGiftId: wishlistGift.id,
    //     amount: formattedAmount.toString(),
    //     status: TransactionStatus.OPEN, // You can adjust this as per your workflow
    //   },
    // });
    //
    // // Update the wishlistGift to set it as fully paid if applicable
    // if (isFullyPaid) {
    //   await prismaClient.wishlistGift.update({
    //     where: { id: wishlistGift.id },
    //     data: { isFullyPaid },
    //   });
    // }
    //
    // return {
    //   success: true,
    //   transaction,
    // };
  } catch (error: unknown) {
    // return {
    //   error: getErrorMessage(error),
    // };
  }
}
