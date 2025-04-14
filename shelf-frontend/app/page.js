"use client"
// import Image from "next/image";
import { redirect } from "next/navigation";
import Loading from "./components/Loading";

export default function Home() {
  redirect("/login")

  return (
    <>
      {/* <Loading /> */}
    </>
  );
}
