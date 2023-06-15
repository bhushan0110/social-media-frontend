import React, { useEffect, useState } from "react";
import Post from "./Post";
import { getRequest } from "./Request";

const AdminPost = () => {
    const [postData, setPostData] = useState([]);

    const getData = async () =>{
        try{
            const data = await getRequest('/postOperation/postDataAdmin');
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
                        return(
                            <Post element={element} deleteButton={true}
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