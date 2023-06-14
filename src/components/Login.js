import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { loginSchema } from "../schemas";
import { postRequest } from "./Request";
import { useAuth } from "../context/Auth";

const initialValues = {
    email: '',
    password: '',
    loginType: 'user',
};

const Login = () =>{

    const navigate = useNavigate();
    const auth = useAuth();

    const { values, errors,touched,handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit: (async (data, action) => {
            const {email,password,loginType} = data;
            try{
                let resp;
                if(loginType==='user'){
                    resp = await postRequest('/auth/login',{email,password});
                }
                else{
                    resp = await postRequest('/admin/login', {email,password});
                }

                if (resp.status === 200) {
                    localStorage.setItem('jwtToken', resp.data.authToken);
                    auth.login(resp.data.user);
                    auth.successToast('Login Success');
                    if(loginType ==='user')
                        navigate('/dashboard');
                    else{
                        auth.setAdmin(true);
                        navigate('/adminUser');
                    }
                    action.resetForm();
                }     
                else{
                    auth.errorToast('Invalid Credentials');
                }           
            }
            catch(err){
                auth.errorToast('Invalid Credentials');
            }            
        })
    });

    return(
        <>
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
                        <select className="form-select form-select mb-3" aria-label=".form-select-sm example"
                            value={values.loginType} onChange={handleChange} onBlur={handleBlur}
                            name="loginType"
                        >
                            <option value="user" selected>User</option>
                            <option value="admin">Admin</option>
                        </select>
                        <div>
                            <p className="text-secondary">New to Social media <Link to="/signup">Signup here</Link></p>
                            <p className="text-secondary"><a href="/forgotPassword">Forgot Password</a></p>
                        </div>
                        
                        <button type="submit" className="btn btn-outline-info mb-3">Login</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default Login;