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

        if (!customData.file) {
            setError('Important! Add at least 1 file.');

            // Clear the error after 3 seconds
            setTimeout(() => {
                setError('');
            }, 3000);

            return; // Exit early if the validation fails
        }

        try {
            console.log("this data is ready", customData);
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
        <Context.Provider value={{ count, setCount, handleRoute, formatFileSize, customData, setCustomData, handleSubmit, error }
        }>
            {children}
        </Context.Provider>
    );
};

export { Context, ContextProvider };
