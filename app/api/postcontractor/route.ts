import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get('name');
    const aadhar = formData.get('aadhar');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const address = formData.get('address');
    const experience = formData.get('experience');
    const categories = JSON.parse(formData.get('categories') as string);
    const file = formData.get('idFile') as File;

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ success: false, error: 'Invalid file type' }, { status: 400 });
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ success: false, error: 'File too large (max 5MB)' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    const filename = `${uuidv4()}-${file.name}`;
    const filepath = path.join(uploadsDir, filename);
    await fs.writeFile(filepath, buffer);

    const client = await clientPromise;
    const db = client.db();

    const usersCollection = db.collection('users');
    const contractorsCollection = db.collection('contractors');

    // ✅ User ko email ke base pe find karo
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found with this email' }, { status: 400 });
    }

    // ✅ Contractor insert karo with userId
    await contractorsCollection.insertOne({
      name,
      aadhar,
      phone,
      email,
      address,
      experience,
      categories,
      idFilePath: `/uploads/${filename}`,
      userId: user._id, // ✅ VERY IMPORTANT
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
