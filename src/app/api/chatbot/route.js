import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMMIAPI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function POST(req) {
  // const rawBody = await req.text();
  const data = await req.json();
  let result = (await model.generateContent(data.prompt)).response.text();
  return NextResponse.json({ "data": result });

}