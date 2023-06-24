import { Navigate, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";
import ProtectedAdminRoute from "../utils/ProtectedAdminRoute";
import AdminHome from "../pages/admin/adminHome/AdminHome";
import AdminFaculty from "../pages/admin/adminFaculty/AdminFaculty";
import { useDispatch, useSelector } from "react-redux";
import AdminStudent from "../pages/admin/adminStudents/AdminStudent";
import AdminClub from "../pages/admin/adminClub/AdminClub";
import AdminClass from "../pages/admin/adminClasses/AdminClass";
import AdminSubject from "../pages/admin/adminSubjects/AdminSubject";
import AdminLogin from "../pages/admin/adminLogin/AdminLogin";

function AdminRoute() {
    console.log("hiii");
  const { admin, refersh } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(()=>{
    (async function(){
        let {data:adminData}= await axios.get("/admin/auth/check");
        dispatch({type:"admin", payload:{login:adminData.loggedIn, details:adminData.admin}})
    })()
  },[refersh])

  return (
    <Routes>
   
      <Route element={<ProtectedAdminRoute admin={admin} />} >
      <>
      <Route exact path="/" element={<AdminHome />} />
      <Route path="/faculty" element={<AdminFaculty />} />
      <Route path="/student" element={<AdminStudent />} />
      <Route path="/club" element={<AdminClub />} />
      <Route path="/class" element={<AdminClass />} />
      <Route path="/subject" element={<AdminSubject />} />
      </>
     </Route>
    {
        admin.login && <Route path="/login" element={<Navigate to="/admin/" />} />
        }
        {admin.login===false &&
      <Route path="/login" element={<AdminLogin/> }/>}
      
    </Routes>
  );
}

export default AdminRoute;
