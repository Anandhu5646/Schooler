import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Accordion } from "react-bootstrap";
import { deleteComplain, getComplaints } from "../../../api/adminApi";
import { MdDelete } from "react-icons/md";
import { IconButton } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import nodata from "../../../assets/nodata.gif";
import Swal from "sweetalert2";
import "./Complaints.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ComplaintLists = () => {
  const [complainList, setComplainList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchComplains = async () => {
    const response = await getComplaints(search, currentPage);

    setComplainList(response.complaints);
    setTotal(response.total);
    setRefresh(true);
  };
  useEffect(() => {
    fetchComplains();
  }, [refresh, search, currentPage]);

  const changePage = (event, page) => {
    setCurrentPage(page);
  };

  const handleDeleteComplain = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You are about to delete this complain. This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#212A3E",
        cancelButtonColor: "red",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await deleteComplain(id);

        const updatedComplainList = complainList.filter(
          (complain) => complain._id !== id
        );
        setComplainList(updatedComplainList);
        toast.success("The student has been deleted.", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "An error occurred while deleting the club.", "error");
    }
  };

  return (
    <div className="complain-outer-container">

    <Container style={{ marginTop: "50px" }}>
      <div className=" mb-5">
        <h1>Check Complains</h1>
      </div>
      {/* ================== search bar ===================== */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search complain title..."
          className="form-control"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      {/* ===================================================== */}
      <Row>
        {complainList.length > 0 ? (
          complainList.map((complain) => (
            <Col md={12} className="mb-4" key={complain._id}>
              <Card className="shadow-sm" style={{ background: "#F1F6F9" }}>
                <Card.Body className="p-3 d-flex justify-content-between">
                  <div className="">
                    <Card.Title>{complain.title}</Card.Title>
                    <Card.Text>Complainter Name: {complain.name}</Card.Text>
                    <Card.Text>
                      Complainter Role: {complain.complainPerson}
                    </Card.Text>
                    <Card.Text>Content: {complain.content}</Card.Text>
                  </div>
                  <div>
                    <IconButton
                      type="button"
                      style={{ color: "green" }}
                      variant="success"
                      onClick={() => handleDeleteComplain(complain._id)}
                    >
                      <MdDelete />
                    </IconButton>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div>No Complaints Found</div>
        )}
      </Row>
      {complainList.length === 0 && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "300px" }}
        >
          <img src={nodata} alt="No Data" />
        </div>
      )}
      {complainList?.length > 0 ? (
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
    </Container>
    <ToastContainer />
    </div>
  );
};

export default ComplaintLists;
    