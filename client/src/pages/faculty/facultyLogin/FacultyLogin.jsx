import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SchoolLogo from '../../../components/schoolLogo/SchoolLogo';
import Login from '../../../components/faculty/login/Login';

function FacultyLogin() {
  return (
    <div className='w-100'>
    <Row className='w-100'>
    <Col md={3} className='left d-none d-md-block'>
        <SchoolLogo/>

    </Col>
    <Col md={9} className='rightCol'>
   
      <Login/>
    </Col>
    </Row>
  </div>
  )
}

export default FacultyLogin