import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/Auth";
// import axios from "axios";

export const RequireAuth = ({children}) => {
    const auth = useAuth();

    // const userAuth = async () =>{
    //     try{
    //         const token = localStorage.getItem('jwtToken');
    //         const user = await axios.get('http://localhost:5000/auth/getUserDetails',{
    //             headers:{
    //                 "Content-Type": 'application/json',
    //                 'auth-token': token,
    //             }
    //         });

    //         if(user){
    //             auth.login(user.data);
    //             return true;
    //         }
    //         else{
    //             auth.logout();
    //             return false;
    //         }
    //     }
    //     catch(err){
    //         console.log(err.message);
    //         return false;
    //     }
    // }
    
    if(!auth.user){
        // if(userAuth())
            return <Navigate to='/'/>
    }

    return children;
};