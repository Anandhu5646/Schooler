import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/landingPage/LandingPage'
import AdminLogin from '../pages/admin/adminLogin/AdminLogin'
import FacultyLogin from '../pages/faculty/facultyLogin/FacultyLogin'
import StudentLogin from '../pages/student/studentLogin/StudentLogin'

function LandingRoute() {
  return (
    
        <Routes>
                <Route path='/' element={<LandingPage/>}/>
                <Route path='/admin/login' element={<AdminLogin/>}/>
                <Route path="/faculty/login" element={<FacultyLogin/> }/>
                <Route path="/student/login" element={<StudentLogin/> }/>
        </Routes>
    
  )
}

export default LandingRoute