// app/api/getcontractors/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const contractors = await db.collection('contractors').find().toArray();

    return NextResponse.json({ success: true, contractors });
  } catch (error) {
    console.error('GET contractors error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
