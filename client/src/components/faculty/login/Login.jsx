import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import './Login.css'
function Login() {
  
    const [loginType, setLoginType] = useState('Faculty');
  
    const handleLoginTypeChange = (type) => {
      setLoginType(type);
    };
  return (
    <MDBContainer fluid style={{ marginTop:"200px"}}>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center">{loginType} Login</h2>
              <p className="text-white-50 mb-3">Please enter your login and password!</p>

              <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='email' size="lg"/>
              <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg"/>

              <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />

              <MDBBtn size='lg' style={{backgroundColor:"#265C5C"}}>
                Login
              </MDBBtn>

              <hr className="my-4" />

              <div className="text-center">
                <button className="btn btn-link" onClick={() => handleLoginTypeChange('Student')}>Student Login</button>
                <button className="btn btn-link" onClick={() => handleLoginTypeChange('Admin')}>Faculty Login</button>
              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Login;