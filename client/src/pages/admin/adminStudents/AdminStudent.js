import React from 'react'
import StudentList from '../../../components/admin/studentList/StudentList'
import Sidebar from '../../../components/admin/sidebar/Sidebar'


function AdminStudent() {
  return (
    <div>
        
        <Sidebar/>
        <StudentList/>
       
    </div>
  )
}

export default AdminStudent