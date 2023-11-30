import React, { useEffect, useState } from 'react';
import { Nav, Tab, Card } from 'react-bootstrap';
import styles from './ReportsList.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ReportsList(props) {
  const { page, user } = props;
  const [tab, setTab] = useState('#defects');
  const [defects, setDefects] = useState([]);
  const [defectsFilter, setDefectsFilter] = useState(['open']);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!user) return;
    if (page !== 'menu') return;

    fetch(`/api/getdefectreports?username=${user}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (!data) return; // allows for an empty array though

        //sort the defects to put the open ones first (copilot wrote this)
        data.sort((a, b) => {
          if (a.resolved_status.toLowerCase() === 'open' && b.resolved_status.toLowerCase() !== 'open') {
            return -1;
          } else if (a.resolved_status.toLowerCase() !== 'open' && b.resolved_status.toLowerCase() === 'open') {
            return 1;
          } else {
            return 0;
          }
        });
        
        setDefects(data);
      })
      .catch(err => {
        console.error(err);
        toast.dismiss();
        toast.error('Internal server error', { position: "bottom-right" });
      });
  }, [user, page, defects]);

  useEffect(() => {
    if (!user) return;
    if (page !== 'menu') return;

    fetch(`/api/getsuggestionreports?username=${user}`)
      .then(res => {  
        return res.json();
      })
      .then(data => {
        if (!data) return; // allows for an empty array though
        setSuggestions(data)
      })
      .catch(err => {
        console.error(err);
        toast.dismiss();
        toast.error('Internal server error', { position: "bottom-right" });
      });
  }, [user, page, suggestions]);

  if (page === 'menu') {
    return (
      <>
        <ToastContainer />

        <div className="container my-4 mx-5">
          <Card className={styles.card}>
            <Card.Header>
              <Nav variant="tabs" activeKey={tab}>
                <Nav.Item onClick={() => setTab('#defects')}>
                  <Nav.Link eventKey="#defects">Defect Reports</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => setTab('#suggestions')}>
                  <Nav.Link eventKey="#suggestions">Suggestions</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Tab.Container activeKey={tab}>
                <Tab.Content>
                  <Tab.Pane eventKey="#defects">
                    <div className={styles.toggleWrapper}>
                      <div className={`${styles.toggle} ${defectsFilter.includes('open') ? styles.active : styles.inactive}`}
                        onClick={() =>
                          defectsFilter.includes('open') ?
                            setDefectsFilter(defectsFilter.filter(item => item !== 'open')) :
                            setDefectsFilter([...defectsFilter, 'open'])
                        }
                      >
                        Open
                      </div>
                      <div className={`${styles.toggle} ${defectsFilter.includes('resolved') ? styles.active : styles.inactive}`}
                        onClick={() =>
                          defectsFilter.includes('resolved') ?
                            setDefectsFilter(defectsFilter.filter(item => item !== 'resolved')) :
                            setDefectsFilter([...defectsFilter, 'resolved'])
                        }
                      >
                        Resolved
                      </div>
                    </div>
                    {
                      defectsFilter.length === 0 &&
                      <Card.Text>Nothing selected</Card.Text>
                    }
                    {
                      defectsFilter.length === 1 && defectsFilter[0] === 'open' && //defectfilter is ONLY open
                      defects.length !== 0 && //ensure it does not say no open defects even when user has none of any
                      defects.filter(report => report.resolved_status.toLowerCase() === 'open').length === 0 &&
                      <Card.Text>No open defects</Card.Text>
                    }
                    {
                      defectsFilter.length === 1 && defectsFilter[0] === 'resolved' && //defectfilter is ONLY resolved
                      defects.length !== 0 && //ensure it does not say no resolved defects even when user has none of any
                      defects.filter(report => report.resolved_status.toLowerCase() !== 'open').length === 0 &&
                      <Card.Text>No resolved defects</Card.Text>
                    }
                    {defects.length === 0 ? (
                      defectsFilter.length !== 0 && //ensure that on a clean slate, it does not say BOTH no defects and nothing selected
                      <Card.Text>No defects reported</Card.Text>
                    ) : (
                      defects.map(report => (
                        defectsFilter.includes(report.resolved_status.toLowerCase()) &&
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
                    {suggestions.length === 0 ? (
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
      </>
    )
  }; return null;
}

export default ReportsList;