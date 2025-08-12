import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await req.json()
    const { status } = body

    if (!status) {
      return NextResponse.json({ success: false, message: 'Status missing' }, { status: 400 })
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: 'Invalid ID' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    const result = await db.collection('transactions').updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: 'Transaction not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: 'Status updated' })
  } catch (error) {
    console.error('Error updating transaction:', error)
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}
