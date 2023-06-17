import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import landing from '../../assets/landingpage.jpg'
import studentlogo from '../../assets/studentlogo.png'
import adminlogo from '../../assets/adminlogo.png'
import teacherlogo from '../../assets/teacherlogo.png'
import SchoolLogo from '../../components/schoolLogo/SchoolLogo'
import './LandingPage.css'


function LandingPage() {
  return (
    <div className="landing-page w-100">
      <Row className='w-100' >
      <Col md={3} className='left d-none d-md-block'>
          <SchoolLogo/>

      </Col>
          <Col md={9} className='rightCol'>
          <div className='right'>

            <img src={landing} alt="landing" className='landing-img vh-100'/>
            
            <div className='contents-1'><h1 > WELCOME TO SMART SCHOOL SYSTEM</h1></div>
            <div className='contents-2'><h2 ><img src={adminlogo} alt="" className='adminlogo' /> Admin Login</h2></div>
            <div className='contents-3'><h2 ><img src={teacherlogo} alt="" className='facultylogo' /> Faculty Login</h2></div>
            <div className='contents-4'><h2 ><img src={studentlogo} alt="" className='studlogo' /> Student Login</h2></div>
            
         
           </div>
          </Col>
          
        </Row>

    </div>
  )
}

export default LandingPage