import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

function Login(props) {
  const { page, setPage, setUser } = props;
  const [credentials, setCredentials] = useState({ schoolID: "", password: "" });
  const [loginStage, setLoginStage] = useState("schoolID");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`/api/newtoken?username=${credentials.schoolID}&password=${credentials.password}`)
      .then(res => {
        if (res.status === 401) {
          res.text().then(errorMessage => {
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
        setUser(credentials.schoolID);
        setPage('menu');
      })
      .catch(err => {
        console.error(err);
        toast.error('Internal server error', { position: "bottom-right" });
      });

    // reset form and login stage
    setCredentials({ schoolID: "", password: "" });
    setLoginStage("schoolID");
  }

  if (page === 'login') {
    return (
      <>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="input-group">
              {
                loginStage === "schoolID" ?
                  <>
                    <input
                      placeholder="School ID"
                      type="text"
                      className="form-control"
                      id="school-id"
                      aria-describedby="button-login"
                      value={credentials.schoolID}
                      onChange={(e) => setCredentials({
                        ...credentials,
                        schoolID: e.target.value
                      })}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setLoginStage("password")
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
                        setLoginStage("schoolID")
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
            { loginStage === "schoolID" ?
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