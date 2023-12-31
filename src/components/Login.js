import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

function Login(props) {
  const { page, setPage, setUser } = props;
  const [credentials, setCredentials] = useState({ schoolId: "", password: "" });
  const [loginStage, setLoginStage] = useState("schoolId");

  useEffect(() => {
    if (loginStage === "schoolId") {
      document.getElementById("school-id").focus();
    }
    if (loginStage === "password") {
      document.getElementById("password").focus();
    }
  }, [loginStage]);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`/api/newtoken?username=${credentials.schoolId}&password=${credentials.password}`)
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
      .then(token => {
        if (!token) return;

        toast.dismiss();
        toast.success('Successfully logged in!', { position: "bottom-right" });

        document.cookie = `token=${token}`;
        setUser(credentials.schoolId);
        setPage('menu');
      })
      .catch(err => {
        console.error(err);
        toast.dismiss();
        toast.error('Internal server error', { position: "bottom-right" });
      });

    // reset form and login stage (don't clear username)
    setCredentials({ ...credentials, password: "" });
    setLoginStage("schoolId");
  }

  if (page === 'login') {
    return (
      <>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="input-group">
              {
                loginStage === "schoolId" ?
                  <>
                    <input
                      placeholder="School ID"
                      type="text"
                      className="form-control"
                      id="school-id"
                      aria-describedby="button-login"
                      value={credentials.schoolId}
                      onChange={(e) => setCredentials({
                        ...credentials,
                        schoolId: e.target.value
                      })}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setLoginStage("password");
                      }}
                      className="btn btn-outline-dark"
                      id="button-next"
                    >
                      Next
                    </button>
                  </>
                  :
                  <>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setLoginStage("schoolId");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === ' Enter') e.preventDefault();
                      }}
                      className="btn btn-outline-dark"
                      id="button-back"
                    >
                      Back
                    </button>
                    <input
                      placeholder="Password"
                      type="password"
                      className="form-control"
                      id="password"
                      aria-describedby="button-login"
                      value={credentials.password}
                      onChange={(e) => setCredentials({
                        ...credentials,
                        password: e.target.value
                      })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') document.getElementById("button-login").click();
                      }}
                    />
                    <button
                      type="submit"
                      className="btn btn-outline-dark"
                      id="button-login"
                    >
                      Login
                    </button>
                  </>
              }
            </div>
            { loginStage === "schoolId" ?
              <div id="school-id-help" className="form-text">E.g. 21john.tan</div> :
              <div id="password-help" className="form-text">E.g. Password123</div>
            }
          </div>
        </form>
      </>
    );
  } return null;
}

export default Login;