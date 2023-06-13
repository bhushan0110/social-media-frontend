import React, { useEffect, useState } from "react";
import axios from "axios";

import Post from "./Post";
import Spinner from "./Spinner";

const Home = () => {
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
    }

    useEffect(()=>{
        getData();
        // eslint-disable-next-line
    },[])

    return (
        <div className="mx-4 my-3">
            <h4>Dashboard</h4>
            <div className="container my-4" style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
                {
                    (spinner)&&
                    <div className="my-5">
                        <Spinner size={true}/>
                    </div>
                }
                {
                    (!spinner)&&postData.map((element)=>{
                        return(
                            <div key={element._id}>
                                <Post element={element} deleteButton={false}/>
                            </div>
                        );
                    
                    })
                }
            </div>
        </div>
    );
};

export default Home;
