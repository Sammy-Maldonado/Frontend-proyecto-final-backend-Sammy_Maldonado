import React from 'react'
import Card from '../Card/Card'
import './cards.css'
import { useEffect, useState } from 'react'

/* Aqui hago el llamado a la API */
const Cards = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cart, setCart] = useState(null);

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
        /* console.log('Datos del usuario actual:', data.payload); */  // Los datos del usuario se encuentran en "data.payload"
        const userData = data.payload;
        setUser(userData);
        // Hacer algo con los datos del usuario, como establecerlos en el estado del componente
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizar una solicitud GET al servidor para obtener los datos de los productos
        const response = await fetch(`${baseUrl}/api/products`, {
          method: 'GET',
          credentials: 'include',
        });
  
        if (!response.ok) {
          throw new Error('No se pudo completar la solicitud.');
        }
  
        // Manejar la respuesta aquí
        const data = await response.json();
        console.log('Datos de los productos en pantalla:', data.payload);  // Los datos de los productos se encuentran en "data.payload"
        const productData = data.payload;
        setProducts(productData);
        // Hacer algo con los datos de los productos, como establecerlos en el estado del componente
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizar una solicitud GET al servidor para obtener los datos de la página actual
        const response = await fetch(`${baseUrl}/api/products?page=${currentPage}`, {
          method: 'GET',
          credentials: 'include',
        });
  
        if (!response.ok) {
          throw new Error('No se pudo completar la solicitud.');
        }
  
        // Manejar la respuesta aquí
        const data = await response.json();
        const productData = data.payload;
        setProducts(productData);
        setTotalPages(data.totalPages); // Actualiza el total de páginas
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };
  
    fetchData();
  }, [currentPage]); // Agrega currentPage como dependencia

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Realizar una solicitud GET al servidor para obtener los datos del usuario actual
        const userResponse = await fetch(`${baseUrl}/api/sessions/current`, {
          method: 'GET',
          credentials: 'include',
        });
  
        if (!userResponse.ok) {
          throw new Error('No se pudo completar la solicitud de usuario.');
        }
  
        const userData = await userResponse.json();
        const userCartEmail = userData.payload.email;
  
        // Una vez que tengas el email del usuario, puedes usarlo para buscar el carrito
        const cartResponse = await fetch(`${baseUrl}/api/carts`, {
          method: 'GET',
          credentials: 'include',
        });
  
        if (!cartResponse.ok) {
          throw new Error('No se pudo completar la solicitud de carrito.');
        }
  
        const cartData = await cartResponse.json();
        const userCart = cartData.payload.find((cart) => cart.email === userCartEmail);
        
        if (userCart) {
          console.log('Carrito del usuario:', userCart);
          setCart(userCart);
        }

      } catch (error) {
        console.error('Error al obtener los datos del usuario o carrito:', error);
      }
    };
  
    fetchUserData(); // Llama a la función asincrónica al cargar el componente
  }, []);

  return (
    <>
      <div className='container d-flex justify-content-center align-items-center'>
        <div className='row row-container'>
          <h1 className='text-center my-4'>CURSOS</h1>
          <div>
            {/* Mostrar los datos del usuario en la interfaz de usuario */}
            <h1>Hola, {user ? user.name : 'Invitado'}</h1>
            <p>{user ? `Correo: ${user.email}` : ''}</p>
          </div>

          {/* Mapeo de los productos para obtener sus datos */}
          {
            products.map(product => (
              <div className='col-md-4 container-card d-flex justify-content-center align-items-center' key={product.id}>
                <Card
                  id={product._id}
                  title={product.title}
                  price={product.price}
                  stock={product.stock}
                  imageSource={`http://localhost:8080${product.thumbnails}`}
                  description={product.description}
                  user={user}
                  cart={cart}
                />
              </div>))
          }
          <div className='pagination d-flex justify-content-between px-0 pb-3'>
            <button className="btn btn-dark" onClick={handlePrevPage}>
              Anterior
            </button>
            <button className="btn btn-dark" onClick={handleNextPage}>
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cards