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
                      src="https://lh3.googleusercontent.com/fife/AK0iWDxbGsxSVz4PXHTV66EFWojLNL-ivNdLTEbLpTv8mU4EMa3UOlhJf4VqYo0gxhclyRfGDy3RMEGEiEDge4o2HLDKeAYKDFA0DqnIrDm48tmCG4jB9w9I23LWhBIe9kEZ94_57JhtI5bs3HenoobJxwVpxIskpKqK1EEpAyj5OF31RCI0PkDGhHrfdgRhCXWXJFOZX9L_qg416xxurC6w3FGLQOEacxJm1qE0rHk69V7rSv28muc4-zDW_cLnBvO5CIVQmzQy56mH-gATJpUn3j4NAWuAFTYBCCM7fmubNbiUP3nbmCJGuPi6Adyi2nRvnVzcAdDyg7F-AoDR0RFzC72e1DY7gdwG9H7iFeY2Hys_YOAecSmDLT_RyIF_TApc2tZeiMxnw-3swwKPu3BzLLBlN2tYtT7rLVbXp_k84ecC2pPOj_kf5A0lCsTdyr5-MtuKpCbPG6tXDUbLMZYK_E0Aja9Tu7ESR_E2qk7qFIOdy5vInhQgSRfqqm-H0-Dx9hpiHKTNoQJNjpRKSiSIKGpjvxXDeZKu7o4bECgNY9iqWJTQU_NSODlwczHyAPEzwR7MHUKag4ostjALc7U0ZAqPTzoygtuwTqpTlvIa9-D0aoE0MXfW_DYfbNBvzLvEaXiZSCuKBuqwYd5Cfhy-vs2Z47tJ5fJlnOHS6V56OTCeMWIPOumjmjKMeCUc_PYmd-jJWAQ8nHykNLd1Tk9u0R1bfonsfbF3A2m2Mb5aP65I8lU5daerZpYeVlX-QYxGuknwL2Yr_to8lDsSOZUTcFLRnsXA-38e1sWl_KQXdVfQsXq242Hqcn7ycgG6bo8w_QJcLimT1LaapWwtac3TW3K0ThuyO5IcvQ6sbK3azqdqkufoktc3VGqc8DrCMbTFjDeQBEyCdf5SDleEXTUXE77HwDhW-EVdlW0jX4bcVBAP21KI0v83LIPQJTiC50DHup482xBC97pTk57xPqtQxwIos2AZGlENjN8S7Z7wk4sEZSDJSNd8Ck9VCHuHvmBIISpCcloXPxChLiJcR0PuPUIh6zw5tz_aKUTNG__D0T_wFceMzFV5YUb_c6zR1ECFuZXFFL-uta2YZKrDKXPvdtrYhs4FC4-Gkv7kIXj1eFD7ztD_Y1C3Z-snD1Q2cShcV8GghS6EiBWQZiVZ7661x5nmsMuwjp36Z9NylEq1InY6KR7X0o-A8T7MUaE3BA6F4Fd7T6u-OUPGrc11A96ynk-rZ0K5Gce9RFdRJo1l7n8Ii86AUoilbiXhR-ovOVq2QTQYFaDCBu0RIRXK5fRm2QYq9vFwqvqZyICJYwdgXALKSh8RDE03xV8hUl-PGa7e_VSAfGYIEbykyIzfF1GGnvKEvNb_q865vbjItVn8_JIu1dsBgncR4JD6Awd_DtC5dCwsOk04TeE_WGZlq2gnIYfssMuzo8MhiW64DbCewF3vkS6EVFCeHVTuIEF1jhj6XeEaqbAJ77yc07rk7OuhqPegSUCtYA4FjP2VEBLHnedbD6tp8O35mdoXcThaW3WabTMvuZnqYg3B-5FRxKIOculGAnM88PqB6MJHNHtldGb2ebk2KPTVi1fEtw=w1920-h931"
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