import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SuggestionForm(props) {
  const { user, page, setPage } = props;

  const [suggestionReport, setSuggestionReport] = useState({
    'schoolID': user,
    'title': '',
    'description': ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (suggestionReport.title === '' || suggestionReport.description === '') {
      toast.error('Please fill in all fields', { position: "bottom-right" });
      return;
    };

    fetch(`/api/newsuggestionreport`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(suggestionReport)
    })
      .then(() => {
        setSuggestionReport({
          'schoolID': user,
          'title': '',
          'description': ''
        });
        toast.success('Suggestion submitted successfully!', { position: "bottom-right" });
      })
  }
  if (page === 'suggestion') {
    return (
      <>
        <ToastContainer />

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={suggestionReport.title}
              onChange={(e) => {
                setSuggestionReport({
                  ...suggestionReport,
                  "schoolID": user,
                  title: e.target.value
                });
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              value={suggestionReport.description}
              onChange={(e) => {
                setSuggestionReport({
                  ...suggestionReport,
                  description: e.target.value
                });
              }}
            />
          </div>
          <div className="d-flex justify-content-between my-3">
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
            <div className="mb-3">
              <button className="btn btn-secondary" onClick={() => setPage('menu')}>Exit</button>
            </div>
          </div>
        </form>
      </>
    );
  } return null;
}

export default SuggestionForm;