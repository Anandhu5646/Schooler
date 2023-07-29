import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { deletePayment, getPayment, savePayment } from "../../../api/adminApi";
import { IconButton } from "@mui/material";

const Payment = () => {
  const [paymentList, setPaymentList] = useState([]);
  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState("");

  const [formValue, setFormValue] = useState({
    title: "",
    amount: "",
    lastDate: new Date().toISOString().split("T")[0],
  });

  const toggleOpenModal = () => {
    setShow(true);
  };

  const toggleCloseModal = () => {
    setShow(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [name]: value,
    }));
  };
// =============================== fetch payment list====================
 const fetchPayment= async()=>{
    const response= await getPayment()
    setPaymentList(response)

 }
 
  // ==================================================
  const handleAddPayment = async (event) => {
    event.preventDefault();
    try {
      if (!formValue.title || !formValue.amount) {
        setError("Please fill in all the fields.");
        return;
      }
      const paymentData = {
        ...formValue,
      };
      const response = await savePayment(paymentData);
    
      setError("");
      setRefresh(true);
      Swal.fire(
        "Payment Added!",
        "The payment details have been saved to the database.",
        "success"
      );
      
      setFormValue({ title: "", amount: "" });
      toggleCloseModal();
    } catch (error) {
      console.error("Error:", error);
      Swal.fire(
        "Error",
        "An error occurred while saving the payment details.",
        "error"
      );
    }
  };
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to delete this payment. This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#212A3E',
        cancelButtonColor: 'red',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });
  
      if (result.isConfirmed) {
        
        await deletePayment(id);
       
        const updatedPaymentList = paymentList.filter((payment) => payment._id !== id);
        setPaymentList(updatedPaymentList);
        setRefresh(true)
        Swal.fire('Deleted!', 'The payment list has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'An error occurred while deleting the club.', 'error');
    }
  };
  useEffect(()=>{
    fetchPayment()
  },[refresh])
  return (
    <div>
      <Container style={{ marginTop: "50px" }}>
        <div className="d-flex justify-content-between align-items-end mb-5">
          <h1>Payment List</h1>
          <Button style={{ background: "#394867" }} onClick={toggleOpenModal}>
            Add Payment
          </Button>
        </div>
        <Row>
          {paymentList.length > 0 ? (
            paymentList.map((payment) => (
              <Col md={12} className="mb-4" key={payment._id}>
                <Card className="shadow-sm" style={{ background: "#F1F6F9" }}>
                  <Card.Body className="p-3 d-flex justify-content-between">
                  <div>
                    <Card.Title>{payment.title}</Card.Title>
                    <Card.Text>Amount: ₹{payment.amount}</Card.Text>

                  </div>
                    <div >
                      <IconButton type="button" variant="danger"
                       onClick={() => handleDelete(payment._id)}
                       style={{color:"red"}}>
                        <MdDelete />
                      </IconButton>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <div>No Payments Found</div>
          )}
        </Row>
      </Container>

      {/*================== Add Payment Modal ===================*/}

      <Modal show={show} onHide={toggleCloseModal}>
        <Modal.Header closeButton style={{ marginTop: "50px" }}>
          <Modal.Title>Add Payment</Modal.Title>
        </Modal.Header>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Form onSubmit={handleAddPayment}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formValue.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={formValue.amount}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Payment Date</Form.Label>
              <Form.Control
                type="date"
                name="lastDate"
                value={formValue.lastDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleCloseModal}>
              Close
            </Button>
            <Button style={{ background: "#394867" }} type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Payment;
