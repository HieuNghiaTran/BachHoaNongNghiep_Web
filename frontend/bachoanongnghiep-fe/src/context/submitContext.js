import React, { createContext, useContext, useState } from 'react';

export const SubmitContext = createContext();

const SubmitProvider = ({ children }) => {
    const [submit, setSubmit] = useState(false)



    const onSubmit = () => {

        setSubmit(true)
    

    }

    const offSubmit = () => {
        setSubmit(false)
   

    }


    return (
        <SubmitContext.Provider value={{
            submit,
            onSubmit,
            offSubmit,

        }}>
            {children}

        </SubmitContext.Provider>



    );
};

export { SubmitProvider }
