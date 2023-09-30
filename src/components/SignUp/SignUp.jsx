import React, { useState } from 'react';
import './SignUp.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom';
/* import ProductsServices from '../../services/productsService' */

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [age, setAge] = useState("");

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const baseUrl = import.meta.env.VITE_BAKCEND_URL;

  const handleSignUp = async (e) => {
    e.preventDefault();

    const formDataUser = new FormData();
    formDataUser.append('first_name', firstName);
    formDataUser.append('last_name', lastName);
    formDataUser.append('age', age);
    formDataUser.append('email', email);
    formDataUser.append('password', password);

    const objUser = {};
    formDataUser.forEach((value, key) => (objUser[key] = value));

    const name = `${firstName} ${lastName}`;

    try {
      // Realizar la solicitud para crear el usuario
      const userResponse = await fetch(`${baseUrl}/api/sessions/register`, {
        method: 'POST',
        body: JSON.stringify(objUser),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      // Verificar si la creación del usuario fue exitosa
      if (userResponse.status === 200) {
        // Crear un nuevo objeto objCart con solo "name" y "email"
        const objCart = {
          name: name,
          email: email,
        };

        // Realizar la solicitud para crear el carrito
        const cartResponse = await fetch(`${baseUrl}/api/carts`, {
          method: 'POST',
          body: JSON.stringify(objCart), // Puedes usar los mismos datos del usuario para el carrito
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        // Verificar si la creación del carrito fue exitosa
        if (cartResponse.status === 200) {
          window.location.replace('/login');
        } else {
          console.error('Error al crear el carrito:', cartResponse.status);
        }
      } else {
        console.error('Error al crear el usuario:', userResponse.status);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud', error);
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const obj = {};
    formData.forEach((value, key) => (obj[key] = value));

    try {
      const response = await fetch(`${baseUrl}/api/sessions/login`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      const responseData = response.status;
      console.log(responseData);
      if (responseData === 200) {
        window.location.replace('/products');

      }

    } catch (error) {
      console.error('Error al realizar la solicitud', error);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      // Redirige al usuario al sitio web de GitHub para la autenticación
      window.location.href = `${baseUrl}/api/sessions/github`; // Cambia la URL según tu configuración

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdadChange = (e) => {
    //Obteniendo el valor actual del campo edad
    const nuevoValor = parseInt(e.target.value, 10);

    //Verificando si el nuevo valor es un numero y si es mayor o igual a cero
    if (!isNaN(nuevoValor) && nuevoValor > 0)

      //Actualizamos el estado con valores válidos
      setAge(nuevoValor);
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleForm = () => {
    setShowSignUpForm(!showSignUpForm);
  };

  return (
    <>
      {/* Seccion Login */}
      <section className={`container forms ${showSignUpForm ? 'show-signup' : ''}`}>
        <div className="form login">
          <div className="form-content">
            <header>Login</header>
            <form action="#" id="loginForm" onSubmit={handleSubmit}>
              <div className="field input-field">
                <input
                  type="email"
                  placeholder="Email"
                  className="input"
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="field input-field">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Contraseña"
                  className="password"
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i
                  className={`bx ${passwordVisible ? 'bx-show' : 'bx-hide'} eye-icon`}
                  onClick={togglePasswordVisibility}
                ></i>
              </div>
              <div className="form-link">
                <a href="#" className="forgot-pass">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="field button-field">
                <button type='submit'>Login</button>
              </div>
            </form>
            <div className="form-link">
              <span>
                ¿No tienes cuenta?{' '}
                <a href="#" className="link signup-link" onClick={toggleForm}>
                  Registrate aquí
                </a>
              </span>
            </div>
          </div>
          <div className="line"></div>
          <div className="media-options">
            <Link className="field google" onClick={handleGitHubLogin}>
              <GitHubIcon
                sx={{ color: 'black' }}
              />
              <span>GitHub</span>
            </Link>
          </div>
        </div>

        {/* Seccion SignUp */}
        <div className="form signup">
          <div className="form-content">
            <header>Crear cuenta</header>
            <form action="#" onSubmit={handleSignUp}>
              <div className="field input-field">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="input"
                  name='first_name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="field input-field">
                <input
                  type="text"
                  placeholder="Apellido"
                  className="input"
                  name='last_name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="field input-field">
                <input
                  type="number"
                  placeholder="Edad"
                  className="input"
                  name='age'
                  value={age}
                  onChange={handleEdadChange}
                />
              </div>
              <div className="field input-field">
                <input
                  type="email"
                  placeholder="Email"
                  className="input"
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="field input-field">
                <input
                  type="password"
                  placeholder="Crear contraseña"
                  className="password"
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="field input-field">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Confirmar contraseña"
                  className="password"
                />
                <i
                  className={`bx ${passwordVisible ? 'bx-show' : 'bx-hide'} eye-icon`}
                  onClick={togglePasswordVisibility}
                ></i>
              </div>
              <div className="field button-field">
                <button type='submit'>Crear cuenta</button>
              </div>
            </form>
            <div className="form-link">
              <span>
                ¿Ya tienes una cuenta?{' '}
                <a href="#" className="link login-link" onClick={toggleForm}>
                  Ingresa aquí
                </a>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;