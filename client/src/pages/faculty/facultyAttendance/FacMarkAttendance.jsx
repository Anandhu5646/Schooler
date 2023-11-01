import React from 'react'
import FacSidebar from '../../../components/faculty/facSidebar/FacSidebar'
import FacAttendance from '../../../components/faculty/facAttendance/FacAttendance'
import { ToastContainer } from 'react-toastify'

function FacMarkAttendance() {

  return (
    <div>
        <FacSidebar/>
        <FacAttendance/>
        <ToastContainer/>
        
        
    </div>
  )
}

export default FacMarkAttendance