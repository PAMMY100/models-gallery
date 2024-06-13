import './CartList.css'
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

const CartList = (props) => {
  const dispatch = useDispatch();
  const {id, price} = props.item

  const addItem = () => {
    dispatch(cartActions.addToCart({id, price}))
  }


  const removeItem = () => {
    dispatch(cartActions.removeFromCart(id))
  }

  return (
    <>
      <div className='cart-item'>
        <img src={props.item.img} alt="productImage" />
        <div className="cart-elements">
          <p>{props.item.category}</p>
          <p>${props.item.price}</p>
          
        </div>
        <div className='quantity-container'>
          <p className='quantityDigit'>{props.item.quantity}</p>
          <p className='button-container'>
          <button className='cartbtn' onClick={addItem}>+</button>
          <button className='cartbtn' onClick={removeItem}>-</button>
        </p>
        </div>
        <p className="price">${Number(props.item.totalPrice)}</p>
      </div>
      <hr />
    </>
  )
}

export default CartList
