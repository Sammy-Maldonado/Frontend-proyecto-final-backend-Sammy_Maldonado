import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './components/SignUp/SignUp'
import Cards from './components/Cards/Cards'
import Home from './components/Home/Home'
import ShoppingCart from './components/ShoppingCart/ShoppingCart'
import NavBar from './components/NavBar/NavBar'
import Profile from './components/Profile/Profile'
import { useEffect, useState } from 'react'
import SessionsService from './services/sessionsService'

function App() {
  const baseUrl = import.meta.env.VITE_BAKCEND_URL;
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizar una solicitud GET al servidor para obtener los datos del usuario actual
        const sessionsService = new SessionsService();
        const response = await sessionsService.currentUser();
        const userData = response.data.payload
        setUser(userData)

        if (!response.data.status === "success") {
          throw new Error('No se pudo completar la solicitud.');
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className='App'>
        <BrowserRouter>
          <NavBar user={user} />
          <div className="content-container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<SignUp />} />
              <Route path='/profile' element={<Profile user={user} />} />
              <Route path='/products' element={<Cards user={user} />} />
              <Route path='/cart' element={<ShoppingCart user={user} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
