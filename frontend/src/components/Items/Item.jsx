import './Item.css'
import { useDispatch } from "react-redux"
import { cartActions } from "../../store/cart-slice"
const Item = (props) => {
  const dispatch = useDispatch()
  const {id, category, img, price} = props

  const addItemToCart = () => {
    dispatch(cartActions.addToCart({ id, category, img, price}))
    alert('Item added to cart')
  }

  return (
    <div className="item">
      <img src={props.img} className='model-img' alt={props.category}/>
      <p>{props.category}</p>
      <p className="item-price">${props.price}</p>
      <button className='product-btn' onClick={addItemToCart}>Add to Cart</button>
    </div>
  )
}

export default Item
