import React from 'react'
import Image from 'next/legacy/image'
import { Logo } from '@/components/icons/Icons'
import { useRouter } from 'next/router'
// import SignInPage from '../sign-in/[[...index]]'
// import { SignIn } from '@clerk/nextjs'

const Signin = () => {
    const route = useRouter()
    const handleRoute = () => {
        route.push('/')
    }
    return (
        <div className='flex flex-col sm:flex-row items-center sm:justify-center justify-start h-[90dvh] bg-fixed bg-bottom  bg-cover  relative'>
            <div className='flex items-center justify-start absolute top-4 left-4 z-10' onClick={handleRoute}>
                <Logo />
                <h1 className='text-[16px] text-[#1d4ed8]'>deel</h1>
            </div>
            <div className='max-w-[700px]  rounded-lg w-full sm:h-full h-[300px] relative'>
                <Image layout='fill' objectFit='cover' src="https://cdn.dribbble.com/users/237814/screenshots/5274233/media/79929813d2743fed26d8e2e447412e89.gif" alt='' />
            </div>
            <div className='p-5 text-blue-700 z-[2] max-w-[800px]'>
                <h2 className='text-5xl font-bold'>Simplify Your File Sharing — Anytime, Anywhere
                </h2>
                {/* <SignInPage /> */}
            </div>
        </div>
    )
}

export default Signin
