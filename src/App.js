import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';


import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Registration from './components/Registration';
import ResetPassword from './components/ResetPassword';
import { AuthProvider } from './context/Auth';
import { RequireAuth } from './components/RequireAuth';


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
            <Route exact path='/resetPassword' element={<RequireAuth> <ResetPassword/> </RequireAuth>}></Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
