import prismaClient from '@/prisma/client'; // Adjust the import path according to your project structure
import { TransactionCreateSchema } from '@/schemas/form';
import { TransactionStatus } from '@prisma/client';
import type { z } from 'zod';
import { getErrorMessage } from '../helper';

export async function createTransaction(
  formData: z.infer<typeof TransactionCreateSchema>
) {
  const validatedFields = TransactionCreateSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors.map(e => e.message).join(', '),
    };
  }

  const { wishListGift, amount } = validatedFields.data;

  const formattedAmount = Number.parseFloat(amount);

  if (wishListGift.isFullyPaid) {
    return {
      error: 'Este regalo ya está completamente pagado',
    };
  }

  const totalCost = Number.parseFloat(wishListGift.gift.price);
  const currentPaidAmount =
    wishListGift.transactions?.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    ) || 0;

  // Validate the amount
  if (wishListGift.isGroupGift && wishListGift.groupGiftParts) {
    const partCost = totalCost / wishListGift.groupGiftParts;

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

  try {
    const transaction = await prismaClient.transaction.create({
      data: {
        wishListGiftId: wishListGift.id,
        amount: formattedAmount,
        status: TransactionStatus.OPEN, // You can adjust this as per your workflow
      },
    });

    // Update the WishListGift to set it as fully paid if applicable
    if (isFullyPaid) {
      await prismaClient.wishListGift.update({
        where: { id: wishListGift.id },
        data: { isFullyPaid },
      });
    }

    return {
      success: true,
      transaction,
    };
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
}
