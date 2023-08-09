import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { getPayment, saveStudPayment } from "../../../api/studentApi";
import Swal from "sweetalert2";
import './StudPayment.css'
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import nodata from "../../../assets/nodata.gif";

const StudPayment = () => {
  const [paymentList, setPaymentList] = useState([]);
  const [history,setHistory]=React.useState('')
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchPayments = async () => {
    try {
      const response = await getPayment(history,search,currentPage)
      setPaymentList(response.updatedArr);
      setTotal(response.total)
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };
  const changePage = (event, page) => {
    setCurrentPage(page);
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
  }, [history, search, currentPage]);

  return (
    <Container className="payment-out" style={{ marginTop: "50px" }}>
      <h1>Payments</h1>
      <hr />
       {/* ================== search bar ===================== */}
       <div className="mb-3">
        <input
          type="text"
          placeholder="Search title of payment..."
          className="form-control"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      {/* ===================================================== */}
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
      {paymentList.length === 0 && (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
            <img src={nodata} alt="No Data" />
          </div>
        )}
      {paymentList?.length > 0 ? (
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
  );
};

export default StudPayment;
