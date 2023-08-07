import React from "react";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import FacList from "../../../components/admin/facultyList/FacList";
// import Tempppp from "../../../components/admin/facultyList/Tempppp";

function AdminFaculty() {
  return (
    <div>
      <Sidebar />
      <FacList />
      {/* <Tempppp/> */}
    </div>
  );
}

export default AdminFaculty;
