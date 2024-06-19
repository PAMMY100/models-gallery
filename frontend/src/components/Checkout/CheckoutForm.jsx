import React from 'react'
import Modal from '../Modal/Modal'
import { useDispatch } from 'react-redux'
import { checkoutActions } from '../../store/checkout-slice'
import { Form } from 'react-router-dom'
import './Checkout.css'

const CheckoutForm = () => {

  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(checkoutActions.closeCheckout())
  }

  return (
    <Modal onClose={handleClose}>
      <div>
        <h1 className='checkoutText'>Checkout cart</h1>
        <Form>
          <div className='namePh-field'>
            <p className='name'>
              <input type="text" name="name" id="name" placeholder='name' required/>
            </p>
            <p className='phone'>
              <input type="tel" name='phone' id='phone' placeholder='phone' required/>
            </p>
          </div>
          <p className='street'>
            <input type="text" name='address' id='address' placeholder='Address' required/>
          </p>
          <div className='state-field'>
              <p className='city'>
                <input type="text" name='city' id='city' placeholder='city' required/>
              </p>
              <p className='state'>
                <input type="text" name='state' id='state' placeholder='state'/>
              </p>
              <p className='pCode'>
                <input type="number" name='postCode' id='postCode' placeholder='post-code' required/>
              </p>
            </div>
            <p className='checkbox'>
              <input type='checkbox' name='billing'/>
              <span>Use as my Billing Address</span>
            </p>
            <div className='checkout-btn'>
              <button onClick={handleClose}>Close</button>
              <button >Continue</button>
            </div>
          </Form>
        </div>
      </Modal>
  )
}

export default CheckoutForm
