import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";


import Spinner from "./Spinner";
import FriendComponent from "./FriendComponent";
import { searchFriendSchema } from "../schemas";
import { useAuth } from "../context/Auth";
import { getRequest, postRequest } from "./Request";

const initialValues = {
    userName: ''
};

const Friends = () => {

    const auth = useAuth();

    const [newFriends, setNewFriends] = useState([]);
    const [myFriends, setMyFriends] = useState([]);
    const [refresh,setRefresh] = useState(false);
    const [clicked,setClicked] = useState(false);
    const [spinner1,setSpinner1] = useState(false);
    const [spinner2,setSpinner2] = useState(false);

    const handelRefresh = () =>{
        const tmp = !refresh;
        setRefresh(tmp);
        setNewFriends([]);
        setClicked(false);
    }

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: initialValues,
        validationSchema: searchFriendSchema,
        onSubmit: (async (data, action)=> {
            try{
                setSpinner1(true);
                const { userName } = data;
                const response = await postRequest('/friends/searchFriend',{userName});
                if(response.request.status===200){
                    setNewFriends(response.data);
                    setSpinner1(false);
                    auth.infoToast('Add new friends');
                }
                setClicked(true);
                action.resetForm();
            }
            catch(err){
                console.log(err.message);
                auth.danger('Error occured');
            }
        })
    });

    const getMyFriends= async ()=>{
        try{
            setSpinner2(true);
            const data = await getRequest('/friends/getMyFriends');

            if(data){
                setMyFriends(data.data);
                setSpinner2(false);
            }
        }   
        catch(err){
            console.log(err.message);
        }
    }

    useEffect(()=>{
        getMyFriends();
    },[refresh]);

    return(
        <div className="container my-5">
            <div style={{marginLeft:'3%'}}>
                <h5 className="my-3" style={{color:'#545B77'}}> Search for New friends </h5>
                <form class="d-flex" onSubmit={handleSubmit}>    
                    <input class="form-control me-2" type="search" 
                        placeholder="Search" aria-label="Search"
                        name="userName" value={values.userName} onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <button class="btn btn-primary" type="submit">Search</button>
                </form>
                {
                    errors.userName && touched.userName?<p className="form-error text-danger">{errors.userName}</p> : null
                }
            </div>
            
            <div className="my-5" style={{marginLeft:'3%'}}>
                {
                    (spinner1)&&<Spinner size={false}/>
                }
                {
                    (!spinner1)&&newFriends.map((element)=>{
                        return(
                            <div key={element._id}>
                                <FriendComponent name={element.name} _id={element._id} isFriend = {false} handelRefresh={handelRefresh} />
                            </div>
                        );
                    })
                }
                {
                    (clicked)&&(newFriends.length===0) && <p className="text-warning">Not found</p>
                }
            </div>

            <div className="my-5" style={{marginLeft:'3%'}}>
                <h5 style={{color:'#545B77'}}> Your Friends </h5>
                {
                    (spinner2)&&<Spinner size={false}/>
                }
                {
                    myFriends.map((element)=>{
                        return(
                            <div key={element._id}>
                                <FriendComponent name={element.name} _id={element._id} isFriend = {true} />
                            </div>
                        );
                    })
                }
                {
                    (!spinner2)&&(myFriends.length===0) &&
                    <p className="text-warning">Search for new friends</p>
                }
            </div>
        </div>
    );
};

export default Friends;