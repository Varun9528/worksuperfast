import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const jobs = await db.collection('jobs').find().toArray();

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch jobs' }, { status: 500 });
  }
}
