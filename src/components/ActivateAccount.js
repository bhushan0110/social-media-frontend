import React, { useEffect, useState } from "react";

import { useAuth } from "../context/Auth";
import { postRequest, getRequest } from "./Request";

const ActivateAccount = () => {

    const auth = useAuth();

    const [requests, setRequests] = useState([]);

    const getActivateRequests = async () => {
        try{
            const response = await getRequest('/admin/accountRequest');

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
            const activate = await postRequest('/admin/activateAccount',{id});

            if(activate){
                auth.infoToast(`${name}'s Account Activated`);
                getActivateRequests();
            }
        }
        catch(err){
            console.log(err);
        }
    };

    useEffect(()=>{
        getActivateRequests();
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