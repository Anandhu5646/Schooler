import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedAdminRoute({ admin }) {
  return (
    <>
      {admin.login && <Outlet />}
      {admin.login==false && <Navigate to="/admin/login" />}
    </>
  );
}

export default ProtectedAdminRoute;
