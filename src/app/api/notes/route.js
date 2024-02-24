import Note from "@/models/Note";
import { dbConnect } from "@/utils/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const notes = await Note.find();
  const response = NextResponse.json(notes);
  response.headers.set('Cache-Control', 'no-store, max-age=0');
  return response;
}

export async function POST(request) {
  try {
    const body = await request.json();
    await dbConnect();
    const newNote = new Note(body);
    const savedNote = await newNote.save();
    const response = NextResponse.json(savedNote);
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    return response;
  } catch (error) {
    const response = NextResponse.json({ error: error.message }, { status: 400 });
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    return response;
  }
}
