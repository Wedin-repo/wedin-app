'use server';

import { auth } from '@/auth';
import prismaClient from '@/prisma/client';
import { StepOneSchema } from '@/schemas/auth';
import type { User, Wishlist } from '@prisma/client';
import type * as z from 'zod';

export const stepOneUpdate = async (values: z.infer<typeof StepOneSchema>) => {
  const validatedFields = StepOneSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Campos inválidos' };
  }

  const {
    partnerName,
    partnerEmail,
    partnerLastName,
    name,
    lastName,
    eventUrl,
    eventDate,
  } = validatedFields.data;

  let primaryUser: User;
  let secondaryUser: User;
  let wishlist: Wishlist;

  try {
    secondaryUser = await prismaClient.user.upsert({
      where: {
        email: partnerEmail, // The unique identifier to search for
      },
      update: {
        name: partnerName,
        lastName: partnerLastName,
        isMagicLinkLogin: true,
        isOnboarded: true,
      },
      create: {
        email: partnerEmail,
        name: partnerName,
        lastName: partnerLastName,
        isMagicLinkLogin: true,
        isOnboarded: true,
      },
    });
  } catch (error) {
    return { error: 'Error creado el usuario de tu pareja' };
  }

  const session = await auth();

  if (!session?.user?.email) return { error: 'Error obteniendo tu sesión' };

  try {
    primaryUser = await prismaClient.user.upsert({
      where: {
        email: session.user.email, // This checks if a user exists with this email
      },
      update: {
        name: name,
        lastName: lastName,
      },
      create: {
        email: session.user.email, // Include email in the creation if not exists
        name: name,
        lastName: lastName,
      },
    });
  } catch (error) {
    console.error(error);
    return { error: 'Error actualizando tu perfil' };
  }

  try {
    wishlist = await prismaClient.wishlist.create({
      data: {},
    });

    await prismaClient.event.create({
      data: {
        secondaryUserId: secondaryUser.id,
        primaryUserId: primaryUser.id,
        date: eventDate ? new Date(eventDate) : undefined,
        url: eventUrl
          .trim()
          .replace(/[^a-zA-Z0-9-]/g, '')
          .toLowerCase(),
        wishlistId: wishlist.id,
      },
    });
  } catch (error) {
    console.error(error);
    return { error: 'Error actualizando tu perfil' };
  }

  try {
    await prismaClient.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        onboardingStep: 2,
      },
    });
  } catch (error) {
    console.error(error);
    return { error: 'Error actualizando tu perfil' };
  }
};
