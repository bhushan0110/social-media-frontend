import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/Auth';

const Modal = ( props ) => {

    const auth = useAuth();
    const navigate = useNavigate();

    const [name] = useState(props.name);
    const [path] = useState(props.path);
    const [message] = useState(props.message);
    const handelChange = () => {
        navigate(path); 
        localStorage.removeItem('jwtToken');
        auth.logout();
        auth.setAdmin(false);
    };

    return(
        <>
            <button type="button" className="btn btn-bg-dark text-light" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                {name}
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content bg-light">
                    <div className="modal-header bg-light">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">{message}??</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">No</button>
                        <button type="button" className="btn btn-outline-success" data-bs-dismiss="modal" onClick={handelChange}>Yes</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;