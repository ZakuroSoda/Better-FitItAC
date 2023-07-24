import React from 'react';

function Error(props) {
  const { errorMessage } = props;
  return (
    <>
      <p style={{ color: "red" }}>
        {errorMessage}
      </p>
    </>
  );
}

export default Error;