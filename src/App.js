import React, {useState, useEffect} from 'react';

import Logo from './components/Logo';
import Login from './components/Login';
// import ReportsList from './components/ReportsList';
import Error from './components/Error';
import DefectForm from './components/DefectForm';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function App() {

  const [user, setUser] = useState(null);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      fetch(`http://localhost:2000/getusername?token=${token}`)
        .then(res => {
          if (res.status === 401) {
            setErrorMessage('Session token error');
            setShowError(true);
            return null;
          }
          return res.text();
        })
        .then(username => {
          setUser(username);
        });
    }
  }, [user]);

  return (
    <div className='App'>
      <div className="container d-flex flex-column justify-content-center align-items-center p-2 pt-5">
        <Logo />
        <Error showError={showError} errorMessage={errorMessage}/>
        <Login user={user} setUser={setUser} setShowError={setShowError} setErrorMessage={setErrorMessage}/>
        {/* <ReportsList user={user}/> */}
        <DefectForm user={user}/>
      </div>
    </div>
  );
}

export default App;
