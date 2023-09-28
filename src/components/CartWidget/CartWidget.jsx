import './CartWidget.css'
import { Link } from 'react-router-dom'
/* import { useContext } from 'react'
import { CarritoContext } from '../../context/CarritoContext'
import { calcularCantidadTotal } from "../Cart/Cart"; */

const CartWidget = () => {
/*   const { carrito } = useContext(CarritoContext);
  const totalCantidad = calcularCantidadTotal(carrito); */
  const imgCarrito = "/carrito-de-compras.png"
  return (
    <Link to='/cart' className='link-carrito-container'>
        <img className='carritoDeCompras img-fluid' src={imgCarrito} alt="carrito de compras de great templates" />
        {/* {
          totalCantidad
        } */}
    </Link>

  )
}

export default CartWidget


