import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Modal, Form } from "react-bootstrap";
import {
  fetchNoticeList,
  deleNotice,
} from "../../../api/adminApi";
import Swal from "sweetalert2";
import { IconButton } from "@mui/material";
import { MdDelete } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import nodata from "../../../assets/nodata.gif";
import axios from "axios";

const NoticeList = () => {
  const [noticeList, setNoticeList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchNoticeData = async () => {
    try {
      const notices = await fetchNoticeList(search, currentPage);
      setNoticeList(notices.notice);
      setTotal(notices.total);
    } catch (err) {
      console.error("Error:", err);
    }
  };
  useEffect(() => {
    fetchNoticeData();
  }, [refresh, search, currentPage]);


  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === "" || content === null) {
      setErrMsg("Please fill in all the fields.");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;

        axios
          .post(
            "/admin/saveNotice",
            { title, content: base64String },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          )
          .then((response) => {
            if (response.data.success) {
              console.log('qqqqqqqqqqqqqqqqqqqqqq')
              Swal.fire({
                icon: "success",
                text: "Notice uploaded successfully",
              });
              setContent(null);
              setTitle("");
              toggleModal()
            } else {
              Swal.fire({
                icon: "error",
                text: "Something went wrong",
              });
            }
          })
          .catch((error) => {  
            if (
              error.response &&
              error.response.data &&
              error.response.data.message
            ) {
              setErrMsg(error.response.data.message);
            } else {
              setErrMsg("An error occurred while processing your request.");
            }
          });
      };

      if (content) {
        reader.readAsDataURL(content);
      }
    } catch (error) {
      setErrMsg("An error occurred while processing your request.");
    }
  };

  const handleDeleteNotice = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You are about to delete this notice. This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#212A3E",
        cancelButtonColor: "red",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await deleNotice(id);
        const updatedNoticeList = noticeList.filter(
          (notice) => notice._id !== id
        );
        setNoticeList(updatedNoticeList);
        Swal.fire("Deleted!", "The notice has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire(
        "Error",
        "An error occurred while deleting the notice.",
        "error"
      );
    }
  };

 

  const changePage = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <div className="d-flex justify-content-between align-items-end mb-5">
        <h1>Notice</h1>
        <Button style={{ background: "#394867" }} onClick={toggleModal}>
          Add Notice
        </Button>
      </div>
      {/* ===================search bar========================= */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search notice title..."
          className="form-control"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      {/* ========================================================= */}
      <Row>
        {noticeList.length > 0 ? (
          noticeList.map((notice) => (
            <Col md={12} className="mb-4" key={notice._id}>
              <Card className="shadow-sm" style={{ background: "#F1F6F9" }}>
                <Card.Body>
                  <Card.Title>{notice.title}</Card.Title>
                  <Card.Text>
                    <a href={notice.fileURL} target="_blank" rel="noreferrer">
                      View Notice
                    </a>
                  </Card.Text>
                  <div className="p-3 d-flex justify-content-end">
                    <IconButton
                      type="button"
                      style={{ color: "red" }}
                      variant="success"
                      onClick={() => handleDeleteNotice(notice._id)}
                    >
                      <MdDelete />
                    </IconButton>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div className="d-flex justify-content-center">
            <img src={nodata} alt="No Data"></img>
          </div>
        )}
      </Row>
      {noticeList?.length > 0 ? (
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

      {/* =========================== add notice modal ========================== */}
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton style={{ marginTop: "50px" }}>
          <Modal.Title>Add Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Notice Title</Form.Label>
              <Form.Control
                value={title}
                type="text"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload Notice</Form.Label>
              <Form.Control
                type="file"
                name="content"
                onChange={(e) => setContent(e.target.files[0])}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end mt-4">
          <Button style={{ background: "#394867"  }} type="submit" >
            Save
          </Button>

            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
         
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NoticeList;
