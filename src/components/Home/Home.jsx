import React from 'react'
import './home.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Home = () => {
  const [user, setUser] = useState(null);

  const baseUrl = import.meta.env.VITE_BAKCEND_URL;

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
        /* console.log('Datos del usuario actual:', data.payload); */
        const userData = data.payload;
        setUser(userData);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchData();
  }, []);

  // Determina la URL de redirección en función de la existencia del usuario
  const redirectURL = user ? '/profile' : '/login';

  return (
    <section
      className="u-clearfix u-palette-1-base u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-section-1"
      id="sec-0444"
    >
      <h1 className="h1 u-text u-text-1">
        Sabemos que necesitas la mejor formación profesional
      </h1>
      <div className="u-opacity u-opacity-35 u-palette-1-light-1 u-shape u-shape-rectangle u-shape-1" />
      <img
        src="https://images01.nicepagecdn.com/c461c07a441a5d220e8feb1a/4e94eca4bde25744958a6bde/rer.jpg"
        alt=""
        className="u-align-left u-image u-image-1"
        data-image-width={1200}
        data-image-height={800}
      />
      <div className="u-shape u-shape-svg u-text-white u-shape-2">
        <svg
          className="u-svg-link"
          preserveAspectRatio="none"
          viewBox="0 0 160 160"
          style={{}}
        >
          <use xlinkHref="#svg-d9c8" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          xmlSpace="preserve"
          className="u-svg-content"
          viewBox="0 0 160 160"
          x="0px"
          y="0px"
          id="svg-d9c8"
          style={{ enableBackground: "new 0 0 160 160" }}
        >
          <path
            d="M80,30c27.6,0,50,22.4,50,50s-22.4,50-50,50s-50-22.4-50-50S52.4,30,80,30 M80,0C35.8,0,0,35.8,0,80s35.8,80,80,80
	s80-35.8,80-80S124.2,0,80,0L80,0z"
          />
        </svg>
      </div>
      <div className="u-list u-list-1">
        <div className="u-repeater u-repeater-1">
          <div className="u-container-style u-list-item u-repeater-item u-video-cover u-white u-list-item-1">
            <div className="u-container-layout u-similar-container u-valign-top u-container-layout-1">
              <span className="u-file-icon u-grey-10 u-icon u-icon-circle u-icon-1">
                <Link to={'/login'}>
                  <img src="https://assets.nicepagecdn.com/85608536/5938600/images/1144760.png" alt="" />
                </Link>
              </span>
              <Link to={redirectURL} >
                <h4 className="u-align-center u-text u-text-palette-1-base u-text-2">
                  ingresa
                </h4>
              </Link>
              <p className="u-align-center u-text u-text-3">
                Se parte de nuestra comunidad de más de 9999999 alumnos
              </p>
            </div>
          </div>
          <div className="u-align-center u-container-style u-list-item u-repeater-item u-video-cover u-white u-list-item-2">
            <div className="u-container-layout u-similar-container u-valign-top u-container-layout-2">
              <span className="u-file-icon u-grey-10 u-icon u-icon-circle u-icon-2">
                <Link to={'/products'}>
                  <img src="https://assets.nicepagecdn.com/85608536/5938600/images/2436805.png" alt="" />
                </Link>
              </span>
              <Link to={'/products'}>
                <h4 className="u-align-center u-text u-text-palette-1-base u-text-4">
                  cursos online
                </h4>
              </Link>
              <p className="u-align-center u-text u-text-5">
                Aprende con los mejores profesores del planeta tierra
              </p>
            </div>
          </div>
          <div className="u-align-center u-container-style u-list-item u-repeater-item u-video-cover u-white u-list-item-3">
            <div className="u-container-layout u-similar-container u-valign-top u-container-layout-3">
              <span className="u-file-icon u-grey-10 u-icon u-icon-circle u-icon-3">
                <img src="https://assets.nicepagecdn.com/85608536/5938600/images/1067256.png" alt="" />
              </span>
              <h4 className="u-align-center u-text u-text-palette-1-base u-text-6">
                emprende
              </h4>
              <p className="u-align-center u-text u-text-7">
                Impulsa tu carrera con las últimas tecnologias y cursos acualizados
                al 2029
              </p>
            </div>
          </div>
          <div className="u-align-center u-container-style u-list-item u-repeater-item u-video-cover u-white u-list-item-4">
            <div className="u-container-layout u-similar-container u-valign-top u-container-layout-4">
              <span className="u-file-icon u-grey-10 u-icon u-icon-circle u-icon-4">
                <img src="https://assets.nicepagecdn.com/85608536/5938600/images/3856515.png" alt="" />
              </span>
              <h4 className="u-align-center u-text u-text-palette-1-base u-text-8">
                garantizado
              </h4>
              <p className="u-align-center u-text u-text-9">
                Si no es lo que esperas, te devolvemos tu dinero
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Home