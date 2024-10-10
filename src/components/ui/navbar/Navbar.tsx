import { Logo } from '@/components/icons/Icons'
import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { Context } from '../../../../context/context'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'



const Navbar = () => {
    const route = useRouter()

    const handleRoute = () => (
        route.push('/auth/signin')
    )
    return (
        <nav className='w-full flex items-center justify-between p-3 shadow-md'>
            <div className='flex items-center justify-start'>
                <Logo />
                <h1 className='text-[16px] text-[#1d4ed8]'>deel</h1>
            </div>

            <div className='w-full flex justify-end'>
                <SignedOut>
                    <button className='px-[16px] outline-none border border-blue-500 py-3 hover:bg-blue-700 text-blue-700 hover:text-white ease-in-out duration-500 transition-all' >
                        <SignInButton />
                    </button>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    )
}

export default Navbar
