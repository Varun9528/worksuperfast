import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise
  const db = client.db()
  const collection = db.collection('jobs')

  switch (req.method) {
    case 'GET':
      const allJobs = await collection.find({}).sort({ createdAt: -1 }).toArray()
      return res.status(200).json(allJobs)

    case 'POST':
      try {
        const {
          title,
          description,
          category,
          paymentType,
          payment,
          state,
          city,
          pincode,
          name,
          phone,
          email,
          location,
          postedBy
        } = req.body

        const jobData = {
          title,
          description,
          category,
          paymentType,
          payment,
          state,
          city,
          pincode,
          name,
          phone,
          email,
          location: location ? JSON.parse(location) : null,
          postedBy,
          createdAt: new Date(),
          updatedAt: new Date()
        }

        const result = await collection.insertOne(jobData)
        return res.status(201).json({ success: true, insertedId: result.insertedId })
      } catch (error) {
        console.error('Job POST Error:', error)
        return res.status(500).json({ success: false, message: 'Job post failed' })
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}
