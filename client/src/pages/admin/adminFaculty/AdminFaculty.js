import React from 'react'
import Sidebar from '../../../components/admin/sidebar/Sidebar'
import FacultyList from '../../../components/admin/facultyList/FacultyList'
import ToastProvider from '../../../components/admin/facultyList/FacultyList'

function AdminFaculty() {
  return (
    <div>
  
      <Sidebar/>
      <ToastProvider>
      <FacultyList />
    </ToastProvider>
    </div>
  )
}

export default AdminFaculty