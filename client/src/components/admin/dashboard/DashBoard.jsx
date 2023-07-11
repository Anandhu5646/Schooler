import React from "react";
import { Col, Card, Row } from "react-bootstrap";
import "./DashBoard.css";

const DashBoard = ({ orderCount }) => {





  
  return (
    <div style={{ width: "80%", marginLeft: "200px", marginTop: "50px" }}>
      <Row className="d-flex justify-content-between" >
        <Col md={6} lg={4}>
          <Card className="mb-4 card">
            <article className="icontext">
              <span className="icon icon-sm rounded-circle bg-success-light">
                <i className="text-success material-icons md-local_shipping"></i>
              </span>
              <div className="text">
                <h4 className="mb-1 card-title">
                  <img
                    style={{
                      width: "100px",
                      height: "80px",
                      marginRight: "20px",
                      marginTop:"10px",
                    }}
                    className="img-fluid"
                    src="https://static.vecteezy.com/system/resources/previews/000/511/962/original/vector-student-glyph-black-icon.jpg"
                    alt=""
                  />
                 Total Students
                </h4>
                <span style={{ marginLeft: "115px" }}>
                  <strong>{orderCount}10</strong> 
                </span>
              </div>
            </article>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card className="mb-4 card">
            <article className="icontext">
              <span className="icon icon-sm rounded-circle bg-success-light">
                <i className="text-success material-icons md-local_shipping"></i>
              </span>
              <div className="text">
                <h4 className="mb-1 card-title">
                  <img
                    style={{
                      width: "100px",
                      height: "80px",
                      marginRight: "20px",
                      
                      marginTop:"10px"
                    }}
                    className="img-fluid"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmiTP4daKejpHCtaOktcnWofHGcfyBMihctPgNeDUveh_aA90tmQR4fw6HnagvKL6iBng&usqp=CAU"
                    alt=""
                  />
                 Total Faculties
                </h4>
                <span style={{ marginLeft: "115px" }}>
                  <strong>{orderCount}</strong> 10
                </span>
              </div>
            </article>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card className="mb-4 card">
            <article className="icontext">
              <span className="icon icon-sm rounded-circle bg-success-light">
                <i className="text-success material-icons md-local_shipping"></i>
              </span>
              <div className="text">
                <h4 className="mb-1 card-title">
                  <img
                    style={{
                      width: "100px",
                      height: "80px",
                      marginRight: "20px",
                      marginTop:"10px"
                    }}
                    className="img-fluid"
                    src="https://cdn-icons-png.flaticon.com/128/6535/6535457.png"
                    alt=""
                  />
                 Total Clubs
                </h4>
                <span style={{ marginLeft: "115px" }}>
                  <strong>{orderCount}</strong> 10
                </span>
              </div>
            </article>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashBoard;
