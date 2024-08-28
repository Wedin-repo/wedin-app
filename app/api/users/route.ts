import prismaClient from '@/prisma/client';
import { MagicLoginSchema } from '@/schemas/auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const validatedFields = MagicLoginSchema.safeParse({ email });

    if (!validatedFields.success) {
      return NextResponse.json({ error: 'Invalid fields' }, { status: 400 });
    }

    const user = await prismaClient.user.findUnique({
      where: { email: validatedFields.data.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      status: 200,
      user: user,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
