import Layout from '@/components/ui/layout/Layout';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../context/context';
import { useUser } from '@clerk/nextjs';
import { doc, deleteDoc, getFirestore } from 'firebase/firestore';
import { app } from '../../../db/firebase';
import { convertTimestamp, formatFileSize, isImageFile, isPDFFile } from '@/constants/constants';
import Image from 'next/legacy/image';
import { BiCopy } from 'react-icons/bi';
import SocialShare from '@/components/ui/cards/ShareSocial';

const Slug = () => {
    const db = getFirestore(app);
    const [fileType, setFileType] = useState<string | null>(null);
    const { files, deleteBookmark, share, setShare } = useContext(Context);
    const { user } = useUser();
    const router = useRouter();
    const { slug } = router.query;
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async (textToCopy: string) => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setIsCopied(true);
            alert('File URL copied to clipboard')
            setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    };

    // Filter files to find the selected one
    const filteredFiles = files.filter((file: { data: { email: string | undefined; }; }) => file.data.email === user?.primaryEmailAddress?.emailAddress);
    const selectedFile = filteredFiles.find((file: { data: { id: string | string[] | undefined; }; }) => file.data.id === slug);

    // Determine the file type
    useEffect(() => {
        if (selectedFile?.data?.fileName) {
            if (isImageFile(selectedFile.data.fileName)) {
                setFileType('image');
            } else if (isPDFFile(selectedFile.data.fileName)) {
                setFileType('pdf');
            } else {
                setFileType(null); // Handle unsupported file types
            }
        }
    }, [selectedFile]);
    console.log(selectedFile?.data)
    console.log(fileType)

    const handleRoute = () => {
        router.back();
    };

    // Delete from Firebase
    const deleteItem = async (collectionName: string, docId: string) => {
        try {
            const docRef = doc(db, collectionName, docId);
            await deleteDoc(docRef);
            alert('Document deleted successfully');
            router.push('/files/');
            deleteBookmark(docId);
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };

    if (!selectedFile) {
        return (
            <Layout active="Files">
                <div className='w-full p-4'>
                    <h1 className='text-xl text-blue-700'>File not found</h1>
                </div>
            </Layout>
        );
    }

    return (
        <Layout active="Files">
            <div className='w-full p-4'>
                <h1 className='w-full text-left text-xl text-blue-700 flex items-center justify-start'>
                    <span className='cursor-pointer font-bold' onClick={handleRoute}>&gt; Files &gt; </span>
                    <span className='text-sm'>{selectedFile.data.fileName}</span>
                </h1>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 w-full h-[600px] items-center justify-center p-4 gap-4'>
                <div className="w-full border h-full relative">
                    {fileType === 'image' && (
                        <Image src={selectedFile.data.fileURL} alt="Uploaded File" layout='fill' objectFit='cover' />
                    )}

                    {fileType === 'pdf' && (
                        <iframe
                            src={selectedFile.data.fileURL}
                            width="100%"
                            height="100%"
                            style={{ border: 'none' }}
                        />
                    )}
                    {fileType !== 'image' && fileType !== 'pdf' ? (
                        <div className='w-full text-center font-bold'>Can&apos;t preview file</div>
                    ) : null}

                    {!fileType && <p>Unsupported file type or file not found.</p>}
                </div>
                <div className="w-full border p-1 border-slate-200">
                    <p className='w-full py-2 flex items-center justify-start'><p className='text-black font-bold w-full'>Email Address:</p> <span className='text-left inline-block w-full'>{selectedFile?.data?.email}</span></p>
                    <p className='w-full py-2 flex items-center justify-start'><span className='text-black font-bold w-full'>File Name:</span> <span className='text-left inline-block w-full'>{selectedFile?.data?.fileName}</span></p>
                    <p className='w-full py-2 flex items-center justify-start'><span className='text-black font-bold w-full'>File Size:</span> <span className='text-left inline-block w-full'>{formatFileSize(selectedFile?.data?.fileSize)}</span></p>
                    <p className='w-full py-2 flex items-center justify-start'><span className='text-black font-bold w-full'>File Type:</span> <span className='text-left inline-block w-full'>{selectedFile?.data?.fileType}</span></p>
                    <p className='w-full py-2 flex items-center justify-start'><span className='text-black font-bold w-full'>Last Modified:</span> <span className='text-left inline-block w-full'>{convertTimestamp(selectedFile?.data?.createdAt)}</span></p>
                    <p className='w-full py-2 flex items-center justify-start'><span className='text-black font-bold w-full'>File URL</span> <span className='text-left inline-block w-full'>{selectedFile?.data?.shortURL} <BiCopy onClick={() => handleCopy(selectedFile?.data?.shortURL)} /> </span></p>
                    <p className='w-full flex items-center justify-between gap-2'><button className='w-full text-white bg-blue-600 p-2' onClick={() => setShare(true)}>Share</button> <button onClick={() => deleteItem('upload', selectedFile.data.id)} className='text-red-600 bg-red-200 w-full p-2'>Delete</button></p>
                </div>
            </div>
            {share && (
                <SocialShare url={selectedFile?.data?.shortURL} />
            )}
        </Layout>
    );
};

export default Slug;
