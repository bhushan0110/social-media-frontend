import React from "react";
import { useFormik } from "formik";
import axios from "axios";


import { addPostSchema } from "../schemas";
import { useAuth } from "../context/Auth";

const initialValues = {
    description: '',
    ptype: "true",
    file: null
}

const AddPost = ( {component, setComponent}) => {
    const auth = useAuth();

    const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: addPostSchema,
        onSubmit: async (data, action) =>{
            
            const {description,ptype,file} = data;
            const isPrivate = (ptype==="true")? false : true; 
            const formData = new FormData();
            formData.append('content',description);
            formData.append('isPrivate',isPrivate);
            formData.append('file',file);

            try{
                const token = localStorage.getItem('jwtToken');
                const response = await axios.post('http://localhost:5000/postOperation/addPost',formData,{headers: {
                    'Content-Type': 'multipart/form-data',
                    'auth-token': token
                }})

                if(response){
                    console.log(response);
                    console.log("success");
                    auth.successToast('Post Uploaded');
                    setComponent(!component);
                }
                action.resetForm();
            }
            catch(err){
                console.log(err.message);
                auth.errorToast(err.message);

            }
            
            
        }
    });

    return (
        <div className="container my-5" style={{ alignContent: 'center', justifyContent: 'center', width: '80%' }}>
            <div className="card p-3">
                <div className="card-body">
                    <h5 className="text-secondary">Add New Post</h5>
                    <form className="my-3" onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control"
                                id="floatingDescription" name="description"
                                value={values.description} onChange={handleChange} onBlur={handleBlur}
                                placeholder="name@example.com" />
                            <label htmlFor="floatingDescription">Description</label>
                            {
                                errors.description && touched.description ? <p className="form-error text-danger">{errors.description}</p> : null
                            }
                        </div>
                        <input
                            type="file"
                            name="file"
                            onChange={(event) => {
                                setFieldValue('file', event.currentTarget.files[0]);
                            }}
                        />
                        {touched.file && errors.file && (
                            <p className="form-error text-danger">{errors.file}</p>
                        )}
                        <label htmlFor="ptype" className="mx-2">
                            Select Post type:
                            <select name="ptype" value={values.ptype} className="mx-3" onChange={handleChange}>
                                <option value="true">Public</option>
                                <option value="false">Private</option>
                            </select>
                        </label>
                        {
                            errors.ptype && touched.ptype ? <p className="form-error text-danger"> {errors.ptype} </p> : null
                        }
                        <br />
                        <button type="submit" className="btn btn-outline-info mt-4"> Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddPost;