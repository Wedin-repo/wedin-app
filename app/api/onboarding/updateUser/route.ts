import prisma from '@/db/client';
import { NextResponse } from 'next/server';
import { User } from '@prisma/client';

type RequestBodyType = User & { userId: string };

export async function POST(request: Request) {
  try {
    const body: RequestBodyType = await request.json();
    const { userId, name, lastName, onboardingStep } = body;

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
        lastName: lastName,
        onboardingStep: onboardingStep,
      },
    });

    return NextResponse.json({
      message: 'User updated successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        lastName: updatedUser.lastName,
      },
    });
  } catch (error: any) {
    console.error('Error updating user:', error);

    if (error.code === 'P2025') {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Error updating user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
