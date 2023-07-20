import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedAdminRoute({ admin }) {
  console.log(admin, 'admin');
  console.log(admin.login,'loggedIN')
  
  return (
    <>
      {admin.login ? <Outlet /> : <Navigate to="/" />}
    </>
  );
}

export default ProtectedAdminRoute;
