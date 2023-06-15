import React, { useEffect, useState } from "react";

import {useAuth} from '../context/Auth';
import { getRequest, postRequest } from "./Request";

const AdminUser = () =>{

    const [users,setUser] = useState([]);
    const auth = useAuth();
    
    const getUserData = async () =>{
        try{
            const response = await  getRequest('/admin/userData');

            if(response){
                setUser(response.data);
            }
        }
        catch(err){
            console.log(err.message);
        }
    };

    const handelChangeState = async (_id,name,status) =>{
        try{

            const url = `/admin/changeUserState`;
            const response = await postRequest(url,{userID:_id, status:(!status)});
            
            if(response){
                if(status === true) auth.warningToast(`${name} Disabled`);
                else auth.infoToast(`${name} Enabled`);

                getUserData();
            }
        }
        catch(err){
            console.log(err.message);
        }
    };

    useEffect(()=>{
        getUserData();
        // eslint-disable-next-line
    },[]);

    return(
        <div className="container my-4 ">
            <h4 className="" style={{color: '#545B77'}}> Available Users </h4>
            <div style={{overflow:'auto'}}>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>                        
                        </tr>
                    </thead>
                    {
                        users.map((element) =>{
                            return(
                                <tr key={element.id}>
                                    <th scope="row">{element.name}</th>
                                    <td>{element.email}</td>
                                    <td style={{color:`${(element.status)===true? "green":"red"}`}}>
                                        {(element.status===true)?"Enabled":"Disabled"}
                                    </td>
                                    <td>
                                        <button className={`btn btn-sm btn-outline-${(element.status)===true? "danger":"success"}`} onClick={()=> handelChangeState(element._id, element.name, element.status)}>
                                            {
                                                (element.status===true)?"Disable":"Enable"
                                            }
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

export default AdminUser;