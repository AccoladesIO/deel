import React from 'react'
import Sidebar from '../sidebar/Sidebar';
import Bottomnav from '../bottomnav/Bottomnav';
import Header from '../Header/Header';

interface LayoutProp {
    children: React.ReactNode;
    active: string;
}
const Layout: React.FC<LayoutProp> = ({ children, active }) => {
    return (
        <div className='w-full flex relative'>
            <Sidebar active={active} />
            <div className='w-full sm:mb-0 mb-10'>
                <Header />
                {children}
            </div>
            <Bottomnav active={active} />
        </div>
    )
}

export default Layout
