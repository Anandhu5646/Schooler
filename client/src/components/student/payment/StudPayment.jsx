import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const StudPayment = () => {
  const [paymentList, setPaymentList] = useState([]);

  const fetchPayments = async () => {
    try {
      const response = await axios.get("/api/payments"); // Replace this with the API endpoint to fetch payments from the server
      setPaymentList(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <Container style={{ marginTop: "50px" }}>
      <Row>
        {paymentList.length > 0 ? (
          paymentList.map((payment) => (
            <Col md={4} className="mb-4" key={payment._id}>
              <Card className="shadow-sm" style={{ background: "#F1F6F9" }}>
                <Card.Body>
                  <Card.Title>{payment.title}</Card.Title>
                  <Card.Text>Amount: ₹{payment.amount}</Card.Text>
                  <Link to={`/payment/${payment._id}`}>
                    <Button style={{ background: "#394867" }} block>
                      Pay
                    </Button>
                  </Link>
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
