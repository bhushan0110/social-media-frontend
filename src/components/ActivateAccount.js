import axios from "axios";
import React, { useEffect, useState } from "react";

import { useAuth } from "../context/Auth";

const ActivateAccount = () => {

    const auth = useAuth();

    const [requests, setRequests] = useState([]);

    const getRequests = async () => {
        try{
            const token = localStorage.getItem('jwtToken');
            const response = await axios.get('http://localhost:5000/admin/accountRequest',{
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                }
            })

            if(response){
                console.log(response.data);
                setRequests(response.data);
                console.log(requests);
            }
        }
        catch(err){
            console.log(err.message);
        }
    }

    const handelActivate = async (id,name) =>{
        try{
            const token = localStorage.getItem('jwtToken');
            const activate = await axios.post('http://localhost:5000/admin/activateAccount',{id}, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                }
            });

            if(activate){
                auth.infoToast(`${name}'s Account Activated`);
                getRequests();
            }
        }
        catch(err){
            console.log(err);
        }
    };

    useEffect(()=>{
        getRequests();
        // eslint-disable-next-line
    },[]);

    return(
        <div className="container my-4">
            <h4 className="" style={{color: '#545B77'}}> Account Activation Requests </h4>
            <div className="my-5" style={{overflow:'auto'}}>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>                        
                        </tr>
                    </thead>
                    {
                        requests.map((element) =>{
                            return(
                                <tr key={element._id}>
                                    <th scope="row">{element.name}</th>
                                    <td>{element.email}</td>
                                    <td>
                                        <button className={`btn btn-sm btn-outline-info`} onClick={()=> handelActivate(element.user, element.name)}>
                                            Activate
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </table>
            </div>
        </div>
    );
};

export default ActivateAccount;