import React, { useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "../context/Auth";
import Post from "./Post";

const Home = () => {
    const auth = useAuth();
    const [postData, setPostData] = useState([]);

    const getData = async () =>{
        const token = localStorage.getItem('jwtToken');
        const data = await axios.get('http://localhost:5000/postOperation/getDashboardPost', {headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }});

        setPostData(data.data);
        console.log(postData);
    }

    useEffect(()=>{
        getData();
    },[])

    return (
        <div className="container my-4 mx-3">
            {
                postData.map((element)=>{
                    const {id,comments,commentCount,image,isPrivate, like,user,content} = element;
                    return(
                        <Post id={id} comments={comments} commentCount={commentCount} image={image} isPrivate={isPrivate} content={content} like={like} user={user}/>
                    );
                
                })
            }
        </div>
    );
};

export default Home;
