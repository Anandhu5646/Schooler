import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedFacultyRoute({faculty}) {
  return (
    <>
        {
            faculty.login=== false && <Navigate to="/faculty/login"/>
        }
        {
            faculty.login && <Outlet/>
        }
    </>
  )
}

export default ProtectedFacultyRoute