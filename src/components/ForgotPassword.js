import React from "react";
import { useFormik } from "formik";
import axios from "axios";


import { forgotPasswordSchema } from "../schemas";
import { useAuth } from "../context/Auth";

const initialValues = {
    email: ''
};

const ForgotPassword = () =>{

    const auth = useAuth();

    const { values, errors,touched,handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: initialValues,
        validationSchema: forgotPasswordSchema,
        onSubmit: (async (data, action)=>{
            const {email} = data;
            try{
                const token = localStorage.getItem('jwtToken'); 
                const response = await axios.post('http://localhost:5000/auth/forgortPassword',{email:email},{
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token
                    }
                });

                if(response){
                    auth.infoToast('Check your registered email');
                }
            }
            catch(err){
                console.log(err);
                auth.dangerToast('Some error occured');
            }
            action.resetForm();
        })
    });

    return(
        <div className="container my-5">
            <div className="card mx-auto" style={{maxWidth:'30rem'}}>
                <div className="card-body">
                    <h5 className="text-secondary mb-4">Forgot Password</h5>
                    <h6 className="mb-3">Enter your registered email</h6>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" 
                                id="floatingEmail" name="email"
                                value={values.email} onChange={handleChange} onBlur={handleBlur}
                                placeholder="name@example.com"/>
                            <label htmlFor="floatingEmail">Email address</label>
                            {
                                errors.email && touched.email? <p className="form-error text-danger">{errors.email}</p> : null
                            }
                        </div>
                        <button type="submit" className="btn btn-outline-info mb-3">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;