"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";

export default function Dashboard() {
  // const router = useRouter();
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  const fetchBooks = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_serverURL}/books`);
    const data = await res.json();
    setBooks(data.books || []);
  };

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    if (!u) {
      redirect("/login");
    } else {
      setUser(u);
      fetchBooks();
    }
  }, []);

  if (!user) return null;

  return (
    <div className="relative min-h-screen ">
      <div className="w-full h-18 sticky top-0 p-4 flex items-center justify-between z-40 bg-white dark:bg-gray-900   start-0 border-b border-gray-200 dark:border-gray-600 ">
        <h1 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome, {user.name}
        </h1>
        <div>
          {user.role === "owner" && (
            <button
              className="inline-flex items-center px-5 py-2.5 me-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => setOpenForm(!openForm)}
            >
              Add Book
            </button>
          )}
        </div>
      </div>

      {openForm && <BookForm onAdd={fetchBooks} setOpenForm={setOpenForm} />}
      {/* {openForm && <BookForm onAdd={fetchBooks} setOpenForm={setOpenForm} />} */}

      <BookList books={books} user={user} onUpdate={fetchBooks} />
    </div>
  );
}
