import React from 'react'
import Sidebar from '../../../components/admin/sidebar/Sidebar'
import ToastProvider from '../../../components/admin/facultyList/FacList'
import FacList from '../../../components/admin/facultyList/FacList'

function AdminFaculty() {
  return (
    <div>
  
      <Sidebar/>
      <ToastProvider>
      <FacList />
    </ToastProvider>
    </div>
  )
}

export default AdminFaculty