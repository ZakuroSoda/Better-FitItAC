import React, {useState, useEffect} from 'react';

import Logo from './components/Logo';
import Login from './components/Login';
import ReportsList from './components/ReportsList';
import Error from './components/Error';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function App() {

  const [user, setUser] = useState(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      fetch(`http://localhost:2000/getusername?token=${token}`)
        .then(res => {
          if (res.status === 401) {
            throw new Error('Invalid Token: Possibly Altered?');
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
        <Error error={showError}/>
        <Login user={user} setUser={setUser} setShowError={setShowError}/>
        <ReportsList user={user}/>
      </div>
    </div>
  );
}

export default App;
