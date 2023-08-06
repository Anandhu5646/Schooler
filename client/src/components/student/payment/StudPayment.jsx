import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { getPayment, saveStudPayment } from "../../../api/studentApi";
import Swal from "sweetalert2";
import './StudPayment.css'

const StudPayment = () => {
  const [paymentList, setPaymentList] = useState([]);
  const [history,setHistory]=React.useState('')

  const fetchPayments = async () => {
    try {
      const response = await getPayment(history)
      setPaymentList(response);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  const handlePayment = async (title, amount, id) => {
   
    let response = await saveStudPayment(title, amount, id)
   
    if (!response) {
      Swal.fire({
        icon: 'error',
        text: 'Payment Gateway error..! Try again',
      });
    } else {
      setHistory(response.id)
      window.location.href = response.url
    }
  }

  useEffect(() => {
    fetchPayments();
  }, [history]);

  return (
    <Container style={{ marginTop: "50px" }}>
      <h1>Payments</h1>
      <hr />
      <Row>
        {paymentList?.length > 0 ? (
          paymentList.map((payment) => (
            <Col md={4} className="mb-4 "  key={payment._id}>
              <Card className="shadow-sm card-outt" style={{ background: "#F1F6F9" }}>
                <Card.Img
                  variant="top"
                  src="https://www.lyra.com/in/wp-content/uploads/sites/8/2019/05/2-4.png"
                  style={{ height: '200px' }}
                />
                <Card.Body>
                  <Card.Title>{payment.title}</Card.Title>
                  <Card.Text>Amount: ₹{payment.amount}</Card.Text>
                  {payment.status === 'true' ? (
                    <div style={{ backgroundColor: 'green', color: 'white' }}>
                      Payment completed
                    </div>
                  ) : payment.status === 'false' ? (
                    <div style={{ backgroundColor: 'red', color: 'white' }}>
                      Payment failed
                    </div>
                  ) : (
                    <Button onClick={() => handlePayment(payment.title, payment.amount, payment._id)} variant="primary">
                      Pay
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div>No Payments Found</div>
        )}
      </Row>
    </Container>
  );
};

export default StudPayment;
