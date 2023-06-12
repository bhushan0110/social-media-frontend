import React, { createContext, useContext, useState } from "react";
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AuthContext = createContext(null);

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);

    const login = (user) => {
        setUser(user);
    }

    const logout = () => {
        setUser(null);
    }

    const successToast = (message) =>{
        toast.success(message, {
            position: "top-right",
            autoClose: 3000,
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
            autoClose: 3000,
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
            autoClose: 3000,
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
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }

    // const setUserData = async () =>{
    //     const token = localStorage.getItem('jwtToken');
    //     try{
    //         const data = await axios.get('http://localhost:5000/auth/getUserDetails',{
    //             headers:{
    //                 "Content-Type": "application/json",
    //                 'auth-token': token,
    //             }
    //         });

    //         if(data){
    //             console.log(data);
    //             login(data.data);
    //         }
    //     }
    //     catch(err){
    //         console.log(err);
    //     }
    // }

    // useEffect(()=>{
    //     setUserData();
    // },[]);

    return (
        <AuthContext.Provider  value={{user,login,logout,successToast,errorToast, warningToast, infoToast}} >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}