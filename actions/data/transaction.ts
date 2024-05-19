'use server';

import prismaClient from '@/prisma/client';
import { TransactionEditSchema } from '@/schemas/form';
import {
  CreateTransactionParams,
  GetTransactionsParams,
} from '@/schemas/params';
import { type Prisma, TransactionStatus, UserType } from '@prisma/client';
import type { z } from 'zod';
import { getErrorMessage } from '../helper';

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

  try {
    const transaction = await prismaClient.transaction.create({
      data: {
        wishlistGiftId: wishlistGift.id,
        amount: formattedAmount.toString(),
        status: TransactionStatus.OPEN, // You can adjust this as per your workflow
        payeeRole: UserType.INVITEE,
        payerRole: UserType.ORGANIZER,
      },
    });
    if (!transaction) {
      return { error: 'No se pudo crear la transacción' };
    }
  } catch (error) {
    return { error: getErrorMessage(error) };
  }

  try {
    // Update the wishlistGift to set it as fully paid if applicable
    if (isFullyPaid) {
      await prismaClient.wishlistGift.update({
        where: { id: wishlistGift.id },
        data: { isFullyPaid },
      });
    }
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
}

export async function getTransactions(
  searchParams?: z.infer<typeof GetTransactionsParams>
) {
  if (!searchParams) {
    try {
      const transactions = await prismaClient.transaction.findMany({
        include: {
          wishlistGift: {
            include: {
              event: true,
              gift: true,
            },
          },
        },
      });
      const totalAmount = transactions.reduce((sum, transaction) => {
        return sum + Number.parseInt(transaction.amount);
      }, 0);

      return { transactions, totalAmount };
    } catch (error) {
      return { error: getErrorMessage(error) };
    }
  }

  const validatedParams = GetTransactionsParams.safeParse(searchParams);

  if (!validatedParams.success) {
    return {
      error: validatedParams.error.errors.map(err => err.message).join(', '),
    };
  }

  const {
    eventId,
    userId,
    page,
    itemsPerPage = 15,
    name,
  } = validatedParams.data;

  const query: Prisma.TransactionWhereInput = {};

  if (eventId) {
    query.wishlistGift = { eventId };
  }

  if (userId) {
    query.OR = [
      { wishlistGift: { event: { primaryUserId: userId } } },
      { wishlistGift: { event: { secondaryUserId: userId } } },
    ];
  }

  if (name) {
    query.wishlistGift = {
      gift: {
        name: {
          contains: name.trim(),
          mode: 'insensitive',
        },
      },
    };
  }

  const skip = page ? (Number(page) - 1) * itemsPerPage : undefined;
  const take = page ? itemsPerPage : undefined;

  try {
    const transactions = await prismaClient.transaction.findMany({
      where: query,
      include: {
        wishlistGift: {
          include: {
            event: true,
            gift: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take,
    });

    // Calculate the sum of transaction amounts
    const totalAmount = transactions.reduce((sum, transaction) => {
      return sum + Number.parseInt(transaction.amount);
    }, 0);

    return { transactions, totalAmount };
  } catch (error) {
    console.error('Error retrieving transactions:', error);
    return { error: getErrorMessage(error) };
  }
}

export async function editTransaction(
  formData: z.infer<typeof TransactionEditSchema>,
  transactionId: string
) {
  const validatedFields = TransactionEditSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors.map(e => e.message).join(', '),
    };
  }

  const { status, notes } = validatedFields.data;

  try {
    await prismaClient.transaction.update({
      where: { id: transactionId },
      data: { status, notes },
    });
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}
