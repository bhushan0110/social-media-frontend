import React, { useState } from "react";

import images from '../images/boy.png';
import { useAuth } from "../context/Auth";

const Profile = (props) => {

    const auth = useAuth();
    
    const [user] = useState(auth.user);
    const [date] = useState(new Date(user.dob).toLocaleDateString());
    console.log(user);
    const {setComponent} = props;
    const handelClick = (e) =>{
        setComponent(parseInt(e.target.id));
    }   

    return(
        <div className="card shadow" style={{height: '100%'}} >
            <div className="card-body" style={{padding:'0'}}>
                <div className="px-3 py-2">
                    <img className="mb-4"  src={images} alt="Profile" style={{width:'50%'}}/>
                    <h6 className="text-secondary">Hello {user.name}</h6>
                    <p className="text-secondary">{user.email}</p>
                    <div style={{display: 'flex'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#3C486B" className="bi bi-calendar-heart" viewBox="0 0 16 16" style={{marginRight:'10'}}>
                            <path fillRule="evenodd" d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5ZM1 14V4h14v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1Zm7-6.507c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/>
                        </svg>
                        <p style={{color:"#293462"}}>DOB: {date}</p>
                    </div>
                </div>
                <ul className="list-group" style={{width:'100%', margin:'0', padding:'0'}}>
                    <li className="list-group-item py-2" style={{cursor:"pointer"}} onClick={handelClick} id="0">
                        <div style={{display: 'flex'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#3C486B" className="bi bi-house mx-2" viewBox="0 0 16 16">
                                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
                            </svg>
                            <p style={{margin: '0',padding:'0'}}>Dashboard</p>
                        </div>
                    </li>
                    <li className="list-group-item py-2" style={{cursor:"pointer"}} id="1" onClick={handelClick}>
                        <div style={{display: 'flex'}} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FF0060" className="bi bi-instagram mx-2" viewBox="0 0 16 16">
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                            </svg>
                            <p style={{margin: '0',padding:'0'}}> My Post </p>
                        </div>
                    </li>
                    <li className="list-group-item py-2" style={{cursor:"pointer"}} id="2" onClick={handelClick}>
                        <div style={{display: 'flex'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#025464" className="bi bi-people-fill mx-2" viewBox="0 0 16 16">
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                            </svg>
                            <p style={{margin: '0',padding:'0'}}> Friends </p>
                        </div>
                    </li>
                    <li className="list-group-item py-2" style={{cursor:"pointer"}} id="3" onClick={handelClick}>
                        <div style={{display: 'flex'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#F79327" className="bi bi-fire mx-2" viewBox="0 0 16 16">
                                <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"/>
                            </svg>
                            <p style={{margin: '0',padding:'0'}}> Trending Post </p>
                        </div>
                    </li>
                </ul>

                <div className="container mx-2"  onClick={handelClick} style={{marginTop: '30px'}}>
                    <div style={{display:"flex", cursor:'pointer'}} id="4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="gray" className="bi bi-pencil-square mx-2" viewBox="0 0 16 16" style={{cursor:'pointer'}}>
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                        <p>Edit Profile</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;