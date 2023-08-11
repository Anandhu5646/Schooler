
import './App.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios';
import AdminRoute from './routes/AdminRoute';
import FacultyRoute from './routes/FacultyRoute';
import StudentRoute from './routes/StudentRoute';
import LandingRoute from './routes/LandingRoute';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { useSelector } from 'react-redux';
import BackdropLoading from './components/BackdropLoading';
import ErrPage from './pages/404page';



function App() {
  // axios.defaults.baseURL = "http://localhost:1800"
  axios.defaults.baseURL ="https://schooler.sigag.online"
  axios.defaults.withCredentials = true;

  const { loading } = useSelector((state) => state);
  return (
    <div className="App">
      <Routes>
        <Route path="/admin/*" element={<AdminRoute />} />
        <Route path="/faculty/*" element={<FacultyRoute />} />
        <Route path='/student/*' element={<StudentRoute />} />
        <Route path='/' element={<LandingRoute />} />
        <Route path='/404' element={<ErrPage />} />
        <Route path="/*" element={<Navigate to="/404" />} />
      </Routes>
      <BackdropLoading open={loading} />

    </div>
  );
}

export default App;
