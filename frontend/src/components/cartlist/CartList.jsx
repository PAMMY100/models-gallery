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
      <div className='cart-item'>
        <img src={props.item.img} alt="productImage" />
        <div className="cart-elements">
          <p>{props.item.category}</p>
          <p>Price - ${props.item.price}</p>
          <p>qty - {props.item.quantity}</p>
        </div>
        <p>
          <button className='cartbtn' onClick={addItem}>+</button>
          <button className='cartbtn' onClick={removeItem}>-</button>
        </p>
        <p className="price">Total - ${Number(props.item.totalPrice)}</p>
      </div>
  )
}

export default CartList
