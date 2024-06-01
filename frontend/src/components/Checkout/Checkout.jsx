import { Form } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { checkoutActions } from '../../store/checkout-slice'
import './Checkout.css'
const Checkout = () => {

  const dispatch = useDispatch()


  const handleClose = () => {
    dispatch(checkoutActions.closeCheckout())
  }


  return (
    <aside className='checkout-container'>
      <div className='modal'>
        <h1>Checkout your Items</h1>
        <Form>
          <div className='namePh-field'>
            <p className='name'>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" required/>
            </p>
            <p className='phone'>
              <label htmlFor="phone">Phone</label>
              <input type="tel" name='phone' id='phone' required/>
            </p>
          </div>
          <p className='street'>
            <label htmlFor="address">Address</label>
            <input type="text" name='address' id='address' required/>
          </p>
          <div className='state-field'>
            <p className='city'>
              <label htmlFor="city">City</label>
              <input type="text" name='city' id='city' required/>
            </p>
            <p className='state'>
              <label htmlFor="state">State</label>
              <input type="text" name='state' id='state'/>
            </p>
            <p className='pCode'>
              <label htmlFor="PostCode">Post Code</label>
              <input type="number" name='postCode' id='postCode' required/>
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
    </aside>
  )
}

export default Checkout
