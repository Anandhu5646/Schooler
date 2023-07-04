import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import FacultyLogin from '../pages/faculty/facultyLogin/FacultyLogin';
import FacultyProfile from '../pages/faculty/facultyHome/FacultyProfile';

function FacultyRoute() {
  const { faculty, refresh } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      let { data } = await axios.get("/faculty/auth/check");
      dispatch({
        type: "faculty",
        payload: { login: data?.loggedIn, details: data?.faculty },
      });
    })();
  }, [refresh]);
  return (
    <Routes>
        <>
          {faculty.login && <Route path="/" element={<FacultyProfile/>} />}
          {faculty.login === false && <Route path="/" element={<FacultyLogin />} />}
  
          {/* <Route path="/faculty" element={<AdminFaculty  />} />
          <Route path="/student" element={<AdminStudent />} />
          <Route path="/club" element={<AdminClub />} />
          <Route path="/classes" element={<AdminClass />} />
          <Route path="/subjects" element={<AdminSubject />} />
          <Route path="/logout" element={<Navigate to="/" />} /> */}
  
          {faculty.login === false && <Route path="/login" element={<FacultyLogin />} />}
          {/* {faculty.login && <Route path="/login" element={<Navigate to="/admin/" />} />} */}
        </>
      </Routes> 
  )
}

export default FacultyRoute