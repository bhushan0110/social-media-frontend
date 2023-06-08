import React, { useEffect, useState } from "react";
import Post from "./Post";
import AddPost from "./AddPost";
import axios from "axios";

const MyPost = () => {

    const [ component, setComponent] = useState(true);
    const [postData, setPostData] = useState([]);

    const getData = async () =>{
        const token = localStorage.getItem('jwtToken');
        const data = await axios.get('http://localhost:5000/postOperation/getMyPost', {headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }});

        setPostData(data.data);
        console.log(postData);
    }

    const handelClick = () => {
        const tmp = ! component;
        setComponent( tmp );
    }

    useEffect(()=>{
        getData();
        // eslint-disable-next-line
    },[component]);

    return (
        <div className="mx-4 mt-4">
            {
                component &&<button type="button" className="btn btn-outline-warning" onClick={handelClick}>
                    New Post   
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg>
                </button>
            }
            {
                (!component)&&<button type="button" className="btn btn-outline-warning" onClick={handelClick}> 
                    Back
                </button>
            }
            {
                component&& postData.map((element)=>{
                    const {id,comments,commentCount,image,isPrivate, like,user,content} = element;
                    return(
                        <Post id={id} comments={comments} commentCount={commentCount} image={image} isPrivate={isPrivate} content={content} like={like} user={user}/>
                    );
                
                })
            }
            {
                (!component)&&<AddPost setComponent = {setComponent} component={component}/>
            }
        </div>
    );
};

export default MyPost;