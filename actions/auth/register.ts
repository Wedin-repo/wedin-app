'use server';

import prismaClient from '@/prisma/client';
import { sendVericationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { RegisterSchema } from '@/schemas/auth';
import bcrypt from 'bcryptjs';
import type * as z from 'zod';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Campos inválidos' };
  }

  const { email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await prismaClient.user.findFirst({
    where: { email },
  });

  if (existingUser) {
    return { error: 'Email ya esta en uso' };
  }

  try {
    await prismaClient.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    if (error) {
      return { error: 'Error creando usuario' };
    }
  }

  const verificationToken = await generateVerificationToken(email);

  await sendVericationEmail(
    verificationToken.identifier,
    verificationToken.token
  );
};
