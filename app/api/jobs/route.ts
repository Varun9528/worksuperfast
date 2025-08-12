import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const jobs = await db
      .collection('jobs')
      .find({ status: 'approved' })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching jobs' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Extract form fields
    const fields = [
      'title', 'description', 'category', 'payment', 'paymentType',
      'state', 'city', 'pincode', 'name', 'phone', 'email', 'postedBy'
    ];

    const jobData: any = {};

    for (const field of fields) {
      jobData[field] = formData.get(field)?.toString() || '';
    }

    // Handle location object (lat, lng, address)
    const locationRaw = formData.get('location');
    if (locationRaw) {
      try {
        const parsed = JSON.parse(locationRaw.toString());
        if (
          typeof parsed === 'object' &&
          (parsed.lat || parsed.lng || parsed.address)
        ) {
          jobData.location = {
            lat: parsed.lat || undefined,
            lng: parsed.lng || undefined,
            address: parsed.address || '',
          };
        }
      } catch (err) {
        console.warn('Invalid location JSON:', err);
        jobData.location = null;
      }
    }

    // Handle optional photo
    const photo = formData.get('photo') as File | null;
    if (photo && photo.size > 0) {
      const buffer = Buffer.from(await photo.arrayBuffer());
      jobData.photo = {
        name: photo.name,
        type: photo.type,
        size: photo.size,
        data: buffer.toString('base64'),
      };
    }

    // Meta fields
    jobData.status = 'pending';
    jobData.createdAt = new Date();

    // Insert into database
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('jobs').insertOne(jobData);

    // Optional: Create notification
    if (jobData.postedBy) {
      await db.collection('notifications').insertOne({
        userId: jobData.postedBy,
        message: `Your job "${jobData.title}" has been submitted for approval.`,
        type: 'post-work',
        isRead: false,
        createdAt: new Date(),
      });
    }

    return NextResponse.json({ success: true, jobId: result.insertedId });
  } catch (error) {
    console.error('Job post error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to post job' },
      { status: 500 }
    );
  }
}
