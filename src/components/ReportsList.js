import React, { useEffect, useState } from 'react';
import { Nav, Tab, Card } from 'react-bootstrap';

function ReportsList(props) {
  const { page, user, API_URL } = props;
  const [tab, setTab] = useState('#defects');
  const [defects, setDefects] = useState(null);
  const [suggestions, setSuggestions] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/getdefectreports?username=${user}`)
      .then(res => {
        if (res.status === 404) {
          return null;
        }
        return res.json();
      })
      .then(data => setDefects(data))
      .catch(err => console.log(err));
  }, [user, page]);

  useEffect(() => {
    fetch(`${API_URL}/getsuggestionreports?username=${user}`)
      .then(res => {
        if (res.status === 404) {
          return null;
        }
        return res.json();
      })
      .then(data => setSuggestions(data))
      .catch(err => console.log(err));
  }, [user, page]);

  if (page === 'menu') {
    return (
      <div className="container my-4 mx-5">
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
                          Date Reported: {report.date}<br />
                          Category: {report.category}<br />
                          Location: {report.location}<br />
                          Status: <strong>{report.resolved_status}</strong>
                        </Card.Text>
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

export default ReportsList;