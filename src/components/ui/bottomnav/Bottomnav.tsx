import Link from 'next/link'
import React from 'react'
import { RxHome, RxFile, RxShare1, RxPerson, RxUpload } from "react-icons/rx";

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
            icon: <RxUpload />
        },
        {
            id: 4,
            name: "Shared",
            href: "/shared/",
            icon: <RxShare1 />
        },
        {
            id: 5,
            name: "Profile",
            href: "/profile/",
            icon: <RxPerson />
        },
    ]


    return (
        <div className='w-full fixed bottom-0 left-0 sm:hidden flex items-center justify-between p-3 bg-white'>
            {sideLink.map((_link, i) => (
                <div key={_link.id + _link.name + i} className={`w-full rounded-2xl transition-all duration-700 px-4 py-2 ${active === _link.name ? 'bg-blue-200 text-blue-800' : "bg-white text-black"} hover:bg-slate-300`}>
                    <Link href={_link.href} className='w-full flex items-center justify-center gap-2'>
                        {_link.icon}
                        <span className={`${active === _link.name ? 'inline-block font-bold' : "hidden"}`}>
                            {_link.name}
                        </span>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Bottomnav
