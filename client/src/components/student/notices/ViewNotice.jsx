import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "./ViewNotice.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Col, Row } from "react-bootstrap";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ViewNotice = () => {
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState(null);
  const [filteredNotice, setFilteredNotice]= useState([])

  const fetchNotices = async () => {
    try {
      const response = await axios.get("/student/notice");
      setNotices(response.data.notice);
    } catch (error) {
      console.error("Error fetching notices:", error);
      setError("Error fetching notices. Please try again later.");
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);
useEffect(()=>{
  setFilteredNotice(notices)
},[notices])
const handleSearch= (keyword)=>{
  const filteredList= notices.filter((notice)=>{
    notice.title.toLowerCase().includes(keyword)

  })
  setFilteredNotice(filteredList)
}
  const handleDownloadPDF = (pdfUrl, title) => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `${title}.pdf`;
    link.click();
  };

  return (
    <div className="container mt-4 col-12">
    <h1 >View Notices</h1>
    <hr></hr>
    {/* ================== search bar ===================== */}
    <div className="mb-3">
        <input
          type="text"
          placeholder="Search notice title"
          className="form-control"
          onChange={(e) => handleSearch(e.target.value.toLowerCase())}
        />
      </div>
{/* ===================================================== */}
    {error && <div className="alert alert-danger">{error}</div>}
    <Row xs={1} md={2} lg={3} xl={4} className="g-4 card-out mt-3">
      {filteredNotice.map((notice) => (
        <Col key={notice._id}>
          <Card className="custom-card">
            <Card.Header>{notice.title}</Card.Header>
            <Card.Body>
              <Document
                file={`data:application/pdf;base64,${notice.content}`}
                options={{ workerSrc: "/pdf.worker.js" }}
              >
                <Page pageNumber={1} />
              </Document>
            </Card.Body>
            <Card.Footer>
              <Button
                variant="primary"
                onClick={() =>
                  handleDownloadPDF(
                    `data:application/pdf;base64,${notice.content}`,
                    notice.title
                  )
                }
              >
                <i className="fas fa-download"></i> 
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
  );
};

export default ViewNotice;
