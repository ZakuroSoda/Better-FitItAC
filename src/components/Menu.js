import React from 'react';
import './Menu.css'

function Menu(props) {
  const { page, setPage, setUser } = props;

  const handleLogout = () => {
    setPage('login');
    setUser(null);
    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  return (
    <>
      {(page === 'menu' || page ==='admin') ? (
        <div className="d-flex justify-content-center align-items-center p-2 m-2">
          
          {page !== 'admin' ? (
            <>
              <button
                className="btn btn-primary m-2"
                onClick={() => setPage('defect')}>
                Report Defect
              </button>
              <button
                className="btn btn-info m-2"
                onClick={() => setPage('suggestion')}>
                Submit Suggestion
              </button>
            </>
          ) : null}

          <button
            className="btn btn-outline-danger m-2"
            onClick={() => handleLogout()}>
            Logout
          </button>
          
        </div>
      ) : null
      }
    </>
  );
}

export default Menu;