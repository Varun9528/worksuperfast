// pages/api/notifications/index.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const client = await clientPromise
      const db = client.db()
      const collection = db.collection('notifications')

      const { userId, message, type, isRead, createdAt } = req.body

      if (!userId || !message) {
        return res.status(400).json({ message: 'userId and message are required' })
      }

      const notification = {
        userId,
        message,
        type: type || 'general',
        isRead: isRead || false,
        createdAt: createdAt ? new Date(createdAt) : new Date(),
      }

      await collection.insertOne(notification)

      return res.status(201).json({ message: 'Notification created successfully' })
    } catch (error) {
      console.error('Error creating notification:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
