import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Registration from './components/Registration';
import ResetPassword from './components/ResetPassword';
import AdminDashboard from './components/AdminDashboard';
import AdminUser from './components/AdminUser';
import { AuthProvider } from './context/Auth';
import { RequireAuth } from './components/RequireAuth';
import AdminPost from './components/AdminPost';



function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <div>
          <Routes>
            <Route exact path='/dashboard' element={<RequireAuth> <Dashboard/> </RequireAuth>}></Route>
            <Route exact path='/signup' element={<Registration/>}></Route>
            <Route exact path='/' element={<Login/>}></Route>
            <Route exact path='/forgotPassword' element={<ForgotPassword/>}></Route>
            <Route exact path='/resetPassword' element={<ResetPassword/>}></Route>
            <Route exact path='/adminDashboard' element={<AdminDashboard/> }></Route>
            <Route exact path='/adminUser' element={<AdminUser/>}></Route>
            <Route exact path='/adminPost' element={<AdminPost/>}></Route>
          </Routes>
        </div>
        <ToastContainer/>
      </Router>
    </AuthProvider>
  );
}

export default App;
