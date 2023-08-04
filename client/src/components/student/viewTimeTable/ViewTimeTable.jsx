import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Col, Row } from "react-bootstrap";
import { getTimeTable } from "../../../api/studentApi";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ViewTimeTable = () => {
  const [timetables, setTimetables] = useState([]);
  const [error, setError] = useState(null);

  const fetchTimeTables = async () => {
    try {
      const response = await getTimeTable()
      console.log(response, 'wertyui')
      setTimetables(response);
    } catch (error) {
      console.error("Error fetching time tables:", error);
      setError("Error fetching time tables. Please try again later.");
    }
  };

  useEffect(() => {
    fetchTimeTables();
  }, []);

  const handleDownloadPDF = (pdfUrl, title) => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `${title}.pdf`;
    link.click();
  };

  return (
    <div className="container mt-4 col-12">
      <h1>View Time Table</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <Row xs={1} md={1} lg={1} xl={1} className="g-4 card-out mt-3">
        {timetables.map((timetable) => (
          <Col key={timetable._id}>
            <Card className="shadow-sm" style={{ background: "#F1F6F9" }}>
              <Card.Body>
                <Card.Title>{timetable.title}</Card.Title>
                <Card.Text>
                  Timetable File:{" "}
                  <a href={timetable.content} download={`${timetable.title}.pdf`}>
                    Download 
                  </a>
                </Card.Text>
              
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ViewTimeTable;
