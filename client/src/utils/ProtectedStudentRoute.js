import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedStudentRoute({student}) {
  return (
    <>
    {student?.login && <Outlet />}
    {student.login==false && <Navigate to="/student/login" />}
  </>
  )
}

export default ProtectedStudentRoute