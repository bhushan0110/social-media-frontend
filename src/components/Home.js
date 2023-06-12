import React, { useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "../context/Auth";
import Post from "./Post";
import Spinner from "./Spinner";

const Home = () => {
    const auth = useAuth();
    const [postData, setPostData] = useState([]);
    const [spinner,setSpinner] = useState(false);


    const getData = async () =>{
        setSpinner(true);
        const token = localStorage.getItem('jwtToken');
        const data = await axios.get('http://localhost:5000/postOperation/getDashboardPost', {headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }});

        setPostData(data.data);
        setSpinner(false);
        console.log(postData);
    }

    useEffect(()=>{
        getData();
    },[])

    return (
            <div className="container my-4" style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
                {
                    (spinner)&&
                    <div className="my-5">
                        <Spinner size={true}/>
                    </div>
                }
                {
                    (!spinner)&&postData.map((element)=>{
                        const {id,comments,commentCount,image,isPrivate, like,user,content} = element;
                        return(
                            <Post id={id} comments={comments} commentCount={commentCount} image={image} isPrivate={isPrivate} content={content} like={like} user={user} deleteButton={false}/>
                        );
                    
                    })
                }
            </div>
    );
};

export default Home;
