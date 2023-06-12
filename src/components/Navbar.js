import React from "react";
import Modal from "./Modal";


const Navbar = () => {
    // const location = window.location.pathname;
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark" >
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Social Media</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/adminUser">Users</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/adminPost">Post</a>
                        </li>
                        
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/resetPassword">Reset Password</a>
                        </li>
                        {
                            <li className="nav-item">
                            <Modal name="Logout" path="/" message='Logout??'/>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>

    );
};

export default Navbar;