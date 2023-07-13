import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedAdminRoute({ admin }) {
  return (
    <>
      {!admin.login && <Navigate to="/admin/login" />}
      {admin.login && <Outlet />}
    </>
  )
}

export default ProtectedAdminRoute
