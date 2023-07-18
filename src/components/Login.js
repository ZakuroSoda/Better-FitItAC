import React, {useState} from 'react';

function Login(props){
    const {user, setUser, setShowError} = props;
    const [schoolID, setSchoolID] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();

      fetch(`http://localhost:2000/newtoken?username=${schoolID}`)
        .then(res => {
          if (res.status === 401) {
            setShowError(true);
            return null;
          }
          return res.text();
        })
        .then(token => {
          if (!token) return;
          
          setShowError(false);
          document.cookie = `token=${token}`;
          setUser(schoolID);
        })
    }
    
    if (user) return null;
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
}

export default Login;