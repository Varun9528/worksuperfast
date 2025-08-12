// app/api/updatejobstatus/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  try {
    const { jobId, newStatus } = await req.json();
    const client = await clientPromise;
    const db = client.db();

    const jobs = db.collection('jobs');
    const notifications = db.collection('notifications');

    const jobObjectId = new ObjectId(jobId);
    const job = await jobs.findOne({ _id: jobObjectId });

    if (!job) {
      return NextResponse.json({ success: false, message: 'Job not found' }, { status: 404 });
    }

    // ✅ Update job status
    await jobs.updateOne(
      { _id: jobObjectId },
      {
        $set: {
          status: newStatus,
          updatedAt: new Date()
        }
      }
    );

    // ✅ Send Notification to Job Poster (if available)
    if (job.postedBy) {
      await notifications.insertOne({
        userId: job.postedBy,
        title: `Your job "${job.title}" has been ${newStatus}`,
        message:
          newStatus === 'approved'
            ? 'Your posted job has been approved by admin.'
            : 'Your job has been updated by admin.',
        type: 'job_status',
        relatedId: job._id,
        isRead: false,
        createdAt: new Date()
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Status update error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
