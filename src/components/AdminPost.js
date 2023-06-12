import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "./Post";

const AdminPost = () => {
    const [postData, setPostData] = useState([]);

    const getData = async () =>{
        try{
            const token = localStorage.getItem('jwtToken');
            console.log(token);
            const data = await axios.get('http://localhost:5000/postOperation/postDataAdmin',{
                headers:{
                    'Content-Type':'application/json',
                    'auth-token':token,
                }
            });

            setPostData(data.data);
            
        }
        catch(err){
            console.log(err.message);
        }
    }

    useEffect(()=>{
        getData();
    },[]);

    return(
        <div className="container my-4 mx-5">
            <h5  style={{color:'#526D82'}}>Users Post</h5>
            <div className="container mx-5">
                {
                    postData.map((element)=>{
                        const {id,comments,commentCount,image,isPrivate, like,user,content} = element;
                        return(
                            <Post id={id} comments={comments} commentCount={commentCount} image={image} 
                                isPrivate={isPrivate} content={content} like={like} user={user} deleteButton={true}
                                getData = {getData}     
                            />
                        );
                    })
                }
            </div>
        </div>
    );
}

export default AdminPost;