import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedFacultyRoute({faculty}) {
  return (
    <>
      {faculty?.login && <Outlet />}
      {faculty.login==false && <Navigate to="/faculty/login" />}
    </>
  )
}

export default ProtectedFacultyRoute