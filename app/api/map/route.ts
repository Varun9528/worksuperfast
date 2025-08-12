import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("worksuperfast");
    const collection = db.collection("contractors");

    const jobs = await collection.find({}).toArray();

    // ✅ Dummy coordinates add karo
    const updatedJobs = jobs.map(job => ({
      ...job,
      coordinates: {
        lat: 22.7196, // Indore latitude
        lng: 75.8577  // Indore longitude
      }
    }));

    return NextResponse.json({ success: true, data: updatedJobs });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ success: false, message: "Internal Server Error" });
  }
}
