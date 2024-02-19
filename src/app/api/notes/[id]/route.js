import Note from "@/models/Note";
import { dbConnect } from "@/utils/mongoose";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  dbConnect();
  try {
    const noteFound = await Note.findById(params.id);

    if (!noteFound)
      return NextResponse.json(
        {
          message: "Note not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(noteFound);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function PUT(request, { params }) {
  const body = await request.json();
  dbConnect();

  try {
    const noteUpdated = await Note.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!noteUpdated)
      return NextResponse.json(
        {
          message: "Note not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(noteUpdated);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  dbConnect();

  try {
    const noteDeleted = await Note.findByIdAndDelete(params.id);

    if (!noteDeleted)
      return NextResponse.json(
        {
          message: "Note not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(noteDeleted);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
