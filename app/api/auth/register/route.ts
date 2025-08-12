import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { name, email, password, phone, referralCode } = await req.json();

  const client = await clientPromise;
  const db = client.db();
  const users = db.collection('users');

  const existingUser = await users.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ success: false, message: 'Email already registered' }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await users.insertOne({
    name,
    email,
    password: hashedPassword,
    phone,
    referralCode,
    createdAt: new Date()
  });

  return NextResponse.json({ success: true, message: 'Registration successful', token: 'dummy-token' });
}
