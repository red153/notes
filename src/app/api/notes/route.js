import Note from "@/models/Note";
import { dbConnect } from "@/utils/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const notes = await Note.find();
  return NextResponse.json(notes);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newNote = new Note(body);
    const savedNote = await newNote.save();
    return NextResponse.json(savedNote);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
