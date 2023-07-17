import React from 'react';

function Logo(){
  return (
    <>
        <img 
          src="/images/job_penki_ojiisan.png"
          className='img-fluid pb-2'
          style={{ maxWidth: '50%', height: 'auto' }}
          alt="logo"
        />
        <h1 className='mb-3'>
          FixItAC++
        </h1>
    </>
  );
}

export default Logo;