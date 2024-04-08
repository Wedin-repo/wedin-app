import prisma from '@/db/client';
// import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, hasPYbankAccount } = body;

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hasPYbankAccount: hasPYbankAccount,
        isOnboarded: true,
      },
    });

    // revalidatePath('/', 'layout');
    // revalidateTag('users');
    return NextResponse.json({
      message: 'User updated successfully',
      revalidate: true,
    });
  } catch (error: any) {
    console.error('Error updating user:', error);
  }
}
