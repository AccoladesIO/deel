import Hero from "@/components/ui/Header/Hero";
import Navbar from "@/components/ui/navbar/Navbar";
import Image from "next/legacy/image";


export default function Home() {
  return (
    <main className="max-w-[1440px] w-full mx-auto">
      <Navbar />
      <Hero />
      <div className=' p-4  my-8 rounded-lg w-full h-[600px] relative'>
        <Image layout='fill' objectFit='cover' src="" alt='' />
      </div>
    </main>
  )
}
