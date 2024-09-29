import Layout from '@/components/ui/layout/Layout'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { Context } from '../../../context/context'
import { useUser } from '@clerk/nextjs'
import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import { app } from '../../../db/firebase'


const Slug = () => {
    const db = getFirestore(app)
    const { files, deleteBookmark } = useContext(Context)
    const { user } = useUser()
    const router = useRouter()
    const { slug } = router.query
    const filteredFiles = files.filter((file: { data: { email: string | undefined } }) => file.data.email === user?.primaryEmailAddress?.emailAddress)
    const selectedFile = filteredFiles.find((file: { id: string | string[] | undefined }) => file.id === slug)
    function handleRoute() {
        router.back()
    }
    // delete from Firebase

    const deleteItem = async (collectionName: string, docId: string) => {
        try {
            const docRef = doc(db, collectionName, docId);
            await deleteDoc(docRef);
            alert("Document deleted successfully");
            router.push('/files/')
            deleteBookmark(docId)
        } catch (error) {
            console.log(error)
        }
    };
    console.log(selectedFile)
    return (
        <Layout active='Files'>
            <div className='w-full p-4'>
                <h1 className='w-full text-left text-xl text-blue-700 flex items-center justify-start'><span className=' cursor-pointer font-bold' onClick={handleRoute}>&gt; Files &gt; </span><span className='text-sm'> {selectedFile?.data?.fileName} </span></h1>
            </div>

            <div className='w-full text-xl p-4'>
                <div className='w-full font-bold' onClick={() => deleteItem('upload', selectedFile.id)}>delete</div>
            </div>
        </Layout>
    )
}

export default Slug
