import React, { useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import UploadTimeTable from './UploadTimeTable';

function MakeTimeTable() {
  const [timeTableData, setTimeTableData] = useState(null);

  const handleTimeTableUpload = (data) => {
    // Set the time table data received from the UploadTimeTable component
    setTimeTableData(data);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Time Table</h1>
        </Col>
      </Row>
      {!timeTableData ? (
        <UploadTimeTable onUpload={handleTimeTableUpload} />
      ) : (
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Subject</th>
                  <th>Faculty</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>hi
                {/* Render the time table using timeTableData */}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default MakeTimeTable;
