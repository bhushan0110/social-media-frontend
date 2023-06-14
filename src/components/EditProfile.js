import React from "react";

import { useAuth } from "../context/Auth";
import { useFormik } from "formik";
import { editProfileSchema } from "../schemas";
import axios from "axios";


const EditProfile = () => {

    const auth = useAuth();
    const initialValues = {
        name: auth.user.name,
        email: auth.user.email,
        dob: new Date(auth.user.dob).toISOString().split('T')[0],
    };


    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: initialValues,
        validationSchema: editProfileSchema,
        onSubmit: (async (data,action) =>{
            try {
                const token = localStorage.getItem('jwtToken');
                const {name,email,dob} = data;
                const update = await axios.post('http://localhost:5000/auth/editProfile',{name,email,dob},{
                    headers:{
                        'Content-Type':'application/json',
                        'auth-token': token,
                    }
                });
                if(update){
                    auth.successToast('Profile Updated');
                    
                    action.resetForm();
                }
            } catch (error) {
                auth.dangerToast('Error occured');
                console.log(error);
            }
        })
    });

    return (
        <div className="container">
            <div className="card my-5 mx-auto" style={{ width: '80%' }}>
                <div className="card-body">
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
                        <button type="submit" className="btn btn-outline-primary mb-3">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;