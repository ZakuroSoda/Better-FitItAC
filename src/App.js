import React, { useState, useEffect } from 'react';

import Logo from './components/Logo';
import Login from './components/Login';
import Error from './components/Error';
import DefectForm from './components/DefectForm';
import SuggestionForm from './components/SuggestionForm';
import Menu from './components/Menu';
import ReportsList from './components/ReportsList';
import Admin from './components/Admin';

import './App.css';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function App() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [page, setPage] = useState('login');

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      fetch(`${API_URL}/getusername?token=${token}`)
        .then(res => {
          if (res.status === 401) {
            setErrorMessage('Session token error');
            return null;
          }
          return res.text();
        })
        .then(username => {
          if (!username) {
            return;
          }
          setUser(username);
          if (user === 'admin') {
            setPage('admin');
          } else {
            setPage('menu');
          }
        });
    }
  }, [user]);

  return (
    <div className='App'>
      <div className="container d-flex flex-column justify-content-center align-items-center p-2 pt-5">
        <Logo />
        <Error errorMessage={errorMessage} />
        <Login page={page} setPage={setPage} setUser={setUser} setErrorMessage={setErrorMessage} API_URL={API_URL} />
        <Menu page={page} setPage={setPage} setUser={setUser} />
        <ReportsList page={page} user={user} API_URL={API_URL} />
        <DefectForm user={user} page={page} setPage={setPage} API_URL={API_URL} />
        <SuggestionForm user={user} page={page} setPage={setPage} API_URL={API_URL} />
        <Admin page={page} user={user} API_URL={API_URL} />
      </div>
    </div>
  );
}

export default App;
