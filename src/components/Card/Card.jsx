import React from 'react'
import './card.css'
import PropTypes from 'prop-types'
import ItemCount from '../ItemCount/ItemCount'
import { useState } from 'react'
import Swal from 'sweetalert2'
import CartsService from '../../services/cartsService'


const Card = ({ title, imageSource, description, stock, user, id, cart }) => {
  const [itemCount, setItemCount] = useState(1); // Inicializa itemCount en 1

  const baseUrl = import.meta.env.VITE_BAKCEND_URL;

  // Esta función actualizará itemCount en Card.jsx
  const handleItemCountChange = (newItemCount) => {
    setItemCount(newItemCount);
  };

  const handleAgregar = async () => {
    try {
      const cid = cart._id; // Obtiene el _id del carrito
      const pid = id; // Obtiene el id del producto
      const quantity = itemCount; // Obtiene la cantidad del producto

      const cartService = new CartsService();
      const response = await cartService.addProductToCart(cid, pid, quantity);

      if (!response.data.status === "success") {
        throw new Error('No se pudo completar la solicitud.');
      }

      // Realiza alguna acción adicional si la solicitud fue exitosa
      Swal.fire({
        title: 'Productos agregados al carrito',
        text: `Cantidad: ${itemCount}`,
        icon: 'success',
        showConfirmButton: true,
        confirmButtonText: 'ir al carrito',
        confirmButtonColor: '#28a1ed',
        showCancelButton: true,
        cancelButtonText: 'Aceptar',
        cancelButtonColor: '#198754'
      }).then((result) => {
        if (result.isConfirmed) {
          // El usuario hizo clic en "Ir al carrito"
          window.location.href = '/cart';
        }
      });

    } catch (error) {
      console.error('Error al agregar al carrito:', error);
    }
  };

  return (
    <div className='card-container mb-4'>
      <div className='card-container2 card rounded-3'>
        <img src={imageSource} alt="" className='card-img-top rounded-top-2' />

        <div className='card-body'>
          <h4 className='card-title'>{title}</h4>
          <p className='card-text text-secondary'>
            {description
              ? description
              : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo quisquam quasi nesciunt necessitatibus similique unde qui.'}
          </p>
          <p className='card-text text-secondary'>
            stock: {stock}
          </p>
          <div className='d-flex justify-content-evenly'>
            <ItemCount stock={stock} inicial={1} onItemCountChange={handleItemCountChange} />
            <button className='btn btn-outline-secondary align-self-center ms-3' onClick={handleAgregar}>
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  imageSource: PropTypes.string,
  text: PropTypes.string
}

export default Card;