import React from 'react'
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSearch } from 'react-icons/ci'
import { Logo } from '@/components/icons/Icons';

const Header = () => {
    return (
        <div className='w-full flex items-center justify-between p-4 gap-4'>
            <div className='flex sm:hidden items-center justify-start'>
                <Logo />
                {/* <h1 className='text-[16px] text-[#1d4ed8]'>deel</h1> */}
            </div>
            <div className='w-full flex items-center justify-start border border-blue-300 p-3 rounded-3xl'>
                <CiSearch />
            </div>
            <div className='p-3'>
                <IoIosNotificationsOutline size={20} />
            </div>
        </div>
    )
}

export default Header
