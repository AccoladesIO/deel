import React, { useContext } from 'react';
import { Context } from '../../../context/context';
import { useRouter } from 'next/router';
import Image from 'next/legacy/image';
import { BiDownload } from 'react-icons/bi';
import { getDownloadURL, ref, getStorage } from "firebase/storage"; // Ensure Firebase Storage is set up
import { app } from '../../../db/firebase'; // Ensure the correct path to your firebase config

const Redirect = () => {
    const { files } = useContext(Context);
    const router = useRouter();
    const { slug } = router.query;
    const selectedFile = files.filter((file: { data: { id: string | string[] | undefined } }) => file.data.id === slug);
    const storage = getStorage(app);

    const handleDownload = async (fileUrl: string | undefined, fileName: string) => {
        if (!fileUrl) {
            console.error('File URL is undefined');
            return;
        }
        try {
            const storageRef = ref(storage, fileUrl);
            const url = await getDownloadURL(storageRef);
            const response = await fetch(url);
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('File download failed:', error);
        }
    };

    if (!selectedFile.length) {
        return <div>File not found</div>; // Handling case where file is not found
    }

    return (
        <div className='w-full items-center justify-center h-screen flex'>
            <div className='w-[300px] mx-auto p-4 rounded-lg shadow-blue-500 flex items-center justify-between gap-3 shadow-sm'>
                <div className='w-[100px] h-[100px] relative'>
                    <Image src={`https://claraanalytics.com/wp-content/uploads/2023/01/Contribute.png`} alt={selectedFile[0]?.data?.fileName} layout='fill' objectFit='cover' />
                </div>
                <div className='w-full text-left text-base flex flex-col items-start justify-start font-bold gap-3 text-black'>
                    <p className='w-full text-sm text-blue-600'>{selectedFile[0]?.data?.fileName}</p>
                    <p className='w-full text-sm text-blue-600'>By {selectedFile[0]?.data?.userName} <br /></p>
                </div>
                <button className='w-15 h-15 p-2 bg-blue-600 text-white rounded-full' onClick={() => handleDownload(selectedFile[0]?.data?.fileURL, selectedFile[0]?.data?.fileName)}>
                    <BiDownload size={20} />
                </button>
            </div>
        </div>
    );
};

export default Redirect;
