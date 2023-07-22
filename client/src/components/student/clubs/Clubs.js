import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import {
  facultyClubReqSend,
  getClub,
  studClubStatus,
} from "../../../api/studentApi";

function Clubs() {
  const [clubList, setClubList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [student, setStudent] = useState([]);
  const [club, setClub] = useState([]);
  const [status, setStatus] = useState([]);


  const viewClubs = async () => {
    const response = await getClub();
    setClubList(response.clubs);
    setStudent(response.student);
    const stat = await studClubStatus();
    setStatus(stat);
    localStorage.setItem("status", JSON.stringify(stat));
    setRefresh(true)
  };

  useEffect(() => {
    const storedStatus = localStorage.getItem("status");
    if (storedStatus) {
      setStatus(JSON.parse(storedStatus));
    }
    viewClubs();
  }, [refresh]);

  const data = useCallback(() => {
    const clubfilt = clubList.map((club) => {
      const statusObj = Array.isArray(status)
        ? status.find(
            (e) => e.studentId === student._id && e.clubId === club._id
          )
        : null;
      return {
        clubId: club._id,
        clubName: club.name,
        clubFac: club.facultyName,
        clubDes: club.description,
        clubFacId: club.facultyId,
        status: statusObj ? statusObj.status : null,
        
      };
    });
    setClub(clubfilt);
  }, [clubList, status, student]);

  useEffect(() => {
    data();
  }, [data, refresh]);

  const handleClubRequest = async (clubId, clubName, facultyName, facultyId) => {
    const studentName = student.name;
    const studentId = student._id;
    const className = student.className;
    
    await facultyClubReqSend(
      studentName,
      studentId,
      className,
      clubId,
      clubName,
      facultyName,
      facultyId
    );

    const updatedClubList = club.map((clubItem) => {
      if (clubItem.clubId === clubId) {
        return {
          ...clubItem,
          status: "Request Send",
          requestSent: true,
        };
      } else {
        return clubItem;
      }
    });
    setClub(updatedClubList);
  };
  useEffect(() => {
    data();
  }, [status]);

  return (
    <div>
      <Container style={{ marginTop: "50px" }}>
        <div className="d-flex justify-content-between align-items-end mb-5">
          <h1>Club List</h1>
        </div>
        <Row>
          {club &&
            club.map((data, index) => (
              <Col md={12} className="mb-4" key={data._id}>
                <Card className="shadow-sm" style={{ background: "#F1F6F9" }}>
                  <Card.Body>
                    <Card.Title>{data.clubName}</Card.Title>
                    <Card.Text>Description: {data.clubDes}</Card.Text>
                    <Card.Text>Club Co-ordinator: {data.clubFac}</Card.Text>
                    <div className="p-3 d-flex justify-content-end">
                      {data.status ? (
                        <p
                          style={{
                            backgroundColor:
                              data.status === "Request Send"
                                ? "orange"
                                : data.status === "Now You are a Member"
                                ? "green"
                                : "red",
                          }}
                        >
                          {data.status}
                        </p>
                      ) : (
                         (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() =>
                              handleClubRequest(
                                data.clubId,
                                data.clubName,
                                data.clubFac,
                                data.clubFacId
                              )
                            }
                          >
                            Send Request
                          </Button>
                        )
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default Clubs;
