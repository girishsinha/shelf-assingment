"use client";
import { useState } from "react";
import { redirect } from "next/navigation";
import Loading from "../components/Loading";

export default function Login() {
  //   const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_serverURL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.user));
      redirect("/dashboard");
    } else {
      alert("Invalid credentials");
    }
    setLoading(false);
  };
  if (loading) {
    console.log(loading);
    return <Loading />;
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <form onSubmit={handleSubmit} className="sm:w-lg w-full p-4 mx-auto">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
          Login
        </h2>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Login
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ml-4 "
          onClick={() => {
            redirect("/register");
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}
