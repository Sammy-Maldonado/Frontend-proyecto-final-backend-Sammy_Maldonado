import React from 'react'
import './NavBar.css'
import CartWidget from '../CartWidget/CartWidget'
import { Link } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import SessionsService from '../../services/sessionsService'
import Swal from 'sweetalert2';


const NavBar = ({ user }) => {
  const baseUrl = import.meta.env.VITE_BAKCEND_URL;

  const handleLogout = async () => {
    try {
      if (user && user.role != "admin") {
        const sessionsService = new SessionsService();
        const response = await sessionsService.logoutUser();
        window.location.replace('/');
      }

      if (user && user.role === "admin") {
        window.location.replace('/');
        const sessionsService = new SessionsService();
        const response = await sessionsService.logoutUser();
      }
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const adminHandleRedirect = async () => {
    try {
      if (user && user.role === "admin") {
        window.location.replace('/adminview');
      } else {
        Swal.fire({
          title: 'Vista exclusiva para Administradores',
          html: `
              <p>Por favor, solicite los permisos correspondientes antes de seguir.</p>
            `,
          icon: 'error',
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#198754',
        })
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handlePersonIconRedirect = async () => {
    try {
      if (!user) {
        window.location.replace('/login');
      }
      if (user.role != "admin") {
        window.location.replace('/profile');
      } else {
        Swal.fire({
          title: 'Vista exclusiva para usuarios',
          html: `
              <p>Por favor, solicite los permisos correspondientes antes de seguir.</p>
            `,
          icon: 'error',
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#198754',
        })
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }


  return (
    <nav className="navbarsm navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-nav container-fluid">
        <Link to={'/'}><img className='nav-img navbar-logo img-fluid' src="/p-logo.png" alt="logo de great templates" /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="ul-navbar navbar-nav d-flex justify-content-between w-100">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to={'/'}> <strong>Inicio</strong> </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/products'}> <strong>Productos</strong> </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/cart'}> <strong>Carrito</strong> </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={adminHandleRedirect} > <strong>Users Managment</strong> </Link>
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
          <Link className="nav-right-links" onClick={handlePersonIconRedirect} >
            <PersonIcon fontSize='large' />
          </Link>
          <CartWidget />
        </div>
      </div>
    </nav>
  )
}

export default NavBar