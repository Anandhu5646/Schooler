import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import FacultyLogin from '../pages/faculty/facultyLogin/FacultyLogin';
import FacultyProfile from '../pages/faculty/facultyHome/FacultyProfile';
import FacMarkAttendance from '../pages/faculty/facultyAttendance/FacMarkAttendance';
import FacMarkUpload from '../pages/faculty/facultyMarkUpload/FacMarkUpload';
import FacultyClubReq from '../pages/faculty/facultyClubReq/FacultyClubReq';
import ProtectedFacultyRoute from '../utils/ProtectedFacultyRoute';
import FacultyComplain from '../pages/faculty/facultyComplain/FacultyComplain';

function FacultyRoute() {
  const { faculty, refresh } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      try {
        let { data } = await axios.get("/faculty/auth/check");
        dispatch({
          type: "faculty",
          payload: { login: data?.loggedIn, details: data?.faculty },
        });
      } catch (error) {
        console.error("Error fetching faculty data:", error);
      }
    })();
  }, [dispatch, refresh]);

  return (
    <Routes>
      {faculty?.login === false && <Route path="/login" element={<FacultyLogin />} />}
      {faculty?.login === false && <Route path="/" element={<FacultyLogin />} />}
      {faculty?.login && <Route path="/login" element={<Navigate to="/faculty/" />} />}
  
      {faculty !== undefined && (
        <Route element={<ProtectedFacultyRoute faculty={faculty} />}>
          <Route index element={<FacultyProfile />} />
          <Route path="/attendance" element={<FacMarkAttendance />} />
          <Route path="/mark" element={<FacMarkUpload />} />
          <Route path="/clubReq" element={<FacultyClubReq />} />
          <Route path="/complain" element={<FacultyComplain />} />
        </Route>
      )}
    </Routes>
  );
}

export default FacultyRoute;