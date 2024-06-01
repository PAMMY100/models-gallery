import React from 'react'
import { useSelector } from 'react-redux'

const CartSummary = (props) => {
  const status = useSelector(state => state.checkout.checkoutStatus)
  const totalPrice = props.products.items.reduce((total, product) => total + product.totalPrice * product.quantity
  , 0)

  const total = totalPrice + 10

  console.log(status)

  return (
    <div className={props.summary}>
      <h1>Cart price</h1>
      <hr className={props.hr} />
      <div className={props.breakdown}>
        <p className={props.tax}>Tax: <span>${10}</span></p>
        <p className={props.subTotal}>SubTotal Price: <span>${totalPrice}</span></p>
        <p className={props.tp}>Total Price: <span>${total}</span></p>
        <button className={props.paybtn} onClick={props.openCheckout}>Pay now</button>
      </div>
   </div>
  )
}

export default CartSummary
