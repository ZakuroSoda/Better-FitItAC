import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

function Login(props) {
  const { page, setPage, setUser } = props;
  const [schoolID, setSchoolID] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`/api/newtoken?username=${schoolID}`)
      .then(res => {
        if (res.status === 401) {
          toast.error('Invalid School ID', { position: "bottom-right" });
          return null;
        }
        return res.text();
      })
      .then(token => {
        if (!token) return;

        toast.dismiss();
        document.cookie = `token=${token}`;
        setUser(schoolID);
        setPage('menu');
      })
    setSchoolID("");
  }

  if (page === 'login') {
    return (
      <>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="input-group">
              <input
                placeholder="School ID"
                type="text"
                className="form-control"
                id="school-id"
                aria-describedby="button-login"
                value={schoolID}
                onChange={(e) => setSchoolID(e.target.value)}
              />
              <button type="submit" className="btn btn-outline-dark" id="button-login">Login</button>
            </div>
            <div id="school-id-help" className="form-text">E.g. 21john.tan</div>
          </div>
        </form>
      </>
    );
  } return null;
}

export default Login;