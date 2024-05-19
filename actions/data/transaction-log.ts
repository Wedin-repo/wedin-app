'use server';

import prismaClient from '@/prisma/client';
import { TransactionStatusLogUpdateSchema } from '@/schemas/form';
import type { Transaction } from '@prisma/client';
import type { z } from 'zod';
import { getErrorMessage } from '../helper';

export async function updateTransactionStatus(
  formData: z.infer<typeof TransactionStatusLogUpdateSchema>
) {
  // Validate the input data
  const validatedData = TransactionStatusLogUpdateSchema.safeParse(formData);

  if (!validatedData.success) {
    return {
      error: validatedData.error.errors.map(err => err.message).join(', '),
    };
  }

  const { transaction, status, changedById, changedAt } = validatedData.data;
  const { id: transactionId, status: previousStatus } = transaction;

  // Update the transaction status
  let updatedTransaction: Transaction | null = null;
  try {
    updatedTransaction = await prismaClient.transaction.update({
      where: { id: transactionId },
      data: { status },
    });
  } catch (error) {
    console.error('Error updating transaction status:', error);
    return { error: getErrorMessage(error) };
  }

  // Log the status change
  try {
    await prismaClient.transactionStatusLog.create({
      data: {
        transactionId,
        previousStatus,
        status,
        changedById,
        changedAt,
      },
    });
  } catch (error) {
    console.error('Error logging status change:', error);
    return { error: getErrorMessage(error) };
  }

  return { updatedTransaction };
}
