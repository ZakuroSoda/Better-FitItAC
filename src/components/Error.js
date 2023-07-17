import React from 'react';

function Error(props){
    const showError = props.error;
    if (!showError) return null;
    return (
        <>
            <p style={{color: "red"}}>
                Invalid School ID
            </p>
        </>
    );
}

export default Error;