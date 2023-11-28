import React, { useState, useEffect } from 'react';

import Logo from './components/Logo';
import Login from './components/Login';
import DefectForm from './components/DefectForm';
import SuggestionForm from './components/SuggestionForm';
import Menu from './components/Menu';
import ReportsList from './components/ReportsList';
import Admin from './components/Admin';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('login');

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      fetch(`/api/getusername?token=${token}`)
        .then(res => {
          if (res.status === 401) {
            res.text().then(errorMessage => {
              toast.dismiss();
              toast.error(errorMessage, { position: "bottom-right" });
            });
            return null;
          }
          return res.text();
        })
        .then(UserObj => {
          if (!UserObj) {
            return;
          }

          UserObj = JSON.parse(UserObj);
          setUser(UserObj.schoolID);

          if (UserObj.admin) {
            setPage('admin');
          } else {
            setPage('menu');
          }
        })
        .catch(err => {
          console.error(err);
          toast.dismiss();
          toast.error('Internal server error', { position: "bottom-right" });
        });
    }
  }, [user]);

  return (
    <div className='App'>
      <ToastContainer />
      <div className="container d-flex flex-column justify-content-center align-items-center p-2 pt-5">
        <Logo />
        <Login page={page} setPage={setPage} setUser={setUser} />

        <Menu page={page} setPage={setPage} setUser={setUser} />

        <ReportsList page={page} user={user} />
        <DefectForm user={user} page={page} setPage={setPage} />
        <SuggestionForm user={user} page={page} setPage={setPage} />
        
        <Admin page={page} user={user} />
      </div>
    </div>
  );
}

export default App;
