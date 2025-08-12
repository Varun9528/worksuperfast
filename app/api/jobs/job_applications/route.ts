import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const application = {
      jobId: new ObjectId(body.jobId),
      contractorId: new ObjectId(body.contractorId),
      applicationMessage: body.message || '',
      quotedPrice: Number(body.quotedPrice) || 0,
      status: 'pending',
      appliedAt: new Date(),
      respondedAt: null
    };

    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('job_applications').insertOne(application);

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Error applying to job:', error);
    return NextResponse.json({ success: false, message: 'Application failed' }, { status: 500 });
  }
}
