import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const { email, name, phone } = await req.json();

    if (!email || !name || !phone) {
      return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(); // or client.db('worksuperfast')
    const usersCollection = db.collection('users');

    const result = await usersCollection.updateOne(
      { email: email.trim() },
      { $set: { name, phone } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update Profile Error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
