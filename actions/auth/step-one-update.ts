'use server';

import { auth } from '@/auth';
import prisma from '@/db/client';
import { StepOneSchema } from '@/schemas';
import type { User, WishList } from '@prisma/client';
import type * as z from 'zod';

export const stepOneUpdate = async (
  values: z.infer<typeof StepOneSchema> | null = null
) => {
  if (values === undefined || values === null) {
    return { error: 'Algo salio mal! reintanta' };
  }

  const validatedFields = StepOneSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Campos inválidos' };
  }

  if (validatedFields.success) {
    const {
      partnerName,
      partnerEmail,
      partnerLastName,
      name,
      lastName,
      weddingUrl,
      weddingDate,
    } = validatedFields.data;

    let bride: User;
    let groom: User;
    let wishlist: WishList;

    try {
      bride = await prisma.user.upsert({
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
      groom = await prisma.user.upsert({
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
      wishlist = await prisma.wishList.create({
        data: {
          description: 'My first wish list',
        },
      });
      await prisma.wedding.create({
        data: {
          groomId: groom.id,
          brideId: bride.id,
          date: weddingDate ? new Date(weddingDate) : undefined,
          url: weddingUrl,
          wishListId: wishlist.id,
        },
      });
    } catch (error) {
      console.error(error);
      return { error: 'Error actualizando tu perfil' };
    }

    try {
      await prisma.user.update({
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
  }
};
