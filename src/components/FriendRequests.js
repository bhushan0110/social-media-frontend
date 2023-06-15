import React, { useEffect,useState } from "react";


import { getRequest, postRequest } from "./Request";
import { useAuth } from "../context/Auth";

const FriendRequests = () => {

    const auth = useAuth();
    const [requests,setRequests] = useState([]);
    const getData = async () =>{
        try{
            const response = await getRequest('/friends/friendRequests');

            if(response){
                setRequests(response.data);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const handelAccept = async (name, id) =>{
        try{
            const response = await postRequest('/friends/acceptRequest',{friendID: id});
            if(response){
                auth.infoToast(`${name} Added`);
                getData();
            }
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getData();
        // eslint-disable-next-line
    },[]);

    return(
        <div className="container my-4 mx-3" >
            <h4 className="" style={{color: '#545B77'}}> Friend Requests </h4>
            <div className="my-4" style={{overflow:'auto',width: '100%'}}>
                {
                    (requests.length===0)&&
                    <h6 className="text-warning">No Friend Requests</h6>
                }
                {
                    (requests.length>0)&&<table className="table">
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
                                                <button className={`btn btn-sm btn-outline-info`} onClick={()=> handelAccept(element.name, element._id)}>
                                                    Accept
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                    </table>
                }
            </div>
        </div>
    );
};

export default FriendRequests;