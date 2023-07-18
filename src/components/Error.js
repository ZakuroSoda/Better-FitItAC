import React from 'react';

function Error(props){
    const { showError, errorMessage} = props;
    if (!showError) return null;
    return (
        <>
            <p style={{color: "red"}}>
                {errorMessage}
            </p>
        </>
    );
}

export default Error;