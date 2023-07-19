import React, { useState } from 'react';

function DefectForm(props) {
  const user = props.user;
  const [defectReport, setDefectReport] = useState({
    'school-id': user,
    'title': '',
    'category': '1',
    'location': '',
    'description': ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  console.log(defectReport);

  const handleSubmit = (event) => {
    event.preventDefault();
    setDefectReport({
      ...defectReport,
      'school-id': user
    });
    console.log(selectedFile);

    if (defectReport.title === '' || defectReport.location === '' || defectReport.description === '') return;

    fetch('http://localhost:2000/newdefectreport', {
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

      fetch('http://localhost:2000/newdefectphoto', {
        method: 'POST',
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: formData
      });
    });
  }
  if (!user) return null;
  return (
    <>
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
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">Submit Report</button>
        </div>
      </form>
    </>
  );
}

export default DefectForm;