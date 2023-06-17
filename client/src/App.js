
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './pages/landingPage/LandingPage'
import SchoolLogo from './components/schoolLogo/SchoolLogo';
import AdminHome from './pages/adminHome/AdminHome'

function App() {
  return (
    <div className="App">
    <AdminHome/>
      {/* <Landing/> */}
      {/* <SchoolLogo/> */}
    </div>
  );
}

export default App;
