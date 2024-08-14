import Hero from "@/components/ui/Header/Hero";
import Navbar from "@/components/ui/navbar/Navbar";
import Image from "next/legacy/image";


export default function Home() {
  return (
    <main className="max-w-[1440px] w-full mx-auto max-h-screen">
      <Navbar />
      <Hero />
    </main>
  )
}
