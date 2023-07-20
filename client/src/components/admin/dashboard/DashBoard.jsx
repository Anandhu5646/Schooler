import React from "react";
import { Card } from "react-bootstrap";
import { FaUser, FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import "./DashBoard.css";


const Dashboard = ({ studentCount, facultyCount, clubCount }) => {
  return (
    <div className="dashboard-container">
      <div className="card-container1">
        <Card className="dashboard-card">
        
        
          <Card.Body className="card-body1">
         
            <div className="card-icon1">
              <FaUser />
            </div>
            <Card.Title className="card-title1">Total Students</Card.Title>
            <Card.Text className="count-text1">
              <strong>{studentCount}100</strong>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="card-container1">
        <Card className="dashboard-card">
          <Card.Body>
            <div className="card-icon1">
              <FaChalkboardTeacher />
            </div>
            <Card.Title>Total Faculty</Card.Title>
            <Card.Text className="count-text">
              <strong>{facultyCount}</strong>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="card-container1">
        <Card className="dashboard-card">
          <Card.Body>
            <div className="card-icon1">
              <FaUsers />
            </div>
            <Card.Title>Total Clubs</Card.Title>
            <Card.Text className="count-text">
              <strong>{clubCount}</strong>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
