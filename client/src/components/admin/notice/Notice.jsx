import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import './Notice.css';
import Swal from "sweetalert2";

const Notice = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errMsg, setErrMsg] = useState(""); 

  const handleSubmit = async (e) => {
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
          "/admin/saveNotice",
          { title, content: base64String }, 
          { headers: { "Content-Type": "application/json" }, withCredentials: true }
        )
        .then(response => {
          if (response.data.success) {
            Swal.fire({
              icon: "success",
              text: "Notice uploaded successfully"
            });
          } else {
            Swal.fire({
              icon: "error",
              text: "Something went wrong"
            });
          }
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
    } catch (error) {
      setErrMsg("An error occurred while processing your request.");
    }
  };

  return (
    <div className="outer-container" style={{ width: "80%", marginLeft: "200px", marginTop: "50px" }}>
      <h1 className="mb-2">Upload Notice</h1>
      <hr></hr>
      {errMsg && <div style={{ color: "red" }}>{errMsg}</div>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </Form.Group>

        <Form.Group className="mt-2" controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            type="file"
            accept=".pdf"
            onChange={(e) => setContent(e.target.files[0])}
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
    </div>
  );
};

export default Notice;
