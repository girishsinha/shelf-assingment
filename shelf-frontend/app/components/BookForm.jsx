"use client";
import { useState } from "react";

export default function BookForm({ onAdd, setOpenForm }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    location: "",
    contact: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) return alert("Please select a file!");
    const formData = new FormData();
    const user = JSON.parse(localStorage.getItem("user"));

    formData.append("title", form.title);
    formData.append("genre", form.genre);
    formData.append("location", form.location);
    formData.append("contact", form.contact);
    formData.append("author", form.author);
    formData.append("cover", selectedImage);
    formData.append("ownerId", user.id);
    formData.append("role", user.role);

    const res = await fetch(`${process.env.NEXT_PUBLIC_serverURL}/books/add`, {
      method: "POST",
      headers: { "Custom-Header": "value" },
      body: formData,
    });
    const data = await res.json();
    if (data.success) {
      onAdd();
      setForm({ title: "", author: "", genre: "", location: "", contact: "" });
      setPreview(null);
      setSelectedImage(null);
      setOpenForm(false);
    } else {
      console.log(data);
      alert("Failed to add book", data.message);
    }
  };
  const handleImageChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setSelectedImage(e.target.files[0]);
        setPreview(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="fixed w-full h-full flex items-center bg-gray-900 justify-center z-50">
      <form onSubmit={handleSubmit} className="sm:w-xl w-full p-4 mx-auto">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
          Add a Book
        </h2>
        <div className="flex flex-col gap-5">
          <label
            htmlFor="file"
            className="text-[#9BA0A8] font-Inter font-medium text-sm"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="file"
            accept="image/*"
            name="file"
            className="p-3 bg-[#2D2F39] rounded-lg text-[#cccccc] font-Inter font-medium text-sm"
            onChange={handleImageChange}
          />
        </div>
        <div>
          {preview && <img src={preview} alt="selected" className="h-32" />}
        </div>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          required
        />
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
          placeholder="Genre (optional)"
          value={form.genre}
          onChange={(e) => setForm({ ...form, genre: e.target.value })}
        />
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
          placeholder="City/Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
          placeholder="Contact Email/Phone"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
          required
        />
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Book
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 "
            onClick={() => setOpenForm(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
