import dbConnect from "@/lib/dbConnect";
import Contractor from "@/models/Contractor";
import User from "@/models/User";
import Notification from "@/models/Notification";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  await dbConnect();

  const { contractorId, newStatus } = req.body;

  try {
    const contractor = await Contractor.findById(contractorId);
    if (!contractor) return res.status(404).json({ success: false, message: 'Contractor not found' });

    // Update status
    contractor.status = newStatus;
    await contractor.save();

    // Find related user
    const user = await User.findOne({ email: contractor.email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    // Create Notification
    await Notification.create({
      userId: user._id,
      title: `Your Contractor Status is now "${newStatus}"`,
      message: `Congratulations! Your contractor account has been ${newStatus}.`,
      type: "contractor_status",
      relatedId: contractor._id,
      isRead: false,
      createdAt: new Date()
    });

    return res.status(200).json({ success: true, message: 'Status updated and notification sent' });

  } catch (err) {
    console.error('Error updating status:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}
