import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';
import './Login.css'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState({ submit: false });

  const validForm = () => {
    return email.trim() !== "" && password.trim() !== "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validForm()) {
      setErrMessage("Please fill all the fields.");
      return;
    }

    setLoading({ ...loading, submit: true });
    const { data } = await axios.post("/faculty/auth/login", { email, password });

    if (data.err) {
      setErrMessage(data.message);
    } else {
      console.log("dispatched");
      navigate('/faculty/');
      dispatch({ type: "refresh" });
    }

    setLoading({ ...loading, submit: false });
  };

  return (
    <MDBContainer fluid style={{ marginTop: "200px" }}>
      <form onSubmit={handleSubmit}>
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>
            <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
              <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                <h2 className="fw-bold mb-5 text-center">Faculty Login</h2>
                {errMessage && (
                  <div className="login-row" style={{ justifyContent: "flex-start" }}>
                    <p className='text-danger'>{errMessage}</p>
                  </div>
                )}

                <MDBInput wrapperClass='mb-4 w-100' value={email} onChange={(e) => setEmail(e.target.value)} label='Email address' id='formControlLg' type='email' size="lg" required />
                <MDBInput wrapperClass='mb-4 w-100' value={password} onChange={(e) => setPassword(e.target.value)} label='Password' id='formControlLg' type='password' size="lg" required />

                <MDBBtn size='lg' disabled={!validForm()} type='submit' style={{ backgroundColor: "#212A3E" }}>
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
