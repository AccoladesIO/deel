import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { app } from '../db/firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



const Context = createContext();
const ContextProvider = ({ children }) => {

    const [error, setError] = useState('')
    const [progress, setProgress] = useState(0)
    const route = useRouter()
    const handleRoute = () => {
        route.push('/auth/')
    }

    function formatFileSize (sizeInBytes) {
        if (sizeInBytes < 1024) {
            return sizeInBytes + "B";
        } else if (sizeInBytes < 1024 * 1024) {
            return (sizeInBytes / 1024).toFixed(2) + " KB";
        } else {
            return (sizeInBytes / (1024 * 1024)).toFixed(2) + " mb";
        }
    }

    const [customData, setCustomData] = React.useState({
        email: "",
        file: "",
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!customData.file) {
            setError('Important! Add at least 1 file.');
            setTimeout(() => {
                setError('');
            }, 3000);

            return; // Exit early if the validation fails
        }
        if (customData.file.size >= 2100000) {
            setError('File must not exceed 2MB');
            setTimeout(() => {
                setError('');
            }, 3000);

            return; // Exit early if the validation fails
        }

        try {
            console.log("Data is ready:", customData);

            const storage = getStorage(app);
            const uploadRef = ref(storage, `upload/${customData.file.name}`);
            const uploadTask = uploadBytesResumable(uploadRef, customData.file, customData?.file?.type);

            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
                setProgress(progress)
                console.log(snapshot.state, typeof (progress))

                if (snapshot.state === 'error') {
                    console.error('Upload failed:', snapshot.error);
                } else if (progress === 100) {
                    console.log('Upload complete!');
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                    });
                }
            });

            // add data to db here (e.g., with an async function)

            // Reset form only after successful submission
            setCustomData({
                email: "",
                file: "",
            });
        } catch (error) {
            console.log(error);
        }
    };

    const [count, setCount] = useState(2);

    return (
        <Context.Provider value={{ count, setCount, handleRoute, formatFileSize, customData, setCustomData, handleSubmit, error, progress }
        }>
            {children}
        </Context.Provider>
    );
};

export { Context, ContextProvider };
