"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const NewNote = () => {
  const [newNote, setNewNote] = useState({
    title: "",
    description: "",
  });
  const params = useParams();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const getNote = async () => {
    const res = await fetch(`/api/notes/${params.id}`);
    const data = await res.json();
    setNewNote({ title: data.title, description: data.description });
  };

  useEffect(() => {
    if (params.id) {
      getNote();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errs = validate();

    if (Object.keys(errs).length) return setErrors(errs);

    setIsSubmitting(true);

    if (params.id) {
      await updateNote();
    } else {
      await createNote();
    }

    router.push("/");
  };

  const handleChange = (e) =>
    setNewNote({ ...newNote, [e.target.name]: e.target.value });

  const validate = () => {
    let errors = {};

    if (!newNote.title) {
      errors.title = "Title is required";
    }
    if (!newNote.description) {
      errors.description = "Description is required";
    }

    return errors;
  };

  const createNote = async () => {
    try {
      await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Seguro que quieres borrar?")) {
      try {
        const res = await fetch(`/api/notes/${params.id}`, {
          method: "DELETE",
        });
        router.push("/");
        router.refresh();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateNote = async () => {
    try {
      await fetch(`/api/notes/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-7rem)] flex justify-center items-center text-black">
      <form onSubmit={handleSubmit} className="w-full max-w-lg  p-8 rounded-lg  bg-yellow-500">
        <header className="flex justify-between mb-6 ">
          <h1 className="font-bold text-3xl ">
            {!params.id ? "Create Note" : "Update note"}
          </h1>
          {params.id && (
            <button
              className="bg-red-900 text-white px-3 py-1 rounded-md"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </header>
        <input
          type="text"
          placeholder="Note title"
          name="title"
          onChange={handleChange}
          value={newNote.title}
          autoFocus
          className=" bg-yellow-800 text-black border-2 w-full p-4 rounded-lg mb-4"
        />

        <textarea
          name="description"
          placeholder="Note description"
          onChange={handleChange}
          value={newNote.description}
          className=" bg-yellow-800 text-black border-2 w-full p-4 rounded-lg mb-4"
          rows={3}
        ></textarea>

        <button className="bg-gray-100 text-black font-semibold px-8 py-2 rounded-lg">
          {params.id ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default NewNote;
