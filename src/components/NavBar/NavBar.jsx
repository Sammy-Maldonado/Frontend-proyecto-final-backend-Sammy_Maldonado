import React from 'react'
import './NavBar.css'
import CartWidget from '../CartWidget/CartWidget'
import { Link } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

const NavBar = ({user}) => {
  const baseUrl = import.meta.env.VITE_BAKCEND_URL;

  const handleLogout = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/sessions/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      console.log(response);
  
        if (response.ok) {
          window.location.replace('/');
        } else {
          console.error('Error al realizar el logout.');
        }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Determina la URL de redirección en función de la existencia del usuario
  const redirectURL = user ? '/profile' : '/login';

  return (
    <nav className="navbarsm navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-nav container-fluid">
        <Link to={'/'}><img className='nav-img navbar-logo img-fluid' src="/p-logo.png" alt="logo de great templates" /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="ul-navbar navbar-nav d-flex justify-content-between">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to={'/'}> <strong>Inicio</strong> </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/products'}> <strong>Productos</strong> </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/cart'}> <strong>Carrito</strong> </Link>
            </li>
          </ul>
        </div>
        <div className='container-icons d-flex justify-content-between'>
          <Link className="nav-right-links" onClick={handleLogout} >
            <LogoutIcon fontSize='large' />
          </Link>
          <Link className="nav-right-links" to={'/'}>
            <HomeIcon fontSize='large' />
          </Link>
          <Link className="nav-right-links" to={redirectURL}>
            <PersonIcon fontSize='large' />
          </Link>
          <CartWidget />
        </div>
      </div>
    </nav>
  )
}

export default NavBar