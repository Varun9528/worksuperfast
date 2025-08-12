import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise
  const db = client.db()
  const collection = db.collection('admin_logs')
  const { id } = req.query

  if (!ObjectId.isValid(id as string)) {
    return res.status(400).json({ message: 'Invalid ID' })
  }
  const objectId = new ObjectId(id as string)

  switch (req.method) {
    case 'GET':
      const item = await collection.findOne({ _id: objectId })
      return res.status(200).json(item)
    case 'PUT':
      const update = req.body
      update.updatedAt = new Date()
      await collection.updateOne({ _id: objectId }, { $set: update })
      return res.status(200).json({ message: 'Updated' })
    case 'DELETE':
      await collection.deleteOne({ _id: objectId })
      return res.status(204).end()
    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}
