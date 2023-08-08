import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Col, Row } from "react-bootstrap";
import "./FacultyNotice.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import nodata from "../../../assets/nodata.gif";
import { FiDownload } from "react-icons/fi";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FacultyNotice = () => {
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchNotices = async () => {
    try {
      const response = await axios.get("/faculty/notice", {
        params: { search, currentPage },
      });
      setNotices(response.data.notice);
      setTotal(response.total);
    } catch (error) {
      console.error("Error fetching notices:", error);
      setError("Error fetching notices. Please try again later.");
    }
  };

  useEffect(() => {
    fetchNotices(search, currentPage);
  }, [search, currentPage]);
  const changePage = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div className="fac-notice-outer mt-4 col-12">
      <h1>View Notices</h1>
      <hr />
      {error && <div className="alert alert-danger">{error}</div>}
      {/* ================== search bar ===================== */}
      <div className="mb-3 search-notice">
        <input
          type="text"
          placeholder="Search notice title..."
          className="form-control"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      {/* ===================================================== */}
      <Row xs={1} md={2} lg={3} xl={4} className="g-4 card-out mt-3">
        {notices.length > 0 ? (
          notices.map((notice) => (
            <Col key={notice._id}>
              <Card className="custom-card">
                <Card.Header>{notice.title}</Card.Header>
                <Card.Body>
                  <div>Download to view </div>
                </Card.Body>
                <Card.Footer>
                  <Button>
                    <a
                      href={notice.content}
                      download={`${notice.title}.pdf`}
                      style={{ color: "white" }}
                    >
                      <FiDownload />
                    </a>
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <div>
            <h6>No Notice Data</h6>
          </div>
        )}
      </Row>
      {notices.length === 0 && (
        <div
          className="d-flex justify-content-center align-items-center nodata"
          style={{ minHeight: "300px" }}
        >
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

export default FacultyNotice;
