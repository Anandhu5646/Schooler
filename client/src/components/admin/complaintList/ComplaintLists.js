import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Accordion } from 'react-bootstrap';
import { deleteComplain, getComplaints } from '../../../api/adminApi';
import {MdDelete} from "react-icons/md";
import {  IconButton } from '@mui/material';

import Swal from 'sweetalert2';

const ComplaintLists = () => {
 
    const [complainList, setComplainList]= useState([])
    const [refresh, setRefresh] = useState(false);
   

    const fetchComplains= async()=>{
        const response= await getComplaints()
        console.log(response,'erereererere')
        setComplainList(response)
        setRefresh(true)
    }
    useEffect(()=>{
      fetchComplains()
    },[refresh])
const handleDeleteComplain=async (id)=>{
  try {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this complain. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#212A3E',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      
      await deleteComplain(id);
     
      const updatedComplainList = complainList.filter((complain) => complain._id !== id);
      setComplainList(updatedComplainList);
      Swal.fire('Deleted!', 'The club has been deleted.', 'success');
    }
  } catch (error) {
    console.error('Error:', error);
    Swal.fire('Error', 'An error occurred while deleting the club.', 'error');
  }
}

  return (
    
    <Container style={{ marginTop: "50px" }}>
      <div className="d-flex justify-content-between align-items-end mb-5">
        <h1>Check Complains</h1>
      </div>
      <Row>

        {complainList.length >0 ? complainList.map((complain) => (
          <Col md={12} className="mb-4" key={complain._id}>
            <Card className="shadow-sm" style={{ background: "#F1F6F9" }}>
              <Card.Body className="p-3 d-flex justify-content-between">
              <div className=''>

                <Card.Title>{complain.title}</Card.Title>
                <Card.Text>Complainter Name: {complain.name}</Card.Text>
                <Card.Text>Complainter Role: {complain.complainPerson}</Card.Text>
                <Card.Text>Content: {complain.content}</Card.Text>
               
              </div>
                <div >
                  
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
        )): <div>No Complaints Found</div>}
      </Row>
    </Container>
  );
};

export default ComplaintLists;