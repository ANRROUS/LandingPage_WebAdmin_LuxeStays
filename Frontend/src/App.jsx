import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { AuthProvider } from './Context/AuthContext';
import Dashboard from './Components/Dashboard/Dashboard'
import Navbar from './Components/Navbar';
import ProtectedRoute from './ProtectedRoute';
import LandingPage from './Page/LandingPage';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/landing' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/tasks' element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
