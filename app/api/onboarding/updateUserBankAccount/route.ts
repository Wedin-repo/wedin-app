import prisma from '@/db/client';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server'

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

    return NextResponse.json({
      message: 'User updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating user:', error);
  }
}
