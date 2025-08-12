// lib/sendNotification.ts
import clientPromise from '@/lib/mongodb';

export async function sendNotification(userId: string, message: string) {
  const client = await clientPromise;
  const db = client.db();
  const notifications = db.collection('notifications');

  await notifications.insertOne({
    userId,
    message,
    isRead: false,
    createdAt: new Date()
  });
}
