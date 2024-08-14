import Layout from '@/components/ui/layout/Layout'
import React from 'react'
import { RxStar, RxUpload } from 'react-icons/rx'
import { CgFolderAdd } from "react-icons/cg";
import Image from 'next/legacy/image';
import Link from 'next/link';


const home = () => {
    return (
        <Layout active='Home'>
            <div className='overflow-y-scroll w-full h-[90vh]'>

                <div className='w-full p-4'>
                    <h1 className='w-full text-left text-xl text-blue-700'>| Home</h1>
                </div>

                <div className='grid grid-cols-3 items-center justify-center gap-2 px-4'>
                    <div className='w-full px-4 py-6 flex flex-col items-start justify-center bg-blue-500 text-white gap-2'>
                        <RxUpload size={20} />
                        <Link href='/upload/'>
                            Upload
                        </Link>
                    </div>
                    <div className='w-full px-4 py-6 flex flex-col items-start justify-center bg-slate-300 text-black gap-2'>
                        <CgFolderAdd size={20} />
                        Create
                    </div>
                    <div className='w-full px-4 py-6 flex flex-col items-start justify-center bg-purple-200 text-black gap-2'>
                        <RxStar size={20} />
                        <Link href={`/starred/`}>
                            Star
                        </Link>
                    </div>
                </div>

                {/* notification */}

                <div className='w=full p-4'>
                    <h2 className='text-base w-full text-left text-blue-700 font-bold'>Notification</h2> <hr />
                    <h1 className='w-full text-center p-3 text-3xl z-10'>Nothing to see here</h1>
                    <div className='w-full sm:w-[500px] mx-auto relative h-[400px]'>
                        <Image layout='fill' src={`https://cdn.dribbble.com/users/37624/screenshots/3366123/media/44764f63a561425448da091ab5e62539.jpg?resize=800x600&vertical=center`} alt=' ' />
                    </div>
                </div>

                {/* recent */}
                <div className='w=full p-4'>
                    <h2 className='text-base w-full text-left text-blue-700 font-bold'>Recent</h2> <hr />

                    <h1 className='w-full text-center p-3 text-3xl z-10'>Nothing to see here</h1>
                    <div className='w-full sm:w-[500px] mx-auto relative h-[400px]'>
                        <Image layout='fill' src={`https://cdn.dribbble.com/users/237814/screenshots/6801457/untitled-1.gif`} alt=' ' />
                    </div>
                </div>

                {/* shared */}
                <div className='w=full p-4'>
                    <h2 className='text-base w-full text-left text-blue-700 font-bold'>Shared</h2> <hr />

                    <h1 className='w-full text-center p-3 text-3xl z-10'>Files you shared would appear here</h1>
                    <div className='w-full sm:w-[500px] mx-auto relative h-[400px]'>
                        <Image layout='fill' src={`https://cdn.dribbble.com/users/21546/screenshots/2257867/media/6344a017e2d46f140239c1a235cba25d.gif`} alt=' ' />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default home
