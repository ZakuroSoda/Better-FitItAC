import React, {useState, useEffect} from 'react';

import Logo from './components/Logo';
import Login from './components/Login';
import Error from './components/Error';
import DefectForm from './components/DefectForm';
import SuggestionForm from './components/SuggestionForm';
import Menu from './components/Menu';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function App() {

  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [page, setPage] = useState('login');

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      fetch(`http://localhost:2000/getusername?token=${token}`)
        .then(res => {
          if (res.status === 401) {
            setErrorMessage('Session token error');
            return null;
          }
          return res.text();
        })
        .then(username => {
          setUser(username);
          setPage('menu');
        });
    }
  }, [user]);

  return (
    <div className='App'>
      <div className="container d-flex flex-column justify-content-center align-items-center p-2 pt-5">
        <Logo />
        <Error errorMessage={errorMessage}/>
        <Login page={page} setPage={setPage} setUser={setUser} setErrorMessage={setErrorMessage}/>
        <Menu page={page} setPage={setPage}/>
        <DefectForm user={user} page={page} setPage={setPage}/>
        <SuggestionForm user={user} page={page} setPage={setPage}/>
      </div>
    </div>
  );
}

export default App;
