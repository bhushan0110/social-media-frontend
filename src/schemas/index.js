import * as Yup from 'yup';

export const registrationSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Please enter your name"),
    email: Yup.string().email().required("Please enter you email"),
    password: Yup.string().min(5).required('Please enter your password'),
    confirm_password: Yup.string()
                        .required()
                        .oneOf([Yup.ref('password'),null],"Password must match"),
    dob: Yup.date().required('Please select your Birth date'),
});

export const editProfileSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Please enter your name"),
    email: Yup.string().email().required("Please enter you email"),
    dob: Yup.date().required('Please select your Birth date'),
}); 


export const loginSchema = Yup.object({
    email: Yup.string().email().required("Please enter you email"),
    password: Yup.string().min(5).required('Please enter you password'),
});

export const forgotPasswordSchema = Yup.object({
    email: Yup.string().email().required("Enter your registered email")
});

export const resetPasswordSchema = Yup.object({
    new_Password: Yup.string().min(5).required('Please enter new Password'),
    confirm_Password: Yup.string().required('Please enter Confirm Password')
                        .oneOf([Yup.ref('new_Password'),null], "Password must match"),
});


export const addPostSchema = Yup.object({
    description: Yup.string().min(2).max(150).required('Enter some discription of your post'),
    ptype: Yup.string().required('Please select a post type'),
    file: Yup.mixed().required('File is required'),
});

export const searchFriendSchema = Yup.object({
    userName: Yup.string().required('Enter UserName to search')
});

export const commentSchema = Yup.object({
    comment: Yup.string().min(1).required('Enter a comment')
});