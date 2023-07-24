import React, { useEffect, useState } from 'react';
import { Nav, Tab, Card, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Admin(props) {
  const { page, user } = props;
  const [tab, setTab] = useState('#defects');
  const [defects, setDefects] = useState(null);
  const [suggestions, setSuggestions] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:2000/getdefectreportsall`)
      .then(res => {
        if (res.status === 404) {
          return null;
        }
        return res.json();
      })
      .then(data => setDefects(data))
      .catch(err => console.log(err));
  }, [user, page, defects]);

  useEffect(() => {
    fetch(`http://localhost:2000/getsuggestionreportsall`)
      .then(res => {
        if (res.status === 404) {
          return null;
        }
        return res.json();
      })
      .then(data => setSuggestions(data))
      .catch(err => console.log(err));
  }, [user, page, suggestions]);

  const handleResolveDefect = (uid) => {
    fetch(`http://localhost:2000/resolvedefectreport?uid=${uid}`)
      .then(res => {
        toast.success(`Defect has been resolved!`, { position: "bottom-right" });
        setDefects(defects.filter(defect => defect.uid !== uid));
      })
  }

  if (page === 'admin') {
    return (
      <div className="container my-4 mx-5">
        <ToastContainer />
        <Card>
          <Card.Header>
            <Nav variant="tabs" activeKey={tab}>
              <Nav.Item onClick={() => setTab('#defects')}>
                <Nav.Link eventKey="#defects">Defect Reports</Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={() => setTab('#suggestions')}>
                <Nav.Link eventKey="#suggestions">Suggestion</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Tab.Container activeKey={tab}>
              <Tab.Content>
                <Tab.Pane eventKey="#defects">
                  {defects === null ? (
                    <Card.Text>No defects reported</Card.Text>
                  ) : (
                    defects.map(report => (
                      <div key={report.uid}>
                        <Card.Title>{report.title}</Card.Title>
                        <Card.Text>
                          From: {report.school_id}<br />
                          Date Reported: {report.date}<br />
                          Category: {report.category}<br />
                          Location: {report.location}<br />
                          Description: {report.description}<br />
                        </Card.Text>
                        {(report.image_extension == null) ? null : (
                          <a className="btn btn-secondary" target="_blank" rel="noreferrer" href={`/uploads/${report.uid}${report.image_extension}`}>📸 Open Image</a>
                        )}
                        <Button
                          variant="primary"
                          className='mx-1'
                          onClick={() => handleResolveDefect(report.uid)}>✔ Resolve</Button>
                        <hr />
                      </div>
                    ))
                  )}
                </Tab.Pane>

                <Tab.Pane eventKey="#suggestions">
                  {suggestions === null ? (
                    <Card.Text>No suggestions submitted</Card.Text>
                  ) : (
                    suggestions.map(suggestion => (
                      <div key={suggestion.uid}>
                        <Card.Title>{suggestion.title}</Card.Title>
                        <Card.Text>
                          Date suggested: {suggestion.date}<br />
                          Content: {suggestion.description}
                        </Card.Text>
                        <hr />
                      </div>
                    ))
                  )}
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Card.Body>
        </Card>
      </div>
    )
  }; return null;
}

export default Admin;