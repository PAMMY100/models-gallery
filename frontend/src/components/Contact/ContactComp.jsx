import { Form } from 'react-router-dom'
import './Contact.css'
import email from '../../assets/email.svg'
import mobile from '../../assets/mobile.svg'
import Footer from '../Footer/Footer'

const ContactComp = () => {
  return (
    <>
      <div className='contact'>
        <div className='contact-text'>
            <div className='tel'>
              <img src={mobile} alt="" />
              <h3>Call to Us</h3>
            </div>
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone: <span>+8801611122</span></p>
            <hr className='hr'/>
            <div className='email'>
              <img src={email} alt="" />
              <h3>Write To Us</h3>
            </div>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p>Emails: customer@exclusive.com</p>
        </div>
        <Form className='contact-form'>
          <div className="col2">
            <p>
              <input type="text" placeholder='your name' name='fullname' required/>
            </p>
            <p>
              <input type="tel" placeholder='Your phone' name='phone' required/>
            </p>
            <p>
              <input type='email' placeholder='Your email' name='enail' required/>
            </p>
          </div>

          <p>
            <textarea name="message" placeholder='Your Message' id="" col='' required/>
          </p>
          <div className='action'>
            <button className='btn'>Send Message</button>
          </div>
        </Form>
      </div>
      <Footer />
    </>
  )
}

export default ContactComp
