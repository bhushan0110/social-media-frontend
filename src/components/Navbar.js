import React from "react";
import Modal from "./Modal";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { useAuth } from "../context/Auth";
const Navbar = () => {
    const location = useLocation().pathname;
    const auth = useAuth();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to='/dashboard'>Social Media</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {
                        (location!=='/'&& location!=='/forgotPassword' && location!=='/signup')&&<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {
                                auth.isAdmin &&<li className="nav-item">
                                    <Link className="nav-link active" to='/adminUser'>Users</Link>
                                </li>
                            }   
                            {
                                auth.isAdmin &&<li className="nav-item">
                                    <Link className="nav-link active" to='/adminPost'>Post</Link>
                                </li>
                            }
                            {
                                auth.isAdmin &&<li className="nav-item">
                                    <Link className="nav-link active" to='/adminRequest'>Account Request</Link>
                                </li>
                            }
                            <li className="nav-item">
                                <Link className="nav-link active" to='/resetPassword' >Reset Password</Link>
                            </li>
                            {
                                <li className="nav-item">
                                    <Modal name="Logout" path="/" message='Logout??'/>
                                </li>
                            }
                        </ul>
                    }
                </div>
            </div>
        </nav>

    );
};

export default Navbar;