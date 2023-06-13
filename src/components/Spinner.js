import React from "react";
import gif from '../loadingSpinner.gif';
import smallGif from '../smallLoading.gif';

const Spinner = ({size}) =>{
    return(
        <>
            {
                size&& <img src={gif} alt="hi"/>
            }
            {
                (!size)&& <img src={smallGif} alt="hi"/>
            }
        </>
    );
    
};

export default Spinner;