'use server';

import prisma from '@/db/client';
import { sendVericationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { RegisterSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import * as z from 'zod';

export const register = async (
  values: z.infer<typeof RegisterSchema> | null = null
) => {
  if (values === undefined || values === null) {
    return { error: 'Algo salio mal! reintanta' };
  }

  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Campos inválidos' };
  }

  const { email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findFirst({
    where: { email },
  });

  if (existingUser) {
    return { error: 'Email ya esta en uso' };
  }

  try {
    await prisma.user.create({
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
  // catch errors

  await sendVericationEmail(verificationToken.email, verificationToken.token);
};
