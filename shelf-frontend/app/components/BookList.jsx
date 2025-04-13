// "use client";
// import { useState } from "react";

// export default function BookList({ books, user, onUpdate }) {
//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({});

//   const handleDelete = async (id) => {
//     await fetch(`http://localhost:3000/books/${id}/delete`, {
//       method: "DELETE",
//     });
//     onUpdate();
//   };

//   const handleEdit = (book) => {
//     setEditingId(book.id);
//     setEditForm(book);
//   };

//   const handleSave = async () => {
//     await fetch(`http://localhost:3000/books/${editForm.id}/edit`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(editForm),
//     });
//     setEditingId(null);
//     onUpdate();
//   };

//   return (
//     <div className="grid gap-4">
//       {books.map((book) => {
//         const isOwner = user?.id === book.ownerId;

//         return (
//           <div key={book.id} className="bg-white p-4 rounded shadow-md">
//             {editingId === book.id ? (
//               <>
//                 <input
//                   className="border p-2 mb-2 w-full"
//                   value={editForm.title}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, title: e.target.value })
//                   }
//                 />
//                 <input
//                   className="border p-2 mb-2 w-full"
//                   value={editForm.author}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, author: e.target.value })
//                   }
//                 />
//                 <input
//                   className="border p-2 mb-2 w-full"
//                   value={editForm.genre}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, genre: e.target.value })
//                   }
//                 />
//                 <input
//                   className="border p-2 mb-2 w-full"
//                   value={editForm.location}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, location: e.target.value })
//                   }
//                 />
//                 <input
//                   className="border p-2 mb-2 w-full"
//                   value={editForm.contact}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, contact: e.target.value })
//                   }
//                 />
//                 <button
//                   className="bg-green-600 text-white px-4 py-1 rounded mr-2"
//                   onClick={handleSave}
//                 >
//                   Save
//                 </button>
//                 <button
//                   className="bg-gray-500 text-white px-4 py-1 rounded"
//                   onClick={() => setEditingId(null)}
//                 >
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <>
//                 <h3 className="text-lg font-bold">{book.title}</h3>
//                 <p>
//                   <strong>Author:</strong> {book.author}
//                 </p>
//                 <p>
//                   <strong>Genre:</strong> {book.genre || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Location:</strong> {book.location}
//                 </p>
//                 <p>
//                   <strong>Contact:</strong> {book.contact}
//                 </p>
//                 <p className="italic text-sm mt-1">Status: {book.status}</p>
//                 {isOwner && (
//                   <div className="mt-2">
//                     <button
//                       className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
//                       onClick={() => handleEdit(book)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="bg-red-600 text-white px-3 py-1 rounded"
//                       onClick={() => handleDelete(book.id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }
import { useState } from "react";

export default function BookList({ books, user, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("");

  const handleDelete = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_serverURL}/books/${id}/delete`, {
      method: "DELETE",
    });
    onUpdate();
  };

  const handleEdit = (book) => {
    setEditingId(book.id);
    setEditForm(book);
  };

  const handleSave = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_serverURL}/books/${editForm.id}/edit`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      }
    );
    setEditingId(null);
    onUpdate();
  };

  const onStatusToggle = async (id) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_serverURL}/books/${id}/toggle-status`,
      {
        method: "post",
      }
    );

    onUpdate();
  };
  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesGenre = genreFilter ? book.genre === genreFilter : true;
    return matchesTitle && matchesGenre;
  });

  const uniqueGenres = [
    ...new Set(books.map((book) => book.genre).filter(Boolean)),
  ];

  return (
    <div className="p-4">
      {/* Filters */}
      <div className="mx-auto h-18 flex gap-2 justify-center">
        <input
          type="text"
          placeholder="Search by Title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-xl p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  font-medium mb-5"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-13 w-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
        >
          <option defaultValue={"all genres"}>All Genres</option>

          {uniqueGenres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Book List */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 ">
        {filteredBooks.map((book) => {
          const isOwner = user?.id === book.ownerId;

          return (
            <div
              key={book.id}
              className="relative flex flex-col md:items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              {editingId === book.id ? (
                <>
                  <div className="bg-gray-900 w-full p-4 rounded-lg">
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
                      value={editForm.title}
                      onChange={(e) =>
                        setEditForm({ ...editForm, title: e.target.value })
                      }
                    />
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
                      value={editForm.author}
                      onChange={(e) =>
                        setEditForm({ ...editForm, author: e.target.value })
                      }
                    />
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
                      value={editForm.genre}
                      onChange={(e) =>
                        setEditForm({ ...editForm, genre: e.target.value })
                      }
                    />
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
                      value={editForm.location}
                      onChange={(e) =>
                        setEditForm({ ...editForm, location: e.target.value })
                      }
                    />
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  font-medium mb-5"
                      value={editForm.contact}
                      onChange={(e) =>
                        setEditForm({ ...editForm, contact: e.target.value })
                      }
                    />
                    <button
                      className="inline-flex items-center px-5 py-2.5 me-2 mb-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => onStatusToggle(book.id)}
                      className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                      Mark as{" "}
                      {book.status === "available" ? "Rented" : "Available"}
                    </button>
                    <button
                      className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {book.imageUrl && (
                    <img
                      className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                      src={`http://localhost:3000${book.imageUrl}`}
                      alt="img"
                    />
                  )}
                  <div className="flex flex-col justify-between p-4 leading-normal ">
                    <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {book.title}
                    </h3>
                    <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                      <strong>Author:</strong> {book.author}
                    </p>
                    <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                      <strong>Genre:</strong> {book.genre || "N/A"}
                    </p>
                    <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                      <strong>Location:</strong> {book.location}
                    </p>
                    <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                      <strong>Contact:</strong> {book.contact}
                    </p>
                    {book.status === "available" ? (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300 absolute top-5 right-5">
                        {book.status}
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300 absolute top-5 right-5">
                        {book.status}
                      </span>
                    )}

                    {/* <p className="italic mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Status: {book.status}
                    </p> */}
                    {isOwner && (
                      <div className="mt-2 flex gap-2">
                        <button
                          className="inline-flex items-center px-5 py-2.5 me-2 mb-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={() => handleEdit(book)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          onClick={() => handleDelete(book.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
