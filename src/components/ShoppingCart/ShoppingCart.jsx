import React from 'react'
import './ShoppingCart.css'
import { useState, useEffect } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

const ShoppingCart = () => {
  const [cart, setCart] = useState(null);
  let totalAmount = 0;
  const baseUrl = import.meta.env.VITE_BAKCEND_URL;

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

  const handlePagar = async () => {
    try {
      const userPurchase = await fetch(`${baseUrl}/api/carts/${cart._id}/purchase`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!userPurchase.ok) {
        throw new Error('No se pudo completar la solicitud de compra.');
      }

      const clearCart = await fetch(`${baseUrl}/api/carts/${cart._id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!clearCart.ok) {
        throw new Error('No se pudo vaciar el carrito.');
      }

      // Alerta cuando la compra es exitosa
      Swal.fire({
        title: 'Compra realizada con éxito',
        html: `
            <p>Muchas Gracias por su compra !</p>
            <p>Se ha enviado un <strong>correo electronico</strong> con los detalles de su compra</p>
          `,
        icon: 'success',
        showConfirmButton: true,
        confirmButtonText: 'Ver más productos',
        confirmButtonColor: '#198754',
      }).then((result) => {
        if (result.isConfirmed) {
          // El usuario hizo clic en "Ir al carrito"
          window.location.href = '/products';
        }
      });

    } catch (error) {
      console.error(error);
    }
  }

  const handleRemove = async (cartId, productId) => {
    try {

      // Realizar una solicitud DELETE al backend para eliminar el producto del carrito
      const response = await fetch(`${baseUrl}/api/carts/${cartId}/product/${productId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('No se pudo eliminar el producto del carrito.');
      }

      // Actualizar el estado del carrito después de eliminar el producto
      const updatedCart = cart.products.filter((product) => product.product._id !== productId);
      setCart({ ...cart, products: updatedCart });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <section className="h-100 h-custom">
        <div className="container py-5 h-100">
          <div className="cart-container row d-flex justify-content-center align-items-center h-100">
            <div className="col-12">
              <div
                className="card-reg card card-registration card-registration-2"
              >
                <div className="card-body p-0">
                  <div className="row g-0">
                    <div className="col-lg-8">
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <h1 className="fw-bold mb-0 text-black">Carrito de compras</h1>
                        </div>
                        <hr className="my-4" />

                        {cart && cart.products.map((product) => {
                          // Calculamos el subtotal para este producto
                          const subtotal = product.product.price * product.quantity;

                          // Sumamos el subtotal al totalAmount
                          totalAmount += subtotal;

                          return (
                            <div
                              className="row mb-4 d-flex justify-content-between align-items-center"
                              key={product.product._id}
                            >
                              <div className="col-md-2 col-lg-2 col-xl-2">
                                {/* <img
                                  src={product.product.thumbnails}
                                  className="img-fluid rounded-3"
                                  alt={product.product.title}
                                /> */}
                              </div>
                              <div className="col-md-3 col-lg-3 col-xl-3">
                                <h6 className="text-black mb-0">{product.product.title}</h6>
                                <h6 className="text-muted">{product.product.category}</h6>
                              </div>
                              <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                {/* Renderiza los controles para la cantidad */}
                                {/* Botón de restar producto */}
                                {/* <button
                                  className="btn btn-link px-2"
                                  onClick={() => handleDecrement(product.id)}
                                >
                                  <i className="fas fa-minus" />
                                </button> */}
                                <input
                                  id={`quantity-${product._id}`}
                                  min={0}
                                  name="quantity"
                                  value={product.quantity}
                                  type="text"
                                  className="form-control form-control-sm text-center"
                                  readOnly
                                />
                                {/* Botón de sumar producto */}
                                {/* <button
                                  className="btn btn-link px-2"
                                  onClick={() => handleIncrement(product.id)}
                                >
                                  <i className="fas fa-plus" />
                                </button> */}
                              </div>
                              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h6 className="mb-0">{`$ ${subtotal}`}</h6>
                              </div>

                              {/* Boton para eliminar producto del carrito */}
                              <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                <a
                                  href="#!"
                                  className="text-muted"
                                  onClick={() => handleRemove(cart._id, product.product._id)}
                                >
                                  <ClearIcon />
                                </a>
                              </div>
                              <hr className="my-4" />
                            </div>
                          );
                        })}

                        <div className="pt-5">
                          <h6 className="mb-0">
                            <Link to={'/products'} className="text-body">
                              ← Ver más productos
                            </Link>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 bg-grey">
                      <div className="p-5">
                        <h3 className="fw-bold mb-5 mt-2 pt-1">Resumen</h3>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between mb-4">
                          <h5 className="text-uppercase">{`${cart && cart.products ? cart.products.length : 0} Productos`}</h5>
                        </div>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between mb-5">
                          <h5 className="text-uppercase">Total</h5>
                          <h5>{`$ ${totalAmount}`}</h5>
                        </div>
                        <button
                          type="button"
                          className="btn btn-dark btn-block btn-lg"
                          data-mdb-ripple-color="dark"
                          onClick={handlePagar}
                        >
                          Pagar
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

    </>
  )
}

export default ShoppingCart