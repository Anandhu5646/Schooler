import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import StudentProfile from '../pages/student/studentProfile/StudentProfile';
import StudentLogin from '../pages/student/studentLogin/StudentLogin';
import StudAttendance from '../pages/student/studAttendance/StudAttendance';

function StudentRoute() {
  const { student, refresh } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      let { data } = await axios.get("/student/auth/check");
      dispatch({
        type: "student",
        payload: { login: data?.loggedIn, details: data?.student },
      });
    })();
  }, [refresh]);
  return (
    <Routes>
        <>
          {student.login && <Route path="/" element={<StudentProfile/>} />}
          {student.login === false && <Route path="/" element={<StudentLogin/>} />}
  
          <Route path="/attendance" element={<StudAttendance/>} />
          {/* <Route path="/result" element={<AdminStudent />} /> */}
          {/* <Route path="/club" element={<AdminClub />} />
          <Route path="/classes" element={<AdminClass />} />
          <Route path="/subjects" element={<AdminSubject />} />
          <Route path="/logout" element={<Navigate to="/" />} /> */}
  
          {student.login === false && <Route path="/login" element={<studentLogin />} />}
          {student.login && <Route path="/login" element={<Navigate to="/student/" />} />}
        </>
      </Routes> 
  )
}

export default StudentRoute