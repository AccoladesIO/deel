import { Logo } from '@/components/icons/Icons';
import Link from 'next/link'
import React, { useEffect } from 'react'
import { RxHome, RxFile, RxShare1, RxUpload, RxPerson } from "react-icons/rx";
import { GrUpgrade } from "react-icons/gr";
import { SignedIn, UserButton } from '@clerk/nextjs';
import { BiCloudUpload, BiStar } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { IoCloudUploadOutline } from "react-icons/io5";



const Sidebar = ({ active }: { active: string }) => {
    const router = useRouter();

    useEffect(() => {
        // This will run every time the route changes
        console.log('Route changed to:', router.pathname);
    }, [router.pathname]);



    const sideLink = [
        {
            id: 1,
            name: "Home",
            href: "/home",
            icon: <RxHome />
        },
        {
            id: 2,
            name: "Files",
            href: "/files",
            icon: <RxFile />
        },
        {
            id: 3,
            name: "Starred",
            href: "/starred",
            icon: <BiStar />
        }
    ]

    return (
        <div className='h-[100vh] w-52 hidden sm:flex flex-col justify-between items-center gap-2'>
            <div className='flex flex-col items-center justify-start p-4 w-full'>
                <div className='flex items-center justify-start p-4 w-full'>
                    <Logo />
                    <h1 className='text-[16px] text-[#1d4ed8]'>deel</h1>
                </div>
                {sideLink.map((_link, i) => (
                    <div key={_link.id + _link.name + i} className={`w-full px-4 py-2 ${active === _link.name ? 'bg-blue-200 text-blue-800 font-bold border-r-4 border-r-blue-800' : "bg-white text-black"} hover:bg-slate-300`}>
                        <Link href={_link.href} prefetch={false} className='w-full flex items-center justify-start gap-2'>
                            {_link.icon}
                            {_link.name}
                        </Link>
                    </div>
                ))}
            </div>
            <div className='w-full flex flex-col items-center justify-end p-4'>
                <Link href="/upload/" className={`w-full flex items-center justify-start gap-2 p-3 ${active === 'Upload' && 'bg-blue-200 text-blue-800 font-bold border-r-4 border-r-blue-800'}`}>
                    <IoCloudUploadOutline />
                    Upload
                </Link>
                <Link href="/upgrade/" className={`w-full flex items-center justify-start gap-2 p-3 ${active === 'Upgrade' && 'bg-blue-200 text-blue-800 font-bold border-r-4 border-r-blue-800'}`}>
                    <GrUpgrade />
                    Upgrade
                </Link>
                <Link href="/profile/" className={`w-full flex items-center justify-start gap-2 p-3 ${active === 'Profile' && 'bg-blue-200 text-blue-800 font-bold border-r-4 border-r-blue-800'}`}>
                    {/* <RxPerson /> */}
                    {/* <UserButton afterSwitchSessionUrl='/' /> */}
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar
