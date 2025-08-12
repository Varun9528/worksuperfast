import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ success: false, message: 'Missing userId' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const notifications = await db
      .collection('notifications')
      .find({ userId: { $eq: userId.toString() } }) // ✅ Ensure userId is string
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId, message, type = 'general' } = await req.json();

    if (!userId || !message) {
      return NextResponse.json({ success: false, message: 'Missing userId or message' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    await db.collection('notifications').insertOne({
      userId: userId.toString(), // ✅ Always store as string
      message,
      type,
      isRead: false,
      createdAt: new Date()
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Notification error:', error);
    return NextResponse.json({ success: false, message: 'Failed to create notification' }, { status: 500 });
  }
}
