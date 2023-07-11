import React, { createContext, useContext, useEffect, useState } from "react";

import { getRequest } from '../components/Request';

const AdminContext = createContext(null);

export const AdminContextProvider = ({children}) => {

    const [adminUserData, setUserData] = useState([]);
    const [adminPostData, setPostData] = useState([]);
    const [adminAccountRequest, setAccountRequest] = useState([]);

    const getUserData = async () =>{
        try{
            const response = await  getRequest('/admin/userData');
            setUserData(response.data);
        }
        catch(err){
            console.log(err);
        }
    };

    const getPostData = async () =>{
        try{
            const data = await getRequest('/postOperation/postDataAdmin');
            setPostData(data.data);
        }
        catch(err){
            console.log(err.message);
        }
    };

    const getAccountReq = async () =>{
        try{
            const response = await getRequest('/admin/accountRequest');

            if(response){
                setAccountRequest(response.data);
            }
        }
        catch(err){
            console.log(err.message);
        }
    };

    useEffect(()=>{
        getUserData();
        getPostData();
        getAccountReq();
    },[]);

    return(
        <AdminContext.Provider value={{adminAccountRequest,adminPostData,adminUserData,setAccountRequest,setPostData,setUserData, getAccountReq, getPostData,getUserData}} >
            {children}
        </AdminContext.Provider>
    );
};

export const useAdminContext = () => {
    return useContext(AdminContext);
} 
