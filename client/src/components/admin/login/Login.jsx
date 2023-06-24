import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}
  from 'mdb-react-ui-kit';
import './Login.css'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errMessage, setErrMessage] = useState("")
  const dispatch = useDispatch()

  
  const validForm = () => {
    if (password.trim() === "" || email.trim() === "") {
      return false
    } else {
      return true
    }
  }
  const [loading, setLoading] = useState({ submit: false })
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading({ ...loading, submit: true })
    const { data } = await axios.post("/admin/auth/login", { email, password })
    if (data.err) {
      setErrMessage(data.message)
    } else {
      console.log("dispatched");
      navigate('/admin/')      
      dispatch({ type: "refresh" })

    }
    setLoading({ ...loading, submit: false })
  }
  return (
    <MDBContainer fluid style={{ marginTop: "200px" }}>
      <form onSubmit={handleSubmit}>
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>

            <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
              <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                <h2 className="fw-bold mb-2 text-center">Admin Login</h2>
                {
                  errMessage &&
                  <div className="login-row" style={{ justifyContent: "flex-start" }}>
                    <p className='text-danger'>{errMessage}</p>
                  </div>
                }

                <MDBInput wrapperClass='mb-4 w-100' value={email} onChange={(e) => setEmail(e.target.value)} label='Email address' id='formControlLg' type='email' size="lg" />
                <MDBInput wrapperClass='mb-4 w-100' value={password} onChange={(e) => setPassword(e.target.value)} label='Password' id='formControlLg' type='password' size="lg" />

                {/* <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Agree' /> */}

                <MDBBtn size='lg' disabled={!validForm} type='submit' style={{ backgroundColor: "#212A3E" }}>
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