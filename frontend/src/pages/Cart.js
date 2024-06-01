import { useDispatch, useSelector } from "react-redux";
import CartList from "../components/cartlist/CartList";
import CartSummary from "../components/CartSummary/CartSummary";
import './Css/Cart.css'
import { checkoutActions } from "../store/checkout-slice";
import Checkout from "../components/Checkout/Checkout";

export default function Cart () {
  const dispatch = useDispatch()
  const products = useSelector(state => state.cart)
  const count = useSelector(state => state.cart.totalQuantity)
  const isOpen = useSelector(state=> state.checkout.checkoutStatus)

  const handleOpenCheckout = () => {
    dispatch(checkoutActions.openCheckout())
  }

  return (
    <div className="cart">
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
      {isOpen && <Checkout />}
    </div>
  )
}