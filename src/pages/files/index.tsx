import Layout from '@/components/ui/layout/Layout'
import React, { useContext } from 'react'
import { Context } from '../../../context/context'
import { useUser } from '@clerk/nextjs'
import { formatFileSize } from '@/constants/constants'
import { BiStar } from 'react-icons/bi'
import Link from 'next/link'
import Image from 'next/legacy/image'

const Files = () => {
    const { files, handleAddToFavourite, favourites } = useContext(Context)
    const { user
    } = useUser()

    const filteredFiles = files.filter((file: { data: { email: string | undefined } }) => file.data.email === user?.primaryEmailAddress?.emailAddress)
    console.log(filteredFiles)
    filteredFiles.sort((a: { data: { createdAt: { toString: () => number } } }, b: { data: { createdAt: { toString: () => number } } }) => a.data.createdAt.toString() - b.data.createdAt.toString())
    // console.log(filteredFiles)
    return (
        <Layout active='Files'>
            <div className='w-full p-4'>
                <h1 className='w-full text-left text-xl text-blue-700'>| Files</h1>
            </div>
            {filteredFiles.length !== 0 ?
                (
                    <div className='w-full p-4'>
                        <h1 className='w-full text-center p-3 text-3xl z-10'>Files Uploaded would appear here</h1>
                        <div className='flex items-center justify-between text-left'>
                            <div className='w-full p-2 text-bold'>File name</div>
                            <div className='w-full p-2 text-bold hidden sm:block'>File Type</div>
                            <div className='w-full p-2 text-bold'>File Size</div>
                            <div className='w-full p-2 text-bold'>Star</div>
                        </div>
                        {
                            filteredFiles.map((file: { id: any; data: { fileName: string; fileType: string; fileSize: number } }, index: any) => {
                                return (
                                    <div key={file.id + index} className='p-2 my-1 w-full' style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#90caf9' }}>
                                        <div className='flex items-center justify-between cursor-pointer text-left'>
                                            <Link passHref href={`/files/${file.id}`} >
                                                <div className='w-full p-2 text-bold'>
                                                    {file?.data?.fileName?.length > 10 ? `${(file.data.fileName as string).substring(0, 10)}...` : file.data.fileName}
                                                </div>
                                            </Link>
                                            <div className='w-full p-2 text-bold hidden sm:block'>{file.data.fileType}</div>
                                            <div className='w-full p-2 text-bold'>{formatFileSize(file.data.fileSize)}</div>
                                            <div className='w-full p-2 text-bold' onClick={() => handleAddToFavourite(file)}>{favourites.some((fav: { id: any }) => fav.id === file.id) ? <BiStar style={{ color: 'blue' }} size={20} /> : 'bookmark'}</div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                ) :
                (
                    <div className='w=full p-4'>
                        <h1 className='w-full text-center p-3 text-3xl z-10'>Nothing to see here</h1>
                        <div className='w-full sm:w-[500px] mx-auto relative h-[400px]'>
                            <Image layout='fill' src={`https://cdn.dribbble.com/users/37624/screenshots/3366123/media/44764f63a561425448da091ab5e62539.jpg?resize=800x600&vertical=center`} alt=' ' />
                        </div>
                    </div>
                )
            }
        </Layout>
    )
}

export default Files
