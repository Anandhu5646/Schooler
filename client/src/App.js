
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { Routes, Route } from 'react-router-dom'
import axios from 'axios';
import AdminRoute from './routes/AdminRoute';
import FacultyRoute from './routes/FacultyRoute';
import StudentRoute from './routes/StudentRoute';
import LandingRoute from './routes/LandingRoute';

import { useSelector } from 'react-redux';
import BackdropLoading from './components/BackdropLoading';


function App() {
  axios.defaults.baseURL= "http://localhost:1800"
  axios.defaults.withCredentials=true;

  const {loading}= useSelector((state)=> state);
  return (
    <div className="App">
    <Routes>
      <Route path="/admin" element={<AdminRoute/>}/>
      <Route path="/faculty" element={<FacultyRoute/>}/>
      <Route path='/student' element={<StudentRoute/>}/>
      <Route path='/*' element ={<LandingRoute/>}/>
    </Routes>
    <BackdropLoading open={loading}/>
   
    </div>
  );
}

export default App;
