import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import "./Login.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const { data } = await axios.post("/student/auth/login", {
      email: values.email,
      password: values.password,
    });
    setSubmitting(false);
    if (data.err) {
    } else {
      console.log("dispatched");
      navigate("/student/");
      dispatch({ type: "refresh" });
    }
  };

  return (
    <MDBContainer fluid style={{ marginTop: "200px" }}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <MDBRow className="d-flex justify-content-center align-items-center h-100">
              <MDBCol col="12">
                <MDBCard
                  className="bg-white my-5 mx-auto"
                  style={{ borderRadius: "1rem", maxWidth: "500px" }}
                >
                  <MDBCardBody className="p-5 w-100 d-flex flex-column">
                    <h2 className="fw-bold mb-5 text-center">Student Login</h2>
                  
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                    <Field
                      as={MDBInput}
                      wrapperClass="mb-4 w-100"
                      label="Email address"
                      id="formControlLg"
                      type="email"
                      size="lg"
                      name="email"
                      required
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                    <Field
                      as={MDBInput}
                      wrapperClass="mb-4 w-100"
                      label="Password"
                      id="formControlLg"
                      type="password"
                      size="lg"
                      name="password"
                      required
                    />

                    <MDBBtn
                      size="lg"
                      disabled={isSubmitting}
                      type="submit"
                      style={{ backgroundColor: "#212A3E" }}
                    >
                      Login
                    </MDBBtn>

                    <hr className="my-4" />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </Form>
        )}
      </Formik>
    </MDBContainer>
  );
}

export default Login;
