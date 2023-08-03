import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import StudentProfile from "../pages/student/studentProfile/StudentProfile";
import StudentLogin from "../pages/student/studentLogin/StudentLogin";
import StudAttendance from "../pages/student/studAttendance/StudAttendance";
import StudResult from "../pages/student/studResult/StudResult";
import StudentClubs from "../pages/student/studentClubs/StudentClubs";
import ProtectedStudentRoute from "../utils/ProtectedStudentRoute";
import StudentComplain from "../pages/student/studentComplain/StudentComplain";
import StudentNotice from "../pages/student/studentNotice/StudentNotice";
import StudentPayment from "../pages/student/studentPayment/StudentPayment";
import StudentViewTimeTable from "../pages/student/studentViewTimeTable/StudentViewTimeTable";

function StudentRoute() {
  const { student, refresh } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      try {
        let { data } = await axios.get("/student/auth/check");
        dispatch({
          type: "student",
          payload: { login: data?.loggedIn, details: data?.student },
        });
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    })();
  }, [dispatch, refresh]);

  return (
    <Routes>
      {student?.login === false && <Route path="/login" element={<StudentLogin />} />}
      {student?.login === false && <Route path="/" element={<StudentLogin />} />}
      {student?.login && <Route path="/login" element={<Navigate to="/student/" />} />}
  
      <Route element={<ProtectedStudentRoute student={student} />}>
        <Route index element={<StudentProfile />} />
        <Route path="/attendance" element={<StudAttendance />} />
        <Route path="/mark" element={<StudResult />} />
        <Route path="/clubs" element={<StudentClubs />} />
        <Route path="/complain" element={<StudentComplain />} />
        <Route path="/timeTable" element={<StudentViewTimeTable />} />
        <Route path="/notice" element={<StudentNotice />} />
        <Route path="/payment" element={<StudentPayment/>} />
      </Route>
    </Routes>
  );
}

export default StudentRoute;