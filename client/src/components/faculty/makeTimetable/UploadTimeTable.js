import React, { useState } from 'react';
import Papa from 'papaparse';
import { Container, Row, Col, Form } from 'react-bootstrap';

function UploadTimeTable({ onUpload }) {
  const [csvData, setCsvData] = useState(null);

  const handleFileUpload = (file) => {
    Papa.parse(file, {
      complete: (result) => {
        setCsvData(result.data);
      },
    });
  };

  const handleUpload = () => {
    // Process the CSV data and create the time table data structure
    // Example: { "Monday": [...], "Tuesday": [...], ... }
    const timeTableData = {}; // Your logic to process CSV data and create the time table data structure

    onUpload(timeTableData); // Pass the time table data to the parent component
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Upload Time Table</h1>
          <Form>
            <Form.Group>
              <Form.File
                id="csvFile"
                label="Upload CSV file"
                onChange={(e) => handleFileUpload(e.target.files[0])}
              />
            </Form.Group>
          </Form>
          <button onClick={handleUpload} disabled={!csvData}>
            Generate Time Table
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default UploadTimeTable;
