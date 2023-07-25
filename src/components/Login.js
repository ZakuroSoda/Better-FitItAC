import React, { useState } from 'react';

function Login(props) {
  const { page, setPage, setUser, setErrorMessage, API_URL } = props;
  const [schoolID, setSchoolID] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`${API_URL}/newtoken?username=${schoolID}`)
      .then(res => {
        if (res.status === 401) {
          setErrorMessage("Invalid School ID");
          return null;
        }
        return res.text();
      })
      .then(token => {
        if (!token) return;

        setErrorMessage("");
        document.cookie = `token=${token}`;
        setUser(schoolID);
        setPage('menu');
      })
  }

  if (page === 'login') {
    return (
      <>
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
              <button type="submit" className="btn btn-primary" id="button-login">Login</button>
            </div>
            <div id="school-id-help" className="form-text">E.g. 21john.tan</div>
          </div>
        </form>
      </>
    );
  } return null;
}

export default Login;