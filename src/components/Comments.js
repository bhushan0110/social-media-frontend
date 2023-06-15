import React, { useState } from "react";
import { useFormik } from "formik";


import { commentSchema } from "../schemas";
import { useAuth } from "../context/Auth";
import { postRequest } from "./Request";

const initialValues = {
    comment : '',
}

const Comments = ( props ) =>{
    const {id,  comment, commentCount} = props;

    const auth = useAuth();
    const [comments] = useState(comment);

    const { values, errors,handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: initialValues,
        validationSchema: commentSchema,
        onSubmit: (async (data, action) => {
            try{
                const postComment = await postRequest('/postOperation/addComment',
                    {postID:id, commentCount:(commentCount+1),  comment: data.comment});

                if(postComment){
                    auth.successToast('Commented');
                }

                action.resetForm();
            }
            catch(err){
                console.log(err.message);
            }
        })
    });

    

    return(
        <div className="container">
            {
                comments.map((element)=>{
                    return(
                        <div key={element.comment}>
                            <h6>{element.userName}</h6>
                            <p>{element.comment}</p>
                        </div>
                    );
                })
            }

            <form onSubmit={handleSubmit} className="my-2">
                <div className="d-flex" >
                    <div class="mb-3">
                        <input type="text" class="form-control" id="input"  placeholder="Add Comment"
                            name="comment" value={values.comment} onChange={handleChange} handleBlur={handleBlur}
                            style={{height:'30px'}}
                        />
                    </div>
                    <button className="btn btn-sm btn-outline-info ml-1" type='submit' style={{height:'30px', marginLeft:'5px'}} > Post </button>
                </div>
                {
                    errors.email ?<p className="form-error text-danger">{errors.email}</p> : null
                }
            </form>
        </div>
    );
};

export default Comments;