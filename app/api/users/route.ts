import prisma from '@/db/client';
import { MagicLoginSchema } from '@/schemas';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  const validatedFields = MagicLoginSchema.safeParse({ email });

  if (!validatedFields.success) {
    return NextResponse.json({ error: 'Campos inválidos' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: validatedFields.data.email },
  });

  if (!user) {
    return NextResponse.json(
      { error: 'No existe usuario con este email' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    status: 200,
    user: user,
  });
}
