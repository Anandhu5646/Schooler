import { Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import axios from "axios";
import ProtectedAdminRoute from "../utils/ProtectedAdminRoute";
import AdminHome from "../pages/admin/adminHome/AdminHome";
import AdminFaculty from "../pages/admin/adminFaculty/AdminFaculty";

function AdminRoute() {
  return (
    <Routes>

      <Route element={<ProtectedAdminRoute admin={admin} />} />
      <>
        <Route path="/admin/" element={<AdminHome />} />
        <Route path="/admin/faculty" element={<AdminFaculty/>}/>
        
      </>
    </Routes>
  );
}
export default AdminRoute