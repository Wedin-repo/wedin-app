'use server';

import type * as z from 'zod';
import prismaClient from '@/prisma/client';
import { BankDetailsFormSchema } from '@/schemas/form';
import { revalidatePath } from 'next/cache';

export async function updateBankDetails(
  values: z.infer<typeof BankDetailsFormSchema>
): Promise<{ success?: boolean; error?: string }> {
  const validatedField = BankDetailsFormSchema.safeParse(values);

  if (!validatedField.success) {
    return { error: 'Invalid fields' };
  }

  try {
    const {
      eventId,
      bankName,
      accountNumber,
      accountType,
      accountHolder,
      identificationNumber,
      identificationType,
      razonSocial,
      ruc,
    } = validatedField.data;

    await prismaClient.bankDetails.upsert({
      where: {
        eventId: eventId,
      },
      update: {
        bankName: bankName,
        accountHolder: accountHolder,
        accountNumber: accountNumber,
        accountType: accountType,
        identificationNumber: identificationNumber,
        identificationType: identificationType,
        razonSocial: razonSocial,
        ruc: ruc,
      },
      create: {
        bankName: bankName,
        accountHolder: accountHolder,
        accountNumber: accountNumber,
        accountType: accountType,
        identificationNumber: identificationNumber,
        identificationType: identificationType,
        razonSocial: razonSocial,
        eventId: eventId,
        ruc: ruc,
      },
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error upserting bank details:', error);
    return { error: 'Failed to upsert bank details' };
  }
}
