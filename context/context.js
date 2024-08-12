import React, { createContext, useState, useEffect } from "react";


const Context = createContext(undefined);


const ContextProvider = ({ children }) => {
    const [count, setCount] = useState(0);

    return (
        <Context.Provider value={{ count, setCount }
        }>
            {children}
        </Context.Provider>
    );
};

export { Context, ContextProvider };
