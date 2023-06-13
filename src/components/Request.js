import axios from "axios";

const url = 'http://localhost:5000';
export const postRequest = async (route,data) =>{
    try{
        const token = localStorage.getItem('jwtToken');
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
        const token = localStorage.getItem('jwtToken');
        const backend_route = url+route;
        const success = await axios.post(backend_route,{
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
