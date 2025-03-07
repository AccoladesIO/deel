import Hero from "@/components/ui/Header/Hero";
import Navbar from "@/components/ui/navbar/Navbar";
import Image from "next/legacy/image";


export default function Home() {
  return (
    <main className="w-full mx-auto max-h-screen">
      <Navbar />
      <Hero />
    </main>
  )
}
