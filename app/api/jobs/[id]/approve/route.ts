import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    const body = await req.json();
    const { adminId } = body;

    if (!adminId) {
      return NextResponse.json({ success: false, message: 'Missing adminId' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const job = await db.collection('jobs').findOne({ _id: new ObjectId(id) });

    if (!job) {
      return NextResponse.json({ success: false, message: 'Job not found' }, { status: 404 });
    }

    await db.collection('jobs').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: 'approved',
          approvedBy: new ObjectId(adminId),
          approvedAt: new Date(),
        },
      }
    );

    if (job.postedBy) {
      await db.collection('notifications').insertOne({
        userId: job.postedBy.toString(), // ✅ Store userId as string
        message: `Your job "${job.title || 'Untitled'}" has been approved.`,
        type: 'post-work',
        isRead: false,
        createdAt: new Date(),
      });
    }

    return NextResponse.json({ success: true, message: 'Job approved and notification sent' });
  } catch (error) {
    console.error('Error in job approval:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
