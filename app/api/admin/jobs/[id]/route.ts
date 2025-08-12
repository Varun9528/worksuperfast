// app/api/jobs/[id]/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { status, adminId } = await req.json();

  if (!['approved', 'rejected'].includes(status)) {
    return NextResponse.json({ success: false, message: 'Invalid status' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('jobs').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status,
          approvedBy: new ObjectId(adminId),
          approvedAt: new Date(),
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin update failed:', error);
    return NextResponse.json({ success: false, message: 'Admin update failed' }, { status: 500 });
  }
}
