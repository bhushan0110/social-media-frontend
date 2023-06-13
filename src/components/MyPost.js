import React, { useEffect, useState } from "react";
import Post from "./Post";
import AddPost from "./AddPost";
import axios from "axios";
import Spinner from "./Spinner";

const MyPost = () => {

    const [ component, setComponent] = useState(true);
    const [postData, setPostData] = useState([]);
    const [spinner,setSpinner] = useState(true);

    const getData = async () =>{
        setSpinner(true);
        const token = localStorage.getItem('jwtToken');
        const data = await axios.get('http://localhost:5000/postOperation/getMyPost', {headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }});

        setPostData(data.data);
        setSpinner(false);
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
        <>
        <div className="mx-4 my-4">
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
        </div>
        <div className="mx-4 mt-4" style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
            {
                spinner&&<Spinner size={true}/>
            }
            {
                (!spinner)&&component&& postData.map((element)=>{
                    return(
                        <Post element={element} deleteButton={true}/>
                    );
                
                })
            }
            {
                (!component)&&<AddPost setComponent = {setComponent} component={component}/>
            }
        </div>
        </>
    );
};

export default MyPost;