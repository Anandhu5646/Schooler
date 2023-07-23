import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Badge, IconButton } from "@mui/material";
import styled from "styled-components";
import { FacClubReqUpdated, getStudClubReq } from "../../../api/facultyApi";
import { MdDone, MdDelete, MdCancel } from "react-icons/md";
import Swal from "sweetalert2";

const StyledTableRow = styled.tr`
  &:nth-of-type(even) {
    background-color: #f2f2f2;
  }
`;

function FacClubReq() {
  const [requests, setRequests] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [status, setStatus] = useState("");

  const fetchClubReq = async () => {
    const response = await getStudClubReq();
    setRequests(response);
    setRefresh(true);
  };
 
  // ==================================================

  const Accept = "Now You are a Member";
  const Reject = "Request Send";

  const handleActions = async (id, status) => {
    let response = await FacClubReqUpdated(id, status);
    if (response) {
      Swal.fire({
        icon: "success",
        text: status === "Now You are a Member" ? "Request Accepted" : status,
      });
    }
    setStatus(status);
  };

  const handleDelete = async () => {
    console.log("delete");
    setRefresh(true);
  };



  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case "Now You are a Member":
        return "limegreen";
      case "Request Send":
        return "orange";
      default:
        return "inherit";
    }
  
  };
  useEffect(() => {
    fetchClubReq();
  }, [refresh, status]);
  return (
    <div style={{ marginTop: "50px", width: "90%", marginLeft: "100px" }}>
      <div className="d-flex justify-content-between mb-3">
        <h2>Club Join Requests</h2>
      </div>
      <hr></hr>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th
              style={{
                fontWeight: "bold",
                backgroundColor: "black",
                color: "white",
              }}
            >
              Student Name
            </th>
            <th
              style={{
                fontWeight: "bold",
                backgroundColor: "black",
                color: "white",
              }}
            >
              Class
            </th>
            <th
              style={{
                fontWeight: "bold",
                backgroundColor: "black",
                color: "white",
              }}
            >
              Club Name
            </th>
            <th
              style={{
                fontWeight: "bold",
                backgroundColor: "black",
                color: "white",
              }}
            >
              Status
            </th>
            <th
              style={{
                fontWeight: "bold",
                backgroundColor: "black",
                color: "white",
              }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((club, index) => (
              <StyledTableRow key={index}>
                <td>{club.studentName}</td>
                <td>{club.className}</td>
                <td>{club.clubName}</td>
                <td style={{ backgroundColor: getStatusBackgroundColor(club.status) }}>
                  {club.status === "Now You are a Member"
                    ? "Request Accepted"
                    : club.status === "Request Send"
                    ? "Requested"
                    : club.status}
                </td>
                <td>
                  {club.status === "Now You are a Member" ? (
                    <IconButton
                      type="button"
                      style={{ color: "red" }}
                      variant="danger"
                      onClick={() => handleActions(club._id, Reject)}
                    >
                      <MdCancel />
                    </IconButton>
                  ) : club.status === "Request Send" ? (
                    <IconButton
                      type="button"
                      style={{ color: "green" }}
                      variant="success"
                      onClick={() => handleActions(club._id, Accept)}
                    >
                      <MdDone />
                    </IconButton>
                  ) : (
                    <>
                      <IconButton
                        type="button"
                        style={{ color: "green" }}
                        variant="success"
                        onClick={() => handleActions(club._id, Accept)}
                      >
                        <MdDone />
                      </IconButton>{" "}
                      <IconButton
                        style={{ color: "red" }}
                        variant="danger"
                        type="button"
                        onClick={() => handleActions(club._id, Reject)}
                      >
                        <MdCancel />
                      </IconButton>
                    </>
                  )}
                  <IconButton
                    aria-label="delete"
                    type="button"
                    onClick={() => handleDelete(club._id)}
                  >
                    <MdDelete />
                  </IconButton>
                </td>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <td colSpan="6">No Requests</td>
            </StyledTableRow>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default FacClubReq;
