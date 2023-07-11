import React, { createContext, useContext } from "react";

const UserPostContext = createContext(null);

export const UserPostContextProvider = ({children}) =>{

    return(
        <UserPostContext.Provider>
            {children}
        </UserPostContext.Provider>
    );
};

export const useUserPostContext = () => {
    return useContext(UserPostContext);
}

