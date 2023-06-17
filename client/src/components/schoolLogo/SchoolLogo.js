import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import reading from '../../assets/reading.svg'
import './SchoolLogo.css'

function SchoolLogo(){


  return (
    <div>
      
        <Row >
          <div className="main w-100">

            <Col md={3} className="w-100 vh-100 d-flex align-items-center">
            <div className="leftCol d-none d-md-block d-flex flex-column justify-content-center align-items-center">
              <div className="school-img">
                <img src={reading} alt="reading" className="img-fluid" />
              </div>
              <div className="school">SCHOOL MANAGEMENT SYSTEM</div>
            </div>
            </Col>
           
          </div>
        </Row>

      
    </div>
  )
}

export default SchoolLogo