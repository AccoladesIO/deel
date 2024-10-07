import React, { useContext, useEffect, useMemo, useState } from 'react';
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSearch } from 'react-icons/ci';
import { Logo } from '@/components/icons/Icons';
import { useRouter } from 'next/router';
import { Context } from '../../../../context/context';
import Modal from '../modal/Modal';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

const Header = () => {
    const { showModal, setShowModal, files } = useContext(Context);
    const { user } = useUser();

    const filteredFiles = files.filter((file: { data: { email: string | undefined; }; }) => file.data.email === user?.primaryEmailAddress?.emailAddress);
    const route = useRouter();

    const handleNavigation = () => {
        route.push('/notifications/');
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    // console.log(filteredItems)
    useEffect(() => {
        if (searchTerm && filteredFiles.length > 0) {
            // Filter items based on search term
            const results = filteredFiles.filter((item: { data: { fileName: string; }; }) =>
                item.data.fileName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredItems(results);
        } else {
            setFilteredItems([]);
        }
    }, [searchTerm]);


    return (
        <div className='w-full flex items-center justify-between p-4 gap-4'>
            <div className='flex sm:hidden items-center justify-start'>
                <Logo />
            </div>
            <div className='w-full flex items-center justify-start border border-blue-300 p-3 rounded-3xl' onClick={() => setShowModal(true)}>
                <CiSearch />
            </div>
            <div className='p-3' onClick={handleNavigation}>
                <IoIosNotificationsOutline size={20} />
            </div>
            {showModal &&
                <Modal>
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full outline-none border border-blue-300 p-2 rounded-3xl"
                        />
                        <div className="mt-4">
                            {filteredItems.map((file: any) => (
                                <Link key={file.data.id} passHref href={`/files/${file.data?.id}`}>
                                    <div className='w-full p-2 text-blue-500'>
                                        {file.data.fileName}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Modal>
            }
        </div>
    );
};

export default Header;
