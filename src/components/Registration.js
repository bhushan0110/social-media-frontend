import React from "react";
import { useFormik } from "formik";
import { registrationSchema } from "../schemas";


// System imports
import { post } from "./Request";

const initialValues = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    dob: '',
};

const Registration = () => {

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: initialValues,
        validationSchema: registrationSchema,
        onSubmit: (async (data, action) => {
            const {name,email,password,dob} = data;
            const response = await post('/auth/signup',{name,email,password,dob});
            if(response){
                alert('Success');
            }
            else{
                alert('Error occured')
            }
            action.resetForm();
        })
    });

    return (
        <div className="container">
            <div className="card my-5 mx-auto" style={{ width: '80%' }}>
                <div className="card-body">
                    <h5>Welcome to Social Media!</h5>
                    <h6 className="mt-4">Enter your details to register</h6>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" 
                                id="floatingName" name="name" 
                                value={values.name} onChange={handleChange}  onBlur={handleBlur}
                                placeholder="Name" />
                            <label htmlFor="floatingName">Name</label>
                            {
                                errors.name && touched.name?<p className="form-error text-danger">{errors.name}</p> : null
                            }
                        </div>
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
                            <input type="date" className="form-control" 
                                id="floatingDate" name="dob" 
                                value={values.dob} onChange={handleChange} onBlur={handleBlur}
                                placeholder="date" />
                            <label htmlFor="floatingDate">Date of Birth</label>
                            {
                                errors.dob && touched.dob?<p className="form-error text-danger">{errors.dob}</p> : null
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
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" 
                            id="floatingCPassword" name="confirm_password" 
                            value={values.confirm_password} onChange={handleChange} onBlur={handleBlur}
                            placeholder="Password" />
                            <label htmlFor="floatingCPassword">Confirm Password</label>
                            {
                                errors.confirm_password && touched.confirm_password?<p className="form-error text-danger">{errors.confirm_password}</p> : null
                            }
                        </div>
                        <button type="submit" className="btn btn-outline-primary mb-3">Register</button>
                        
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Registration;