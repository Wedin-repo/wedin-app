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

  try {
    const bride = await prisma.user.create({
      data: {
        email: partnerEmail,
        name: partnerName,
        lastName: partnerLastName,
        isMagicLinkLogin: true,
        isOnboarded: true,
      },
    });

    // this is the only place where we create a wishList for the user
    const wishList = await prisma.wishList.create({
      data: {
        description: 'My first wish list',
      },
    });

    await prisma.wedding.create({
      data: {
        groomId: userId,
        brideId: bride.id,
        date: weddingDate ? new Date(weddingDate) : undefined,
        url: weddingUrl,
        wishListId: wishList.id,
      },
    });

    return NextResponse.json({
      message: 'Wedding details updated and groom created successfully',
    });
  } catch (error: any) {
    console.error('Error updating wedding:', error);

    if (error.code === 'P2025') {
      return new Response(JSON.stringify({ error: 'Wedding not found' }), {
        status: 404, // Not Found
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500, // Internal Server Error
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
