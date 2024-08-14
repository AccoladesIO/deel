import React from 'react'
import Image from 'next/legacy/image'
import { useRouter } from 'next/router'
import { SignedIn } from '@clerk/nextjs'


const Hero = () => {
    const route = useRouter()

    const handleRoute = () => {
        route.push('/home/')
    }

    return (
        <div className='flex flex-col sm:flex-row items-center sm:justify-center justify-start h-[90dvh] bg-fixed bg-bottom  bg-cover  relative'>
            <div className='max-w-[700px]  rounded-lg w-full sm:h-full h-[300px] relative'>
                <Image layout='fill' objectFit='cover' src="https://cdn.dribbble.com/users/237814/screenshots/5274233/media/79929813d2743fed26d8e2e447412e89.gif" alt='' />
            </div>
            <div className='p-5 text-blue-700 z-[2] max-w-[800px]'>
                <h2 className='text-5xl font-bold'>Simplify Your File Sharing — Anytime, Anywhere
                </h2>
                <p className='py-5 text-xl'>Effortlessly manage your documents, photos, and videos with our intuitive file-sharing app. Whether you&apos;re working solo or collaborating with a team, stay organized and productive with seamless access to your files on any device.</p>
                <button className='px-8 py-2  border border-blue-500 hover:bg-blue-700 hover:text-white ease-in-out duration-500 transition-all' onClick={handleRoute}>Start free trial <SignedIn>Go to Dashboard</SignedIn></button>
            </div>
        </div>
    )
}

export default Hero
