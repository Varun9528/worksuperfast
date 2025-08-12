import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { jobId, amount, contractor } = body;

    if (!jobId || !amount || !contractor) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const transaction = {
      jobId,
      amount,
      contractor,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('transactions').insertOne(transaction);

    return NextResponse.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error('Transaction POST error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const transactions = await db.collection('transactions').find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Transaction GET error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
