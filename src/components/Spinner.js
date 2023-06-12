import React from "react";
import gif from '../loadingSpinner.gif';
import smallGif from '../smallLoading.gif';

const Spinner = ({size}) =>{
    return(
        <>
            {
                size&& <img src={gif}/>
            }
            {
                (!size)&& <img src={smallGif}/>
            }
        </>
    );
    
};

export default Spinner;