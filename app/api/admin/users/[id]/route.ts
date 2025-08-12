import { sendNotification } from '@/lib/sendNotification';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const client = await clientPromise;
  const db = client.db();
  const users = db.collection('users');
  const { id } = params;

  const body = await req.json();
  const newStatus = body.status; // 'approved' or 'suspended'

  const result = await users.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status: newStatus, updatedAt: new Date() } }
  );

  // ✅ Send Notification
  const message =
    newStatus === 'approved'
      ? 'Your profile has been approved by the admin.'
      : 'Your profile has been suspended by the admin. Please contact support.';

  await sendNotification(id, message);

  return NextResponse.json({ success: true });
}
