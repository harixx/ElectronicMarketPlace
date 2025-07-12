import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    const cartItems = await prisma.cartItem.findMany({
      where: {
        sessionId,
      },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return NextResponse.json({ error: 'Failed to fetch cart items' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { sessionId, productId, size, color, quantity } = await request.json();

    if (!sessionId || !productId || !size || !color) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        sessionId,
        productId,
        size,
        color,
      },
    });

    if (existingItem) {
      // Update quantity
      const updatedItem = await prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: existingItem.quantity + (quantity || 1),
        },
        include: {
          product: true,
        },
      });

      return NextResponse.json(updatedItem);
    } else {
      // Create new item
      const newItem = await prisma.cartItem.create({
        data: {
          sessionId,
          productId,
          size,
          color,
          quantity: quantity || 1,
        },
        include: {
          product: true,
        },
      });

      return NextResponse.json(newItem);
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    await prisma.cartItem.deleteMany({
      where: {
        sessionId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error clearing cart:', error);
    return NextResponse.json({ error: 'Failed to clear cart' }, { status: 500 });
  }
}