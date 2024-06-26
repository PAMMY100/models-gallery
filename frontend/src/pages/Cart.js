import { useDispatch, useSelector } from "react-redux";
import CartList from "../components/cartlist/CartList";
import CartSummary from "../components/CartSummary/CartSummary";
import './Css/Cart.css'
import { checkoutActions } from "../store/checkout-slice";
// import Checkout from "../components/Checkout/Checkout";
import { getAuthToken } from "../utils";
import CheckoutForm from "../components/Checkout/CheckoutForm";
import { useEffect } from "react";
import { fetchCart } from "../store/cart-slice";


export default function Cart () {
  const token = getAuthToken()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCart())
  },[dispatch])

  const products = useSelector(state => state.cart)
  const count = useSelector(state => state.cart.totalQuantity)
  const isOpen = useSelector(state=> state.checkout.checkoutStatus)



  const handleOpenCheckout = () => {
    dispatch(checkoutActions.openCheckout())
  }

  return (
     <div className="cart">
      {count > 0 && <div className="cartDescription">
        <p className='product'>Product</p>
        <p className="priceP">Price</p>
        <p className="quantity">Quantity</p>
        <p className="subtotal">Subtotal</p>
      </div>}
      <ul className="cart-items">
        {
          products.items.map(item =>
          <li key={item.id}>
            <CartList key={item.id} item={item} id={item.id} />
          </li>
          )
        }
      </ul>
      { count > 0 && <CartSummary
        summary="cart-summary"
        hr='hr'
        breakdown= 'breakdown'
        tax= 'tax'
        subTotal= 'subTotal'
        tp= 'tp'
        paybtn= 'paybtn'
        products={products}
        openCheckout={handleOpenCheckout}
      />}
      {token ? isOpen &&  <CheckoutForm /> : alert('Kindly Login/Register to checkout cart')}
    </div>
  )
}