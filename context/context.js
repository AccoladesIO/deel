import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const Context = createContext(undefined);
const ContextProvider = ({ children }) => {
    const route = useRouter()
    const handleRoute = () => {
        route.push('/auth/')
    }
    const [count, setCount] = useState(2);

    return (
        <Context.Provider value={{ count, setCount, handleRoute, }
        }>
            {children}
        </Context.Provider>
    );
};

export { Context, ContextProvider };
