
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";
import Landing from './pages/landingPage/LandingPage'
import SchoolLogo from './components/schoolLogo/SchoolLogo';
import AdminHome from './pages/admin/adminHome/AdminHome'
import AdminLogin from './pages/admin/adminLogin/AdminLogin';
import Login from './components/admin/login/Login';
import FacultyList from './components/admin/facultyList/FacultyList';
import StudentList from './components/admin/studentList/StudentList';
import AddFaculty from './components/admin/addFaculty/AddFaculty';

function App() {
  return (
    <div className="App">
    {/* <StudentList/> */}
    <AddFaculty/>
    {/* <FacultyList/> */}
    {/* <Login/> */}
    {/* <AdminLogin/> */}
    {/* <AdminHome/> */}
      {/* <Landing/> */}
      {/* <SchoolLogo/> */}
    </div>
  );
}

export default App;
