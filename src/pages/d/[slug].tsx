import React, { useContext } from 'react'
import { Context } from '../../../context/context'
import { useRouter } from 'next/router'
import Image from 'next/legacy/image'
import { convertTimestamp } from '@/constants/constants'
import { BiDownload } from 'react-icons/bi'

const Redirect = () => {
    const { files } = useContext(Context)
    const router = useRouter()
    const { slug } = router.query

    const selectedFile = files.filter((file: { data: { id: string | string[] | undefined } }) => file.data.id === slug)

    const handleDownload = async (fileUrl: string | URL | Request, fileName: string) => {
        try {
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('File download failed:', error);
        }
    };
    // console.log()
    return (
        <div className='w-full items-center justify-center h-screen flex'>
            <div className='w-full p-4 rounded-lg shadow-blue-500 flex items-center justify-between  gap-3 shadow-md' >
                <div className='w-[100px] h-[100px] relative'>
                    <Image src={`https://claraanalytics.com/wp-content/uploads/2023/01/Contribute.png`} alt={selectedFile[0]?.data?.fileName} layout='fill' objectFit='cover' />
                </div>
                <div className='w-full text-left text-base flex flex-col items-start justify-start font-bold gap-3 text-black'>
                    <p className='w-full text-sm text-blue-600'>{selectedFile[0]?.data?.fileName}</p>
                    <p className='w-full text-sm text-blue-600'>By {selectedFile[0]?.data?.userName} <br /> </p>
                </div>
                <button className='w-15 h-15 p-2 bg-blue-600 text-white rounded-full' onClick={() => handleDownload(selectedFile[0]?.data?.fileUrl, selectedFile[0]?.data?.fileName)}><BiDownload size={20} /></button>
            </div>
        </div>
    )
}

export default Redirect
