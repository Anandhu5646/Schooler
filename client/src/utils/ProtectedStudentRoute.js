import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedStudentRoute({student}) {
  return (
    <>
        {
            student.login=== false && <Navigate to="/student/login"/>
        }
        {
            student.login && <Outlet/>
        }
    </>
  )
}

export default ProtectedStudentRoute