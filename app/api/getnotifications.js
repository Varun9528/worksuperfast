import dbConnect from '@/lib/dbConnect';
import Notification from '@/models/Notification';

export default async function handler(req, res) {
  await dbConnect();

  const { userId } = req.query;

  if (!userId) return res.status(400).json({ success: false, message: 'Missing userId' });

  try {
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }).limit(20);
    res.status(200).json({ success: true, notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
}
