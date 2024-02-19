import { dbConnect } from "@/utils/mongoose";
import NoteCard from "@/components/NoteCard";
import Note from "@/models/Note";

export async function loadNotes() {
  await dbConnect();
  const notes = await Note.find();
  return notes;
}

export default async function HomePage() {
  const notes = await loadNotes();

  return (
    <div className="grid md:grid-cols-3 gap-2">
      {notes.map((note) => (
        <NoteCard note={note} key={note._id} />
      ))}
    </div>
  );
}
