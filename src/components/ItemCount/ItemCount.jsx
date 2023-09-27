import './ItemCount.css'
import { useState } from 'react';


const ItemCount = ({ stock, inicial, onItemCountChange }) => {
  const [itemCount, setItemCount] = useState(inicial);

  const sumar = () => {
    if (itemCount < stock) {
      setItemCount(itemCount + 1);
      onItemCountChange(itemCount + 1);
    }
  }

  const restar = () => {
    if (itemCount > inicial) {
      setItemCount(itemCount - 1);
      onItemCountChange(itemCount - 1);
    }
  }

  return (
    <div className='d-flex justify-content-center'>
      <div className='d-flex justify-content-center'>
        <div className="d-flex justify-content-evenly align-items-center">
          <div className='btn_border d-flex justify-content-between align-items-center'>
            <button className='btn1 btn btn-outline-secondary' onClick={restar}> - </button>
            <strong className='px-3'> {itemCount} </strong>
            <button className='btn1 btn btn-outline-secondary' onClick={sumar} > + </button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ItemCount