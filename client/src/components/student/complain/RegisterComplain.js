import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Complain.css';
import { saveStudentComplain } from '../../../api/studentApi';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const RegisterComplaint = () => {

  const [title,setTitle]=useState('')
  const [content,setContent]=useState('')
  const [errMsg,setErrmsg]=useState('')
 
const saveComplaint = async (e) => {
  e.preventDefault();
  if (title.trim() && content.trim()) {
    let response = await saveStudentComplain(title, content);
    if (response) {
      toast.success("Complaint registered successfully", {
        autoClose: 2000, 
      });
      setContent('');
      setTitle('');
      setErrmsg('');
    }
  } else {
    setErrmsg('Please fill all the fields');
  }
};


  return (
    <Container className="stud-complain-outer" style={{ minHeight: '100vh' }}>
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={6} className='column'>
          <div className="text-center mb-4  heading">
            <h1>Register Complaint</h1>
          </div>
          <Form onSubmit={saveComplaint}>
          <p style={{color:"red"}}>{errMsg}</p>
            <Form.Group controlId="complaintTitle" className="form-field">
              <Form.Label>Complaint Title:</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title} onChange={(e)=>setTitle(e.target.value)} 
                required
              />
            </Form.Group>
            <Form.Group controlId="complaintContent" className="form-field mt-2">
              <Form.Label>Complaint Content:</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="content"
                value={content} onChange={(e)=>setContent(e.target.value)}
                required
              />
            </Form.Group>
            <div className="text-center mt-4 submit-btn">
              <Button type="submit" style={{ background: "#212A3E" }}>
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default RegisterComplaint;
