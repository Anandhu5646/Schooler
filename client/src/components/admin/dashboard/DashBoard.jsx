import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { FaUser, FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import "./DashBoard.css";
import axios from "axios";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [count, setCount] = useState("");

  const getCount = async () => {
    const response = await axios.get("/admin/", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    if (response.data.success) {
      setCount(response.data);
    } else {
      Swal.fire({
        icon: "error",
        text: response.data.message,
      });
    }
  };
  useEffect(() => {
    getCount();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="card-container">
        <Card className="dashboard-card">
          <Card.Body className="card-body">
            <div className="card-icon">
              <FaUser />
            </div>
            <Card.Title className="card-title">Total Students</Card.Title>
            <Card.Text className="count-text">
              <strong>{count.student}</strong>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="card-container">
        <Card className="dashboard-card">
          <Card.Body className="card-body">
            <div className="card-icon">
              <FaChalkboardTeacher />
            </div>
            <Card.Title className="card-title">Total Faculty</Card.Title>
            <Card.Text className="count-text">
              <strong>{count.faculty}</strong>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="card-container">
        <Card className="dashboard-card">
          <Card.Body className="card-body">
            <div className="card-icon">
              <FaUsers />
            </div>
            <Card.Title className="card-title">Total Clubs</Card.Title>
            <Card.Text className="count-text">
              <strong>{count.club}</strong>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
