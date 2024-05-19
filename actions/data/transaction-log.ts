'use server';

import prismaClient from '@/prisma/client';
import { TransactionStatusLogUpdateSchema } from '@/schemas/form';
import type { z } from 'zod';
import { getErrorMessage } from '../helper';

export async function createTranstactionStatusLog(
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
}
