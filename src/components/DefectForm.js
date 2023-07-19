import React, {useState} from 'react';

function DefectForm(props) {
    const user = props.user;
    const [defectReport, setDefectReport] = useState({
        'school-id': user,
        'title': '',
        'category': 0,
        'location': '',
        'description': '',
        'photo': null
    });

    if (!user) return null;
    return (
        <>
        <form>
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
                    console.log(defectReport);
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
        </form>
      </>
    );
}

export default DefectForm;