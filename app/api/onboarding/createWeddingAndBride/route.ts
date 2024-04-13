import prisma from '@/db/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const {
    userId,
    weddingDate,
    weddingUrl,
    partnerEmail,
    partnerName,
    partnerLastName,
  } = body;

  let bride, wishList;

  try {
    bride = await prisma.user.create({
      data: {
        email: partnerEmail,
        name: partnerName,
        lastName: partnerLastName,
        isMagicLinkLogin: true,
        isOnboarded: true,
      },
    });
  } catch (error: any) {
    return handleError(error, 'Failed to create bride');
  }

  try {
    wishList = await prisma.wishList.create({
      data: {
        description: 'My first wish list',
      },
    });
  } catch (error: any) {
    return handleError(error, 'Failed to create wish list');
  }

  try {
    await prisma.wedding.create({
      data: {
        groomId: userId,
        brideId: bride.id,
        date: weddingDate ? new Date(weddingDate) : undefined,
        url: weddingUrl,
        wishListId: wishList.id,
      },
    });
  } catch (error: any) {
    return handleError(error, 'Failed to create wedding');
  }

  return NextResponse.json({ status: '200' });
}

function handleError(error: any, message: string) {
  let statusCode = 500;
  let errorMessage = 'Internal Server Error';

  if (error.code === 'P2025') {
    statusCode = 404;
    errorMessage = 'Item not found';
  }

  return new Response(JSON.stringify({ error: message ?? errorMessage }), {
    status: statusCode,
    headers: { 'Content-Type': 'application/json' },
  });
}
