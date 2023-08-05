import React from "react";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import FacList from "../../../components/admin/facultyList/FacList";

function AdminFaculty() {
  return (
    <div>
      <Sidebar />
      <FacList />
    </div>
  );
}

export default AdminFaculty;
