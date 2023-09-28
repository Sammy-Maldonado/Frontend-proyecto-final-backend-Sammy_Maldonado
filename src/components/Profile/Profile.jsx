import React from 'react'
import './profile.css'
import { useState, useEffect } from 'react'

const Profile = () => {
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
        console.log('Datos del usuario actual:', data.payload);
        const userData = data.payload;
        setUser(userData);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <section className="section-container-profile vh-100" >
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-start h-100 w-100">
          <div className="card-container col col-md-9 col-lg-7 col-xl-5">
            <div className="card" style={{ borderRadius: 15 }}>
              <div className="card-body p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <img
                      src="https://static.wikia.nocookie.net/joke-battles/images/d/df/Gigachad.png/revision/latest?cb=20230812064835"
                      alt="Generic placeholder image"
                      className="imagen-perfil img-fluid"
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="mb-1">{user && user.name}</h5>
                    <p className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>
                      {user && user.email}
                    </p>
                    <div
                      className="d-flex justify-content-between rounded-3 p-2 mb-2 pt-3"
                      style={{ backgroundColor: "#efefef" }}
                    >
                      <div className='ps-3'>
                        <p className="small text-muted mb-1">role</p>
                        <p className="mb-0">{user && user.role}</p>
                      </div>
                      <div className="px-3">
                        <p className="small text-muted mb-1">age</p>
                        <p className="mb-0">{user && user.age}</p>
                      </div>
                      <div className=''>
                        <p className="d-flex justify-content-center small text-muted mb-1">last connection</p>
                        <p className="text-center mb-0">{user && user.last_connection.replace(/\sGMT-\d{4}/, '')}</p>
                      </div>
                    </div>
                    <div className="d-flex pt-1">
                      <button
                        type="button"
                        className="btn btn-outline-primary me-1 flex-grow-1"
                      >
                        Chat
                      </button>
                      <button type="button" className="btn btn-primary me-1 flex-grow-1">
                        Documentos
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-primary me-1 flex-grow-1"
                      >
                        Editar Perfil
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile