// app/api/updatestatus/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  try {
    const { contractorId, newStatus } = await req.json();
    const client = await clientPromise;
    const db = client.db();

    const contractors = db.collection('contractors');
    const notifications = db.collection('notifications');

    const contractorObjectId = new ObjectId(contractorId);
    const contractor = await contractors.findOne({ _id: contractorObjectId });

    if (!contractor) {
      return NextResponse.json({ success: false, message: 'Contractor not found' }, { status: 404 });
    }

    // ✅ Update BOTH status and isApproved field in DB
    await contractors.updateOne(
      { _id: contractorObjectId },
      {
        $set: {
          status: newStatus,
          isApproved: newStatus === 'approved',
          approvedAt: new Date(),
          updatedAt: new Date()
        }
      }
    );

    // ✅ Send notification
    const userId = contractor.userId;

    const message = {
      userId: userId,
      title: `Your Contractor Status is now "${newStatus}"`,
      message:
        newStatus === 'approved'
          ? 'Congratulations! Your contractor account has been approved.'
          : newStatus === 'suspended'
          ? 'Your contractor account has been suspended. Please contact support.'
          : `Your contractor status has been updated to ${newStatus}.`,
      type: 'contractor_status',
      relatedId: contractor._id,
      isRead: false,
      createdAt: new Date()
    };

    await notifications.insertOne(message);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Status update error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
