import React, {useState} from 'react';

function Login(props){
    const {user, setUser} = props;
    const [schoolID, setSchoolID] = useState("");

    const handleSubmit = (event) => {
      console.log('here');
      event.preventDefault();
      //send request to backend api to check if schoolID is valid, return token
      fetch(`http://localhost:2000/newtoken?username=${schoolID}`)
        .then(res => res.text())
        .then(token => {document.cookie = `token=${token}`; setUser(token)});
    }

    if (!user) {
      return (
        <>
          <p>You're not logged in.</p>
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
    } 

    return (
      <></>
    );  
}

export default Login;