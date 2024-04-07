import prisma from '@/db/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, weddingCountry, weddingCity } = body;

  try {
    await prisma.wedding.update({
      where: {
        groomId: userId,
      },
      data: {
        country: weddingCountry && weddingCountry,
        city: weddingCity && weddingCity,
      },
    });

    return NextResponse.json({
      message: 'Wedding country and city updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating wedding:', error);

    if (error.code === 'P2025') {
      return new Response(JSON.stringify({ error: 'Wedding not found' }), {
        status: 404, // Not Found
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Error updating wedding' }), {
      status: 500, // Internal Server Error
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
