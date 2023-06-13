import { useFormik } from "formik";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { resetPasswordSchema } from "../schemas";
import { useAuth } from "../context/Auth";

const initialValues = {
    new_Password: '',
    confirm_Password: ''
}

const ResetPassword = () =>{
    const auth = useAuth();
    const navigate = useNavigate();

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: resetPasswordSchema,
        onSubmit: (async (data,action)=>{
            try{
                const {new_Password} = data;
                const token = localStorage.getItem('jwtToken');
                const response = await axios.post('http://localhost:5000/auth/resetPassword',{password: new_Password},{
                    headers:{
                        "Content-Type":'application/json',
                        'auth-token': token,
                    }
                })
                if(response){
                    auth.successToast('Password Changed Successfully');
                    navigate('/dashboard');
                }

                action.resetForm();
            }
            catch(err){
                console.log(err.message);
                auth.danger('Error occured');
            }
        })
    })

    return(
        <div className="container my-5 mx-auto" style={{width:'65%'}}>
            <div className="card mx-auto">
                <div className="card-body">
                    <h5 className="text-secondary mb-4">Forgot Password</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" 
                                id="floatingNew" name="new_Password"
                                value={values.new_Password} onChange={handleChange} onBlur={handleBlur}
                                placeholder="name@example.com"/>
                            <label htmlFor="floatingNew">New Password</label>
                            {
                                errors.new_Password && touched.new_Password? <p className="form-error text-danger">{errors.new_Password}</p> : null
                            }
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" 
                                id="floatingEmail" name="confirm_Password"
                                value={values.confirm_Password} onChange={handleChange} onBlur={handleBlur}
                                placeholder="name@example.com"/>
                            <label htmlFor="floatingEmail">Confirm New Password</label>
                            {
                                errors.confirm_Password && touched.confirm_Password? <p className="form-error text-danger">{errors.confirm_Password}</p> : null
                            }
                        </div>
                        <button type="submit" className="btn btn-outline-info mb-3">Reset</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;