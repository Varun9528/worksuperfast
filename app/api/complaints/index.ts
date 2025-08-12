import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise
  const db = client.db()
  const collection = db.collection('complaints')

  switch (req.method) {
    case 'GET':
      const all = await collection.find({}).toArray()
      return res.status(200).json(all)
    case 'POST':
      const data = req.body
      data.createdAt = new Date()
      data.updatedAt = new Date()
      const result = await collection.insertOne(data)
      return res.status(201).json(result)
    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}
