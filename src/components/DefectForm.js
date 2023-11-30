import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DefectForm(props) {
  const { user, page, setPage } = props;

  const [defectReport, setDefectReport] = useState({
    'schoolId': user,
    'title': '',
    'category': '1',
    'location': '',
    'description': ''
  });
  const [selectedFile, setSelectedFile] = useState(null);

  // on initial page load, user will be null, hence update user
  useEffect(() => {
    setDefectReport({
      ...defectReport,
      'schoolId': user
    });
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (defectReport.title === '' || defectReport.location === '' || defectReport.description === '') {
      toast.dismiss();
      toast.error('Please fill in all fields', { position: "bottom-right" });
      return;
    };

    fetch(`/api/newdefectreport`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(defectReport)
    })
      .then(res => res.text())
      .then(id => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('id', id);
        // DO NOT DEFINE CONTENT-TYPE HEADER
        fetch(`/api/newdefectphoto`, {
          method: 'POST',
          body: formData
        })
          .catch(err => {
            console.error(err);
            toast.dismiss();
            toast.error('Internal server error', { position: "bottom-right" });
          });
      })
      .then(() => {
        setDefectReport({
          'schoolId': user,
          'title': '',
          'category': '1',
          'location': '',
          'description': ''
        });
        setSelectedFile(null);
        toast.dismiss();
        toast.success('Defect report submitted successfully!', { position: "bottom-right" });
      })
      .catch(err => {
        console.error(err);
        toast.dismiss();
        toast.error('Internal server error', { position: "bottom-right" });
      });
  }

  if (page === 'defect') {
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
              value={defectReport.title}
              onChange={(e) => {
                setDefectReport({
                  ...defectReport,
                  title: e.target.value
                });
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              className="form-control"
              id="category"
              value={defectReport.category}
              onChange={(e) => {
                setDefectReport({
                  ...defectReport,
                  category: e.target.value
                });
              }}
            >
              <option value="1">Lights</option>
              <option value="2">Projector/Sound System</option>
              <option value="3">Air-Con</option>
              <option value="4">Other Electrical</option>
              <option value="5">Toilet</option>
              <option value="6">Building (door, locker etc)</option>
              <option value="7">Other</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              id="location"
              value={defectReport.location}
              onChange={(e) => {
                setDefectReport({
                  ...defectReport,
                  location: e.target.value
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
              value={defectReport.description}
              onChange={(e) => {
                setDefectReport({
                  ...defectReport,
                  description: e.target.value
                });
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="photo" className="form-label">Photo (Optional)</label>
            <input
              type="file"
              className='form-control'
              id="photo"
              accept="image/*"
              onChange={(e) =>
                setSelectedFile(e.target.files[0])
              }
            />
          </div>
          <div className="d-flex justify-content-between my-3">
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">Submit Report</button>
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

export default DefectForm;