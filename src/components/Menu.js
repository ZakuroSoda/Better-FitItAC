import React from 'react';

function Menu(props) {
  const { page, setPage } = props;
  if (page === 'menu') {
    return (
      <>
        <div className="d-flex justify-content-center align-items-center p-2 m-2">
          <button
            className="btn btn-primary m-2"
            onClick={() => setPage('defect')}>
            🛠 Report New Defect
          </button>
          <button
            className="btn btn-info m-2"
            onClick={() => setPage('suggestion')}>
            ✋ Submit Suggestion
          </button>
        </div>
      </>
    );
  } return null;
}

export default Menu;