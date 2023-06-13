import React, { useEffect, useState } from "react";

import Spinner from "./Spinner";
import Post from './Post';
import { postRequest } from "./Request";


const Trending = () => {
    const [postData, setPostData] = useState([]);
    const [spinner,setSpinner] = useState(false);

    const getData = async () => {
        try {
            setSpinner(true);
            const data = await postRequest('/postOperation/trendingPost',{});
            if(data){
                setSpinner(false);
                setPostData(data.data);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        getData();
        // eslint-disable-next-line
    },[]);

    return (
        <div className="container my-3" style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
            {
                spinner&&
                <div style={{marginTop:'70px'}}>
                    <Spinner size={true}/>
                </div>
            }
            {
                (!spinner)&&postData.map((element)=>{
                    return(
                        <Post element={element} deleteButton={false}/>
                    )
                })
            }
        </div>
    );
};

export default Trending;
