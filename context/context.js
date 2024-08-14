import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";


const Context = createContext();
const ContextProvider = ({ children }) => {
    const [error, setError] = useState('')
    const route = useRouter()
    const handleRoute = () => {
        route.push('/auth/')
    }

    function formatFileSize (sizeInBytes) {
        if (sizeInBytes < 1024) {
            return sizeInBytes + " bytes";
        } else if (sizeInBytes < 1024 * 1024) {
            return (sizeInBytes / 1024).toFixed(2) + " KB";
        } else {
            return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
        }
    }

    const [customData, setCustomData] = React.useState({
        email: "",
        file: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if (!customData.file) {
                setTimeout(() => {
                    setError('Important! Add at least 1 file.');
                }, 3000);
                throw new Error('Important! Add at least 1 file.')
            } else {
                console.log("this data is ready", customData);
            }
            // add data to db
        } catch (error) {
            console.log(error);
        } finally {
            setCustomData({
                email: "",
                file: "",
            });
        }
    }
    const [count, setCount] = useState(2);

    return (
        <Context.Provider value={{ count, setCount, handleRoute, formatFileSize, customData, setCustomData, handleSubmit, error }
        }>
            {children}
        </Context.Provider>
    );
};

export { Context, ContextProvider };
