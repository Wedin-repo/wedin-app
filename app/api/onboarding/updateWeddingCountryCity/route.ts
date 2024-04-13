import prisma from '@/db/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { userId, weddingCountry, weddingCity } = body;

  try {
    await prisma.wedding.update({
      where: {
        groomId: userId,
      },
      data: {
        country: weddingCountry,
        city: weddingCity,
      },
    });

    return NextResponse.json({
      message: 'Wedding country and city updated successfully',
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Wedding not found' },
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return NextResponse.json(
      { error: 'Error updating wedding', messagge: error },
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
