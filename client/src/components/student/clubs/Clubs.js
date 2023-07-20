import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { facultyClubReqSend, getClub } from "../../../api/studentApi";

function Clubs() {
  const [clubList, setClubList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [student, setStudent]= useState([])
  const [club, setClub]= useState([])
  const [status, setStatus]= useState([])

  const viewClubs = async () => {
    const response = await getClub();
    setClubList(response.clubs);
    setStudent(response.student)
    setRefresh(true);
    
  };
  
  useEffect(() => {
    viewClubs()
  }, [refresh]);

  const data = useCallback(() => {
    const clubfilt = clubList.map((club) => {
      const clubStatus = status.find(
        (e) => e.studentId === student._id && e.clubId === club._id
      );
      return {
        clubId: club._id,
        clubName: club.name,
        clubFac: club.facultyName,
        clubDes: club.description,
        clubFacId: club.facultyId,
        clubStatus: clubStatus ? clubStatus.status : null,
      };
    });
    setClub(clubfilt);
  }, [clubList, status, student]);

  useEffect(() => {
    data();
  }, [data, refresh]);

const handleClubRequest=(clubId, clubName, clubFac, clubFacId)=>{
    const studentName= student.name
    const studentId= student._id
    const className= student.className

    facultyClubReqSend(studentName, studentId, className, clubId, clubName, clubFac, clubFacId)
    setRefresh(true)
}


  return (
    <div>
      <Container style={{ marginTop: "50px" }}>
        <div className="d-flex justify-content-between align-items-end mb-5">
          <h1>Club List</h1>
        
        </div>
        <Row>
          {club && club.map((data) => (
            <Col md={12} className="mb-4" key={data._id}>
              <Card className="shadow-sm" style={{ background: "#F1F6F9" }}>
                <Card.Body>
                  <Card.Title>{data.clubName}</Card.Title>
                  <Card.Text>Description :{data.clubDes}</Card.Text>
                  <Card.Text>Club Co-ordinator :{data.clubFac}</Card.Text>
                  <div className="p-3 d-flex justify-content-end">
                    <Button variant="danger" size="sm"
                    onClick={()=> handleClubRequest(data.clubId, data.clubName, data.clubFac, data.clubFacId)}
                    >
                      Send Request
                    </Button>
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
