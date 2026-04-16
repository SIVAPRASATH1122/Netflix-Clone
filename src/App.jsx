import React, { useEffect } from 'react'
import Home from './Pages/Home/Home'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Login from './Pages/Home/Login/Login'
import Player from './Pages/Home/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {

      if (!user) {
        navigate('/login');
      } else {
        // ✅ Don't block player page
        if (location.pathname === '/login') {
          navigate('/');
        }
      }

    });

    return () => unsubscribe();

  }, [navigate, location]);

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
      </Routes>
    </div>
  )
}

export default App;