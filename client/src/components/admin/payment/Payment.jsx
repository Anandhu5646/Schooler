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
import {
  deletePayment,
  getPayHistory,
  getPayment,
  savePayment,
} from "../../../api/adminApi";
import './Payment.css'
import { IconButton } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import nodata from "../../../assets/nodata.gif";

function formatDateToDDMMYYYY(dateString) {
  const dateObj = new Date(dateString);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${month}/${day}/${year}`;
}

const Payment = () => {
  const [paymentList, setPaymentList] = useState([]);
  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [formValue, setFormValue] = useState({
    title: "",
    amount: "",
    lastDate: new Date().toISOString().split("T")[0],
  });
  const openHistory =async () => {
    setOpen(true);
    const response = await getPayHistory();
    
    setPaymentHistory(response);

  };
  const closeHistory = () => {
    setOpen(false);
  };
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
  const fetchPayment = async () => {
    const response = await getPayment(search);
    setPaymentList(response.payment);
    setTotal(response.total)
  };

  // ==================================================
  const changePage = (event, page) => {
    setCurrentPage(page);
  };


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
        title: "Are you sure?",
        text: "You are about to delete this payment. This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#212A3E",
        cancelButtonColor: "red",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await deletePayment(id);

        const updatedPaymentList = paymentList.filter(
          (payment) => payment._id !== id
        );
        setPaymentList(updatedPaymentList);
        setRefresh(true);
        Swal.fire("Deleted!", "The payment list has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "An error occurred while deleting the club.", "error");
    }
  };

  // ========================= payment history =======================
  
  useEffect(() => {
    fetchPayment();
    
  }, [refresh, search,currentPage]);

  return (
    <div className="payment-outer-container">
      <Container>
        <div className="d-flex justify-content-between align-items-end mb-5">
          <h1>Payment List</h1>
          <div>
            <Button className="payment-add-btn" title="Add Payment" style={{ background: "#394867" }} onClick={toggleOpenModal}>
              Add Payment
            </Button>
            <Button className="payment-history-btn" title="Payment History"
              style={{ background: "#394867", marginLeft: "5px" }}
              onClick={openHistory}
            >
              Payment history
            </Button>
          </div>
        </div>
        {/* ================== search bar ===================== */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Search payment title"
            className="form-control"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        {/* ===================================================== */}
        <Row>
          {paymentList?.length > 0 ? (
            paymentList.map((payment) => (
              <Col md={12} className="mb-4" key={payment._id}>
                <Card className="shadow-sm" style={{ background: "#F1F6F9" }}>
                  <Card.Body className="p-3 d-flex justify-content-between">
                    <div>
                      <Card.Title>{payment.title}</Card.Title>
                      <Card.Text>Amount: ₹{payment.amount}</Card.Text>
                    </div>
                    <div>
                      <IconButton
                        type="button"
                        // variant="danger"
                        onClick={() => handleDelete(payment._id)}
                        style={{ color: "green" }}
                      >
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

      {/*================== Add Payment Modal ===================*/}

      <Modal show={show} onHide={toggleCloseModal} className="payment-add-modal">
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
      {/* ======================= history ====================== */}
      <Modal show={open} onHide={closeHistory} size="lg" className="payment-history">
        <Modal.Header closeButton style={{ marginTop: "50px" }}>
          <Modal.Title>Payment History</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{overflowX:"scroll"}}>
          {paymentHistory?.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Title</th>
                  <th>Amount</th>
                  <th>Paid Date</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment, index) => (
                  <tr key={index}>
                    <td>{payment.studentId?.name}</td>
                    <td>{payment.studentId?.className}</td>
                    <td>{payment.paymentId?.title}</td>
                    <td>{payment.paymentId?.amount}</td>
                    <td>{formatDateToDDMMYYYY(payment.paidDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No Payment History Available</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeHistory}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Payment;
