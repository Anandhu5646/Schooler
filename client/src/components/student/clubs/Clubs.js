import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import {
  facultyClubReqSend,
  getClub,
  studClubStatus,
} from "../../../api/studentApi";
import './Clubs.css'
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import nodata from "../../../assets/nodata.gif";

function Clubs() {
  const [clubList, setClubList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [student, setStudent] = useState([]);
  const [club, setClub] = useState([]);
  const [status, setStatus] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);


  const viewClubs = async () => {
    const response = await getClub(search,currentPage);
    setClubList(response.clubs);
    setStudent(response.student);
    setTotal(response.total)
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
  }, [refresh,search,currentPage]);

  const changePage = (event, page) => {
    setCurrentPage(page);
  };

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
          <hr></hr>
        </div>
        {/* ================== search bar ===================== */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search club name"
          className="form-control"
          onChange={(e) =>setSearch(e.target.value.toLowerCase())}
        />
      </div>
{/* ===================================================== */}
        <Row> 
          {club &&
            club.map((data, index) => (
              <Col md={12} className="mb-4 column1 " key={data._id}>
                <Card className="shadow-sm card-column" >
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
                                ? "limegreen"
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
      {club.length === 0 && (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
            <img src={nodata} alt="No Data" />
          </div>
        )}
      {club?.length > 0 ? (
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
    </div>
  );
}

export default Clubs;
