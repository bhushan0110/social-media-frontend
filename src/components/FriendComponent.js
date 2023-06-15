import React, { useState } from "react";
import image from '../images/boy.png'

import { useAuth } from "../context/Auth";
import { postRequest } from './Request'; 

const FriendComponent = ( props ) => {
    const auth = useAuth();
    const {name, _id  ,isFriend, handelRefresh} = props;
    const [userName] = useState(name);
    const [id] = useState(_id);

    const handelClick = async () => {
        try{
            const addFriend  = await postRequest('/friends/addFriend', {friendID: id} );

            if(addFriend){
                handelRefresh();
                auth.successToast('Friend Added');
            }
        }
        catch(err){
            console.log(err.message);
        }
    };

    const handelDelete = async () => {
        try{

            const delFriend = await postRequest('/friends/removeFriend', {friendID: id});

            if(delFriend){
                auth.infoToast('Friend Removed');
                // handelRefresh();
            }
        }
        catch(err){
            console.log(err.message);
        }
    }

    return(
        <div className="card shadow my-3 mx-3" style={{width:'18rem'}}>
            <div className="d-flex p-3 align-items-center mx-2">
                <img src={image} alt="" srcset="" style={{width: '50px', height:'50px'}}/>
                <div className="card-body">
                    <div className="d-flex">
                        <h5>{userName}</h5>
                        {
                            (!isFriend)&&<button className="btn btn-sm btn-outline-info" onClick={handelClick} style={{marginLeft:'10px'}}>Add Friend</button>
                        }
                        {
                            (isFriend)&&<button className="btn btn-sm btn-outline" onClick={handelDelete} style={{marginLeft:'10px'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                </svg>
                            </button>
                        }
                    </div>   
                </div>
            </div>
        </div>
    );
};

export default FriendComponent;