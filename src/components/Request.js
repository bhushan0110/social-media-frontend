import axios from "axios";

const url = 'http://localhost:5000';
const token = localStorage.getItem('jwtToken');

export const postRequest = async (route,data) =>{
    try{
        const backend_route = url+route;
        const success = await axios.post(backend_route,data,{
            headers: {
                'Content-Type': 'application/json',
                'auth-token':token,
            }
        });
        
        if(success)
            return success;
    }
    catch(err){
        console.log(err);
        return err;
    }
};

export const getRequest = async (route) =>{
    try {
        const backend_route = url+route;
        console.log(backend_route);
        const success = await axios.get(backend_route,{
            headers: {
                'Content-type': 'application/json',
                'auth-token': token,
            }
        });
        if(success)
            return success;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const postMediaRequest = async (route, formData) => {
    try{
        const backend_route = url + route;
        const response = await axios.post(backend_route, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'auth-token': token,
            }
        });
        if(response)
            return response;
    }
    catch(err){
        console.log(err);
        return err;
    }
};