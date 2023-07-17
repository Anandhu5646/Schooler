import React from "react";
import { CCardGroup, CCard, CCardBody, CCardImage, CCardTitle, CCardText } from "@coreui/react";
import reactImage from "/images/react.jpg";

const Dashboard = ({ totalStudents, totalClubs, totalFaculty }) => {
  return (
    <CCardGroup>
      <CCard>
        <CCardImage orientation="top" src={reactImage} />
        <CCardBody>
          <CCardTitle>Total Students</CCardTitle>
          <CCardText>
            This is a wider card with supporting text below as a natural lead-in to additional content.
            This content is a little bit longer.
          </CCardText>
          <CCardText>
            <small className="text-medium-emphasis">Last updated 3 mins ago</small>
          </CCardText>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardImage orientation="top" src={reactImage} />
        <CCardBody>
          <CCardTitle>Total Clubs</CCardTitle>
          <CCardText>
            This card has supporting text below as a natural lead-in to additional content.
          </CCardText>
          <CCardText>
            <small className="text-medium-emphasis">Last updated 3 mins ago</small>
          </CCardText>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardImage orientation="top" src={reactImage} />
        <CCardBody>
          <CCardTitle>Total Faculty</CCardTitle>
          <CCardText>
            This is a wider card with supporting text below as a natural lead-in to additional content.
            This card has even longer content than the first to show that equal height action.
          </CCardText>
          <CCardText>
            <small className="text-medium-emphasis">Last updated 3 mins ago</small>
          </CCardText>
        </CCardBody>
      </CCard>
    </CCardGroup>
  );
};

export default Dashboard;
