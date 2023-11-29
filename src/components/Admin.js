import React, { useEffect, useState } from 'react';
import { Nav, Tab, Card, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './ReportsList.module.css'

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function Admin(props) {
  const { page, user } = props;
  const [tab, setTab] = useState('#defects');
  const [defects, setDefects] = useState([]);
  const [defectsFilter, setDefectsFilter] = useState(['open']);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!user) return;

    const token = getCookie('token');
    fetch(`/api/getdefectreportsall?token=${token}`)
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

    const token = getCookie('token');
    fetch(`/api/getsuggestionreportsall?token=${token}`)
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

  const handleResolveDefect = (uid) => {
    const token = getCookie('token');
    fetch(`/api/resolvedefectreport?uid=${uid}&token=${token}`)
      .then(res => {
        toast.dismiss();
        toast.success(`Defect has been resolved!`, { position: "bottom-right" });
        setDefects(defects.filter(defect => defect.uid !== uid));
      })
      .catch(err => {
        console.error(err);
        toast.dismiss();
        toast.error('Internal server error', { position: "bottom-right" });
      });
  }

  const handleUnresolveDefect = (uid) => {
    const token = getCookie('token');
    fetch(`/api/unresolvedefectreport?uid=${uid}&token=${token}`)
      .then(res => {
        toast.dismiss();
        toast.success(`Defect has been reopen!`, { position: "bottom-right" });
        setDefects(defects.filter(defect => defect.uid !== uid));
      })
      .catch(err => {
        console.error(err);
        toast.dismiss();
        toast.error('Internal server error', { position: "bottom-right" });
      });
  }

  const handleHideDefect = (uid) => {
    const token = getCookie('token');
    fetch(`/api/hidedefectreport?uid=${uid}&token=${token}`)
      .then(res => {
        toast.dismiss();
        toast.success(`Defect has been hidden!`, { position: "bottom-right" });
        setDefects(defects.filter(defect => defect.uid !== uid));
      })
      .catch(err => {
        console.error(err);
        toast.dismiss();
        toast.error('Internal server error', { position: "bottom-right" });
      });
  }

  if (page === 'admin') {
    return (
      <div className="container my-4 mx-5">
        <ToastContainer />
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
                          From: {report.school_id}<br />
                          Date Reported: {report.date}<br />
                          Category: {report.category}<br />
                          Location: {report.location}<br />
                          Description: {report.description}<br />
                        </Card.Text>
                        {(report.image_extension == null) ? null : (
                          <a className="btn btn-secondary" target="_blank" rel="noreferrer" href={`/uploads/${report.uid}${report.image_extension}`}>📸 Open Image</a>
                        )}
                        {report.resolved_status.toLowerCase() !== 'open' ? null : (
                        <Button
                          variant="primary"
                          className='mx-1'
                          onClick={() => handleResolveDefect(report.uid)}>Resolve</Button>
                        )}
                        {report.resolved_status.toLowerCase() === 'open' ? null : (
                        <Button
                          variant="primary"
                          className='mx-1'
                          onClick={() => handleUnresolveDefect(report.uid)}>Reopen</Button>
                        )}
                        {report.resolved_status.toLowerCase() === 'open' ? null : (
                        <Button
                          variant="outline-danger"
                          className='mx-1'
                          onClick={() => handleHideDefect(report.uid)}>Hide Permanently</Button>
                        )}
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
                          From: {suggestion.school_id}<br />
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