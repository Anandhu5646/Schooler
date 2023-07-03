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
import { useDispatch } from 'react-redux';
import axios from 'axios';
function Login() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [errMessage, setErrMessage]=useState("")
  const dispatch= useDispatch()
  const validForm=()=>{
    if(password.trim==="" || email.trim ===""){
      return false
    }
    return true
  }
  const [loading,setLoading]=useState("")
  const handleSubmit= async(e)=>{
    e.preventDefault()
    setLoading({...loading,submit:true})
    const {data }= await axios.post("/faculty/auth/login", {email,password})
  }
  return (
    <MDBContainer fluid style={{ marginTop:"200px"}}>
      <form onSubmit={handleSubmit}>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center">Faculty Login</h2>
              {
                  errMessage &&
                  <div className="login-row" style={{ justifyContent: "flex-start" }}>
                    <p className='text-danger'>{errMessage}</p>
                  </div>
                }
              

              <MDBInput wrapperClass='mb-4 w-100' value={email} onChange={(e)=>setEmail(e.target.value)} label='Email address' id='formControlLg' type='email' size="lg"/>
              <MDBInput wrapperClass='mb-4 w-100' value={password} onChange={(e)=>setPassword(e.target.value)} label='Password' id='formControlLg' type='password' size="lg"/>
              

              <MDBBtn size='lg' disabled={!validForm} style={{backgroundColor:"#265C5C"}}>
                Login
              </MDBBtn>
              <hr className="my-4" />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      </form>
    </MDBContainer>
  );
}

export default Login;