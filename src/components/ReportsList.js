import React, { useEffect, useState } from 'react';
import { Nav, Tab, Card } from 'react-bootstrap';

function ReportsList(props) {
    const { page, user } = props;
    const [tab, setTab] = useState('#defects');
    const [defects, setDefects] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:2000/getdefectreports?username=${user}`)
            .then(res => res.json())
            .then(data => setDefects(data))
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
                                    <Card.Title>Submitted Suggestions</Card.Title>
                                    <Card.Text>Content for the Suggestions tab goes here.</Card.Text>
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