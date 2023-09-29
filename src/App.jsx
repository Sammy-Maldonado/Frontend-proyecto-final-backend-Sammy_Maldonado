import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './components/SignUp/SignUp'
import Cards from './components/Cards/Cards'
import Home from './components/Home/Home'
import ShoppingCart from './components/ShoppingCart/ShoppingCart'
import NavBar from './components/NavBar/NavBar'
import Profile from './components/Profile/Profile'
import { useEffect, useState } from 'react'
import UsersService from './services/usersService'

function App() {
  const baseUrl = import.meta.env.VITE_BAKCEND_URL;
  const [user, setUser] = useState(null);
  const [axiosUsers, setAxiosUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const userService = new UsersService();
      const response = await userService.getUsers();
      console.log(response);
      const users = response.data.payload;
      setAxiosUsers(users);
    }
    getUsers();
  },[])

  console.log(axiosUsers);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizar una solicitud GET al servidor para obtener los datos del usuario actual
        const response = await fetch(`${baseUrl}/api/sessions/current`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('No se pudo completar la solicitud.');
        }

        // Manejar la respuesta aquí
        const data = await response.json();
        console.log('Datos del usuario actual:', data.payload);  // Los datos del usuario se encuentran en "data.payload"
        const userData = data.payload;
        setUser(userData);
        // Hacer algo con los datos del usuario, como establecerlos en el estado del componente
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
