import './Footer.css'
import instaIcon from  '../../assets/instagram.gif'
import facebook from '../../assets/facebook.gif'
import twitter from '../../assets/twitter.gif'
import whatsapp from '../../assets/whatsapp.gif'
import qrcode from '../../assets/Qrcode 1.png'
import playstore from '../../assets/Frame 718.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='exlusive'>
        <h1>Exclusive</h1>
        <p>Subscribe</p>
        <p>Get 100 off your first order</p>
        <input type="text" />
      </div>
      <div className='support'>
        <h1>Support</h1>
        <p>111 Bijoy Sarani Dhaka</p>
        <p>exclusive@gmail.com</p>
        <p>+88015-88888-9999</p>
      </div>
      <div className='account'>
        <h1>Account</h1>
        <p>My Account</p>
        <p>Login / Register</p>
        <p>Cart</p>
        <p>Wishlist</p>
        <p>Shop</p>
      </div>
      <div className='quicklinks'>
        <h1>Quick Link</h1>
        <p>Privacy Policy</p>
        <p>Terms Of Use</p>
        <p>FAQ</p>
        <p>Contact</p>
      </div>
      <div className='social-container'>
        <h1>Download App</h1>
        <p>Save $3 with App New User Only</p>
        <p>
          <img className='qr' src={qrcode} alt="qr code"/>
          <img className='play' src={playstore} alt="playstore"/>
        </p>
        <div className='socials'>
          <img src={instaIcon} alt="instagram icon" />
          <img src={facebook} alt='facebook icon' />
          <img src={twitter} alt="twitter icon" />
          <img src={whatsapp} alt="whatsapp icon"/>
        </div>
      </div>
    </div>
  )
}

export default Footer
