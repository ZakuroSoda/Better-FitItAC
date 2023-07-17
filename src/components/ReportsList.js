import React from 'react';

function ReportsList(props) {
    const user = props.user;
    if (!user) return null;
    return (
        <p>Hello there, {user}, what are you up to?</p>
    );
}

export default ReportsList;