import './Footer.css'
import instaIcon from  '../../assets/instagram.gif'
import facebook from '../../assets/facebook.gif'
import twitter from '../../assets/twitter.gif'
import whatsapp from '../../assets/whatsapp.gif'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='socials'>
        <div className='instagram'>
          <img src={instaIcon} alt="instagram icon" />
        </div>
        <div className='facebook'>
          <img src={facebook} alt='facebook icon' />
        </div>
        <div className='twitter'>
          <img src={twitter} alt="twitter icon" />
        </div>
        <div className='whatsapp'>
          <img src={whatsapp} alt="whatsapp icon"/>
        </div>
      </div>
      <div className='links'>
          <p>About us</p>
          <p>Security</p>
          <p>Privacy policy</p>
          <p>Terms of service</p>
      </div>
    </div>
  )
}

export default Footer
