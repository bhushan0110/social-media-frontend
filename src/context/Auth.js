import React, { createContext, useContext, useState } from "react";
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AuthContext = createContext(null);

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [isAdmin,setAdmin] = useState(false);
    const login = (user) => {
        setUser(user);
    }

    const logout = () => {
        setUser(null);
    }

    const successToast = (message) =>{
        toast.success(message, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }

    const errorToast = (message) =>{
        toast.error(message, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    } 

    const warningToast = (message) => {
        toast.warn(message, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }

    const infoToast = (message) => {
        toast.info(message, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }


    return (
        <AuthContext.Provider  value={{user,isAdmin, setAdmin,login,logout,successToast,errorToast, warningToast, infoToast}} >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}