import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { loginSchema } from "../schemas";
import { post } from "./Request";
import { useAuth } from "../context/Auth";

const initialValues = {
    email: '',
    password: ''
};

const Login = () =>{

    const navigate = useNavigate();
    const auth = useAuth();

    const { values, errors,touched,handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit: (async (data, action) => {
            const {email,password} = data;
            const resp = await post('/auth/login',{email,password});
            if(resp){
                console.log(resp);
                localStorage.setItem('jwtToken',resp.data.authToken);
                auth.login(resp.data.user);
                alert('Success');
                navigate('/dashboard');
            }
            else{
                alert('Error occured')
            }
            action.resetForm();
        })
    });

    return(
        <div className="container">
            <div className="card my-5 mx-auto" style={{ width: '80%' }}>
                <div className="card-body">
                    <h5 className="mb-4">Login</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" 
                                id="floatingEmail" name="email" 
                                value={values.email} onChange={handleChange} onBlur={handleBlur}
                                placeholder="name@example.com" />
                            <label htmlFor="floatingEmail">Email address</label>
                            {
                                errors.email && touched.email?<p className="form-error text-danger">{errors.email}</p> : null
                            }
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" 
                                id="floatingPassword" name="password" 
                                value={values.password} onChange={handleChange} onBlur={handleBlur}
                                placeholder="Password" />
                            <label htmlFor="floatingPassword">Password</label>
                            {
                                errors.password && touched.password?<p className="form-error text-danger">{errors.password}</p> : null
                            }
                        </div>
                        <div>
                            <p className="text-secondary">New to Social media <a href="/signup">Signup here</a></p>
                            <p className="text-secondary"><a href="/forgotPassword">Forgot Password</a></p>
                        </div>
                        <button type="submit" className="btn btn-outline-info mb-3">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;