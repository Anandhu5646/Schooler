
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import AdminClub from './pages/admin/adminClub/AdminClub';
import { Routes, Route } from 'react-router-dom'
import axios from 'axios';

function App() {
  axios.defaults.baseURL= "http://localhost:1800"
  axios.defaults.withCredentials=true;

  return (
    <div className="App">
    <AdminClub/>
    </div>
  );
}

export default App;
