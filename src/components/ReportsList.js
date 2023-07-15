import React from 'react';

function ReportsList(props) {
    const user = props.user;
    if (user) {
        return (
            <p>Hello there, {user}, what are you up to?</p>
        );
    }

    return (
        <></>
    );
}

export default ReportsList;