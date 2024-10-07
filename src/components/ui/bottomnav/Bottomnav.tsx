import { SignedIn, UserButton } from '@clerk/nextjs';
import Link from 'next/link'
import React from 'react'
import { BiStar } from 'react-icons/bi';
import { RxHome, RxFile, RxShare1, RxPerson, RxUpload } from "react-icons/rx";
import { BiCloudUpload } from "react-icons/bi";


const Bottomnav = ({ active }: { active: string }) => {
    const sideLink = [
        {
            id: 1,
            name: "Home",
            href: "/home/",
            icon: <RxHome />
        },
        {
            id: 2,
            name: "Files",
            href: "/files/",
            icon: <RxFile />
        },
        {
            id: 3,
            name: "Upload",
            href: "/upload/",
            icon: <BiCloudUpload />
        },
        {
            id: 4,
            name: "Starred",
            href: "/starred/",
            icon: <BiStar />
        },
    ]


    return (
        <div className='w-full fixed bottom-0 left-0 sm:hidden flex items-center justify-between p-3 bg-white gap-1'>
            {sideLink.map((_link, i) => (
                <div key={_link.id + _link.name + i} className={`w-full rounded-2xl transition-all duration-700 px-4 py-2 ${active === _link.name ? 'bg-blue-200 text-blue-800' : "bg-white text-black"}`}>
                    <Link href={_link.href} className='w-full flex items-center justify-center gap-2'>
                        {_link.icon}
                        <span className={`${active === _link.name ? 'inline font-bold' : "hidden"}`}>
                            {_link.name}</span>
                    </Link>
                </div>
            ))}
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    )
}

export default Bottomnav
