import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

function FacClubReq() {
  const [clubRequests, setClubRequests] = useState([]);

  // Fetch student club requests from the backend API
  useEffect(() => {
    // Replace the API call below with the actual API endpoint to fetch student club requests
    fetch("API_ENDPOINT_TO_FETCH_CLUB_REQUESTS")
      .then((response) => response.json())
      .then((data) => setClubRequests(data))
      .catch((error) => console.error("Error fetching club requests:", error));
  }, []);

  // Function to handle accepting or rejecting a club request
  const handleClubRequest = (clubRequest, isAccepted) => {
    // Implement the logic to accept or reject the club request
    // You can make an API call to update the status in the backend

    // For demonstration purposes, let's update the status directly in the frontend
    const updatedClubRequests = clubRequests.map((request) =>
      request.id === clubRequest.id ? { ...request, status: isAccepted ? "Accepted" : "Rejected" } : request
    );
    setClubRequests(updatedClubRequests);
  };

  return (
    <div>
      <h1>Student Club Requests</h1>
      {clubRequests.map((clubRequest) => (
        <Card key={clubRequest.id} className="mb-4">
          <Card.Body>
            <Card.Title>{clubRequest.studentName}</Card.Title>
            <Card.Text>Class: {clubRequest.studentClass}</Card.Text>
            <Card.Text>Club Name: {clubRequest.clubName}</Card.Text>
            <Card.Text>Status: {clubRequest.status}</Card.Text>
            <div className="d-flex justify-content-end">
              <Button variant="success" className="me-2" onClick={() => handleClubRequest(clubRequest, true)}>
                Accept
              </Button>
              <Button variant="danger" onClick={() => handleClubRequest(clubRequest, false)}>
                Reject
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default FacClubReq;
