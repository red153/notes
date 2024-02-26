import Link from "next/link";

export function NoteCard({ note }) {
  return (
    <Link href={`/notes/${note._id}`}>
      <div className="bg-yellow-500 p-6 sm:p-10 text-black rounded-md hover:bg--700 transition duration-300 ease-in-out">
        <h1 className="text-lg sm:text-2xl font-bold">{note.title}</h1>
        <p className="text-sm sm:text-base text-black">{note.description}</p>
        <p className="text-xs sm:text-sm text-black my-2">
          <span className="mr-1">Created at:</span>
          {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}

export default NoteCard;  