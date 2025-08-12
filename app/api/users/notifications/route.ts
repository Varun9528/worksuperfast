import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json({ success: false, message: 'Invalid or missing userId' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const notifications = await db
      .collection('notifications')
      .find({ userId: new ObjectId(userId) }) // ✅ userId must be ObjectId type
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, notifications }); // ✅ Correct response structure
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
