import prisma from '@/db/client';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const body = await request.json();
  const { email } = body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return NextResponse.json({
      user: user
    });
  } catch (error: any) {
    console.error('Error finding user:', error);

    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500, // Internal server error
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
