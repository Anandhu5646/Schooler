import { IconButton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { deleteTimeTable } from "../../../api/facultyApi";


function UploadTimeTable() {
  const [timetables, setTimetables] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(null);
  const [errMsg, setErrMsg] = useState(""); 
  const [refresh, setRefresh]= useState(false)


  const fetchTimeTable=async()=>{
    const response= await axios.get("/faculty/timeTable")
    if(response.data.success){
      setTimetables(response.data.timetable)

    }else{
     Swal.fire({
      icon:"error",
      text:"Failed to fetch time table"
     })
    }
  }

  const toggleOpenModal = () => {
    setShowModal(true);
  };
const toggleCloseModal=()=>{
  setShowModal(false)
}
// ============================= add timetable ================
  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (title.trim() === "" || content === null) {
      setErrMsg("Please fill in all the fields.");
      return;
    }
    try {
     
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        axios.post(
          "/faculty/saveTimeTable",
          { title, content: base64String }, 
          { headers: { "Content-Type": "application/json" }, withCredentials: true }
        )
        .then(response => {
          if (response.data.success) {
     
            Swal.fire({
              icon: "success",
              text: "Time table uploaded successfully"
            });
          } else {
            Swal.fire({
              icon: "error",
              text: "Something went wrong"
            });
          }
          setRefresh(true)
          setContent(null)
          setTitle("")
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.message) {
            setErrMsg(error.response.data.message);
          } else {
            setErrMsg("An error occurred while processing your request.");
          }
        });
      };

      
      if (content) {
        reader.readAsDataURL(content);
      }
      toggleCloseModal();
    } catch (error) {
      setErrMsg("An error occurred while processing your request.");
    }
   
  };
// ===============================================================
useEffect(()=>{
  fetchTimeTable()
},[refresh])


const handleDeleteTimetable = async (id) => {
  try {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this timetable. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#212A3E',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      
      await deleteTimeTable(id);
     
      const updatedTimeTableList = timetables.filter((timeTable) => timeTable._id !== id);
      setTimetables(updatedTimeTableList);
      Swal.fire('Deleted!', 'The club has been deleted.', 'success');
    }
  } catch (error) {
    console.error('Error:', error);
    Swal.fire('Error', 'An error occurred while deleting the club.', 'error');
  }
};
const handleDownloadPDF = (pdfUrl, title) => {
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = `${title}.pdf`;
  link.click();
};
  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <div className="d-flex justify-content-between align-items-end mb-5">
        <h1>Timetable List</h1>
        <Button style={{ background: "#394867" }} onClick={toggleOpenModal}>
          Add Timetable
        </Button>
      </div>
      <Row>
        {timetables.length > 0 ? (
          timetables.map((timetable) => (
            <Col md={12} className="mb-4" key={timetable._id}>
              <Card className="shadow-sm" style={{ background: "#F1F6F9" }}>
                <Card.Body>
                  <Card.Title>{timetable.title}</Card.Title>
                  <Card.Text>
                    Timetable File:{" "}
                    <a
                      href={timetable.content}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                  handleDownloadPDF(
                    `data:application/pdf;base64,${timetable.content}`,timetable.title
                  )
                }
                    >
                      Download Timetable
                    </a>
                  </Card.Text>
                  <div className="p-3 d-flex justify-content-end">
                  <IconButton
                    variant="success"
                    style={{ color: "red" }}
                    onClick={() => handleDeleteTimetable(timetable._id)}
                  >
                    <MdDelete />
                  </IconButton>
                </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          
          <Col md={12} className="mb-4">
            <Card className="shadow-sm" style={{ background: "#F1F6F9" }}>
              <Card.Body>
                <Card.Text>No time tables created.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      {/*============== Modal for uploading a new timetable =================*/}

      <Modal show={showModal} onHide={toggleCloseModal}>
        <Modal.Header closeButton style={{ marginTop: "50px" }}>
          <Modal.Title>Upload Timetable</Modal.Title>
        </Modal.Header>
        {errMsg && <div style={{ color: "red" }}>{errMsg}</div>}
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                required
              />
            </Form.Group>

            <Form.Group className="mt-2" controlId="content">
              <Form.Label>Upload Timetable (PDF)</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf"
                onChange={(e) => setContent(e.target.files[0])}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              style={{ background: "#394867", marginTop: "20px" }}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UploadTimeTable;
