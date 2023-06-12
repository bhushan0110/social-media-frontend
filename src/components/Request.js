import axios from "axios";

const url = 'http://localhost:5000';
export const post = async (route,data) =>{
    try{
        const backend_route = url +route;
        const success = await axios.post(backend_route,data);
        
        if(success)
            return success;
    }
    catch(err){
        console.log(err);
        return err;
    }
}

export const get = async (route) =>{
    const success = await axios.post(`${url}+${route}`);
    return success;
}
