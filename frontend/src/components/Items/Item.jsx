import './Item.css'
import { useDispatch } from "react-redux"
import { cartActions } from "../../store/cart-slice"
const Item = (props) => {
  const dispatch = useDispatch()
  const {id, category, img, price} = props

  const addItemToCart = () => {
    dispatch(cartActions.addToCart({ id, category, img, price}))
  //   if(localStorage.getItem('token')) {
  //     fetch ('http://localhost:4000/addtocart', {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/form-data',
  //         'token': `${localStorage.getItem('token')}`,
  //         'Cotent-Type': 'application/json',
  //       },
  //       body: JSON.stringify({'itemId': id})
  //     })
  //       .then((response) => response.json())
  //       .then((data) => console.log(data))
  //   }
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
