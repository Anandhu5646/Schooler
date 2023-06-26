import { Navigate, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";
// import ProtectedAdminRoute from "../utils/ProtectedAdminRoute";
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
  const { admin, refresh } = useSelector((state) => state);
  console.log("refers" , refresh);
  const dispatch = useDispatch();

  useEffect(()=>{
    (async function(){
        let  { data }= await axios.get("/admin/auth/check");
        console.log("fetch data",data.loggedIn);
        dispatch({type:"admin", payload:{login:data?.loggedIn, details:data?.admin}})
    })()
  },[refresh])
  console.log( "admin login",admin.login)

  return (
    <Routes>
   
      <>
      {
        admin.login && <Route path="/" element={<AdminHome />} />
        }


        {
          admin.login==false && <Route path="/" element={<AdminLogin />} />
        }
       
      {/* <Route path="/" element={<AdminHome />} /> */}

      <Route path="/faculty" element={<AdminFaculty />} />
      <Route path="/student" element={<AdminStudent />} />
      <Route path="/club" element={<AdminClub />} />
      <Route path="/classes" element={<AdminClass />} />
      <Route path="/subjects" element={<AdminSubject />} />
      { 
          admin.login==false &&
      <Route path="/login" element={<AdminLogin/> }/>
      }

      {
        admin.login && <Route path="/login" element={<Navigate to="/admin/" />} />
        }
       
      </>
    
    
      
    </Routes>
  );
}

export default AdminRoute;
