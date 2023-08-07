import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import {  pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "./ViewNotice.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Col, Row } from "react-bootstrap";
import { FiDownload } from "react-icons/fi";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import nodata from "../../../assets/nodata.gif";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ViewNotice = () => {
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch]= useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchNotices = async (search) => {
    try {
      const response = await axios.get("/student/notice", {params:{search,currentPage}});
      setNotices(response.data.notice);
      setTotal(response.data.total)
    } catch (error) {
      console.error("Error fetching notices:", error);
      setError("Error fetching notices. Please try again later.");
    }
  };
  const changePage = (event, page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    fetchNotices(search,currentPage);
  }, [search,currentPage]);


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
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
{/* ===================================================== */}
    {error && <div className="alert alert-danger">{error}</div>}
    <Row xs={1} md={2} lg={3} xl={4} className="g-4 card-out mt-3">
      {notices.map((notice) => (
        <Col key={notice._id}>
          <Card className="custom-card">
            <Card.Header>{notice.title}</Card.Header>
            <Card.Body>
             <div>Download to view </div>
            </Card.Body>
            <Card.Footer>
              <Button>
                 <a href={notice.content} download={`${notice.title}.pdf`}
                 style={{color:'white' }}>
                   <FiDownload/>
                  </a>
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
    {notices.length === 0 && (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
            <img src={nodata} alt="No Data" />
          </div>
        )}
      {notices?.length > 0 ? (
        <div>
          <Stack spacing={2}>
            <div className="d-flex justify-content-center mt-3">
              <Pagination
                count={total}
                page={currentPage}
                onChange={changePage}
                shape="rounded"
              />
            </div>
          </Stack>
        </div>
      ) : (
        ""
      )}

  </div>
  );
};

export default ViewNotice;
