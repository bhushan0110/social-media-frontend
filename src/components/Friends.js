import React, { useEffect, useState } from "react";
import FriendComponent from "./FriendComponent";
import { useFormik } from "formik";
import { searchFriendSchema } from "../schemas";
import axios from "axios";

const initialValues = {
    userName: ''
};

const Friends = () => {
    const [newFriends, setNewFriends] = useState([]);
    const [myFriends, setMyFriends] = useState([]);
    const [refresh,setRefresh] = useState(false);
    const [clicked,setClicked] = useState(false);

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
            const { userName } = data;
            const token = localStorage.getItem('jwtToken');
            const response = await axios.post('http://localhost:5000/friends/searchFriend',{userName},{
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                }
            });

            if(response){
                setNewFriends(response.data);
                console.log(newFriends);
                // alert('Done');
            }
            setClicked(true);
            action.resetForm();
        })
    });

    const getMyFriends= async ()=>{
        try{
            const token = localStorage.getItem('jwtToken');
            const data = await axios.get('http://localhost:5000/friends/getMyFriends',{
                headers:{
                    'Content-Type':'application/json',
                    'auth-token': token
                }
            });

            if(data){
                setMyFriends(data.data);
                console.log(myFriends);
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
                    newFriends.map((element)=>{
                        return(
                            <div key={element._id}>
                                <FriendComponent name={element.name} _id={element._id} isFriend = {false} handelRefresh={handelRefresh}/>
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
                    myFriends.map((element)=>{
                        return(
                            <div key={element._id}>
                                <FriendComponent name={element.name} _id={element._id} isFriend = {true}/>
                            </div>
                        );
                    })
                }
                {
                    (myFriends.length==0) &&
                    <p className="text-warning">Search for new friends</p>
                }
            </div>
        </div>
    );
};

export default Friends;