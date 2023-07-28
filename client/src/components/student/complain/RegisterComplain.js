import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Complain.css';
import { saveStudentComplain } from '../../../api/studentApi';
import Swal from 'sweetalert2';

const RegisterComplaint = () => {

  const [title,setTitle]=useState('')
  const [content,setContent]=useState('')
  const [errMsg,setErrmsg]=useState('')
 
const saveComplaint = async (e) => {
  e.preventDefault();
  if (title.trim() && content.trim()) {
    let response = await saveStudentComplain(title, content);
    if (response) {
      Swal.fire({
        icon: 'success',
        text: 'Complaint Sent Successfully...!!',
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
    <Container className="container-out" style={{ minHeight: '100vh' }}>
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={6} className='column'>
          <div className="text-center mb-4">
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
    </Container>
  );
};

export default RegisterComplaint;
