import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './AdminLogin.css'
import SchoolLogo from '../../components/schoolLogo/SchoolLogo';
import Button from 'react-bootstrap/Button';

function AdminLogin() {
  return (
    <div className='w-100'>
      <Row className='w-100'>
      <Col md={3} className='left d-none d-md-block'>
          <SchoolLogo/>

      </Col>
      <Col md={9} className='rightCol'>
      <div className='box'>
      <form>
                <div className='adminlogin'><h2>Admin Login</h2></div>
                
                <div className="form-group">
                    
                    <input type="email" className="form-control" placeholder='Email' />
                </div>
                <div className="form-group">
                   
                    <input type="text" className="form-control" placeholder='Password'/>
                </div>
                <Button variant="success" className='login'>Login</Button>
            </form>
      </div>

      </Col>
      </Row>
    </div>
  )
}

export default AdminLogin