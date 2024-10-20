import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { app } from '../db/firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, setDoc, doc, getDocs, deleteDoc } from "firebase/firestore"; // Updated Firestore import
import { generateRandomString } from "@/constants/constants";

const Context = createContext();
const ContextProvider = ({ children }) => {
    const [error, setError] = useState('');
    const [progress, setProgress] = useState(0);
    const [files, setFiles] = useState([])
    const [share, setShare] = useState(false)
    const randhash = generateRandomString(6)
    const [showModal, setShowModal] = useState(false)
    // console.log(share)
    // console.log(files[0]?.data.email)
    const router = useRouter();

    // Initialize Firestore
    const db = getFirestore(app); // Use Firestore instead of Realtime Database

    const handleRoute = () => {
        router.push('/auth/');
    };


    const [customData, setCustomData] = useState({
        email: "",
        name: "",
        file: "",
    });

    // Function to add user data to Firestore
    async function addUserToFirebase (customData, downloadURL) {
        try {
            const docRef = doc(collection(db, 'upload'));  // Create a new document
            await setDoc(docRef, {
                id: randhash,
                fileName: customData?.file?.name,
                fileSize: customData?.file.size,
                fileType: customData?.file.type,
                userName: customData.name,
                email: customData?.email,
                password: "",
                shortURL: `https://deel-blue.vercel.app/d/${randhash}`,
                fileURL: downloadURL, // Store the file's download URL in Firestore
                createdAt: new Date(), // Optional: Add a timestamp
            });
            // console.log("Document successfully written!");
        } catch (err) {
            console.log(err);
        } finally {
            setCustomData({ email: '', file: '' });
        }
    }




    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!customData.file) {
            setError('Important! Add at least 1 file.');
            setTimeout(() => {
                setError('');
            }, 3000);
            return; // Exit early if the validation fails
        }
        if (customData.file.size >= 21000000) {
            setError('File must not exceed 20MB');
            setTimeout(() => {
                setError('');
            }, 3000);
            return; // Exit early if the validation fails
        }
        try {
            const storage = getStorage(app);
            const uploadRef = ref(storage, `upload/${customData.file.name}`);
            const uploadTask = uploadBytesResumable(uploadRef, customData.file);
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (progress === 100) {
                    setTimeout(() => {
                        setProgress(0);
                    }, 3000);
                }
                setProgress(progress);
                if (snapshot.state === 'error') {
                    console.error('Upload failed:', snapshot.error);
                }
            }, (error) => {
                console.error('Upload error:', error);
            }, async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                await addUserToFirebase(customData, downloadURL);
                // After adding user data to Firestore, replace and reload the page
                router.replace('/files').then(() => {
                    router.reload();
                });
            });
        } catch (error) {
            console.log(error);
        } finally {
            setCustomData({
                name: "",
                email: '',
                file: '',
            });
        }
    };


    // get files from firestore
    const getFiles = async () => {
        const querySnapshot = await getDocs(collection(db, 'upload'))
        const data = querySnapshot.docs.map((snapshotDoc => {
            return {
                id: snapshotDoc.id,
                data: {
                    ...snapshotDoc.data()
                }
            }
        }
        ))
        setFiles(data)
    }

    useEffect(() => {
        getFiles()
    }, [])

    // add post to favourite

    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const storedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
        setFavourites(storedFavourites);
    }, []);

    const handleAddToFavourite = (item) => {
        const itemExists = favourites.some(fav => fav.id === item.id);
        if (!itemExists) {
            const updatedFavourites = [...favourites, item];
            setFavourites(updatedFavourites);
            localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
            // console.log(updatedFavourites);
            alert('File has been added to bookmark')
        } else {
            console.log('Item already exists in favourites');
        }
    };


    // remove from favourite
    const deleteBookmark = (index) => {
        const bookmarks = JSON.parse(localStorage.getItem('favourites')) || [];
        bookmarks.splice(index, 1);
        localStorage.setItem('favourites', JSON.stringify(bookmarks));
        setFavourites(bookmarks);
        // alert('File has been removed from bookmark')
    };


    // console.log(favourites)
    const [count, setCount] = useState(2);

    return (
        <Context.Provider value={{ count, setCount, handleRoute, customData, setCustomData, handleSubmit, error, progress, files, handleAddToFavourite, favourites, deleteBookmark, share, setShare, showModal, setShowModal }}>
            {children}
        </Context.Provider>
    );
};

export { Context, ContextProvider };
