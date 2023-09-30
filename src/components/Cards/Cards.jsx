import React from 'react'
import Card from '../Card/Card'
import './cards.css'
import { useEffect, useState } from 'react'
import ProductsService from '../../services/productsService'
import CartsService from '../../services/cartsService'


/* Aqui hago el llamado a la API */
const Cards = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cart, setCart] = useState([]);

  const baseUrl = import.meta.env.VITE_BAKCEND_URL;


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizar una solicitud GET al servidor para obtener los datos del usuario actual
        const productsService = new ProductsService();
        const response = await productsService.getProducts();
        const productsData = response.data.payload
        setProducts(productsData)

        if (!response.data.status === "success") {
          throw new Error('No se pudo completar la solicitud.');
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const paginationService = new ProductsService();
        const response = await paginationService.getPagination(currentPage);

        if (!response.data.status === "success") {
          throw new Error('No se pudo completar la solicitud.');
        }

        //Manejando la respuesta
        const productData = response.data.payload
        setProducts(productData)
        setTotalPages(response.data.totalPages) //Actualiza el total de páginas

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
    if (user && user.email) { // Verifica que 'user' y 'user.email' estén definidos
      const fetchUserData = async () => {
        try {
          const userCartEmail = user.email;

          const cartService = new CartsService();
          const response = await cartService.getCarts();

          if (!response.data.status === "success") {
            throw new Error('No se pudo completar la solicitud.');
          }

          //Manejando la respuesta
          const cartData = response.data.payload

          const userCart = cartData.find((cart) => cart.email === userCartEmail);
          setCart(userCart);

        } catch (error) {
          console.error('Error al obtener los datos del usuario o carrito:', error);
        }
      };

      fetchUserData();
    }
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
                  imageSource={product.thumbnails}
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