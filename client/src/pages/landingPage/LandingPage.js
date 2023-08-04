import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleAdminClick = () => {
    setLoading(true);
    navigate('/admin/login');
  };

  const handleFacultyClick = () => {
    setLoading(true);
    navigate('/faculty/login');
  };

  const handleStudentClick = () => {
    setLoading(false);
    navigate('/student/login');
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  useEffect(() => {
   
    const timeout = setTimeout(() => {
      handleImageLoad();
    }, 4000);
    return () => clearTimeout(timeout);
  }, []); 

  return (
    <>
      {loading && (
        <div className="loader">
          <div class="bar1"></div>
          <div class="bar2"></div>
          <div class="bar3"></div>
          <div class="bar4"></div>
          <div class="bar5"></div>
          <div class="bar6"></div>
        </div>
      )}
      <div className={`landing-page ${loading ? 'loading' : ''}`}>
        <Row className="w-100">
          <Col md={3} className="left d-none d-md-block">
            <SchoolLogo />
          </Col>
          <Col md={9} className="rightCol">
            <div className="right">
              <img src={landing} alt="landing" className="landing-img vh-100" onLoad={handleImageLoad} />

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
    </>
  );
}

export default LandingPage
