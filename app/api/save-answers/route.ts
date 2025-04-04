import { NextResponse } from "next/server";

// Simulated database (Replace with a real database later)
let storedData: { [key: string]: string[] } = {};

export async function POST(req: Request) {
  const { userId, answers } = await req.json();

  if (!userId || !answers) {
    return NextResponse.json({ message: "Missing data" }, { status: 400 });
  }
   // ✅ Print Data to the Terminal
   console.log("📝 New Submission:");
   console.log("User ID:", userId);
   console.log("Answers:", answers);
  // Store data (In real-world apps, save this in a database)
  storedData[userId] = answers;

  return NextResponse.json({ message: "Data saved successfully!" });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId || !storedData[userId]) {
    return NextResponse.json({ message: "No data found" }, { status: 404 });
  }

  return NextResponse.json({ answers: storedData[userId] });
}
