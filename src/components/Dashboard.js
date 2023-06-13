import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Profile from "./Profile";
import Friends from "./Friends";
import Home from "./Home";
import MyPost from "./MyPost";
import Trending from "./Trending";
import EditProfile from "./EditProfile";



const Dashboard = () => {

    const [component,setComponent] = useState(0);
    

    return(
            <div className="row">
                <div className="row" style={{width:'100%'}}>
                    <div className="col-md-3" style={{height: '100vh', alignContent:'center'}}>
                        <div style={{padding:'10px'}}>
                            <Profile component={component} setComponent={setComponent}/>
                        </div>
                    </div>
                    <div className="col-md-9" style={{minHeight:'100vh',padding:'10px'}}>
                        <div className="card shadow" style={{height: '100%'}}>
                            <div>
                                {
                                    (component===0)&&<Home />
                                }
                                {
                                    (component===1)&&<MyPost />
                                }
                                {
                                    (component===2)&&<Friends />
                                }
                                {
                                    (component===3)&&<Trending />
                                }
                                {
                                    (component===4)&&<EditProfile/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Dashboard;