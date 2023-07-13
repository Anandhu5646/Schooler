import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import landing from '../../assets/landing1.jpg';
import studentlogo from '../../assets/studentlogo.png';
import adminlogo from '../../assets/adminlogo.png';
import teacherlogo from '../../assets/teacherlogo.png';
import SchoolLogo from '../../components/schoolLogo/SchoolLogo';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/admin/login');
  };
  const handleFacultyClick = () => {
    navigate('/faculty/login');
  };
  const handleStudentClick = () => {
    navigate('/student/login');
  };

  return (
    <div className="landing-page">
      <Row className="w-100">
        <Col md={3} className="left d-none d-md-block">
          <SchoolLogo />
        </Col>
        <Col md={9} className="rightCol">
          <div className="right">
            <img src={landing} alt="landing" className="landing-img vh-100" />

            <div className="contents-1">
              <h1>Welcome To Smart School System</h1>
            </div>

            <div className="buttons-container">
              <button onClick={handleAdminClick} className="contents-2">
                <img src={adminlogo} alt="" className="adminlogo" />
                <h2>Admin Login</h2>
              </button>

              <button onClick={handleFacultyClick} className="contents-3">
                <img src={teacherlogo} alt="" className="facultylogo" />
                <h2>Faculty Login</h2>
              </button>

              <button onClick={handleStudentClick} className="contents-4">
                <img src={studentlogo} alt="" className="studlogo" />
                <h2>Student Login</h2>
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default LandingPage;
