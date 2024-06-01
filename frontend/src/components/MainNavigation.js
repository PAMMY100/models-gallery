import { NavLink, Link, useSearchParams, Form } from 'react-router-dom'
import './MainNavigation.css'
import Button from './ui/Button'
import { useSelector } from 'react-redux'
import cart from '../assets/cart_icon.png'
import menu from '../assets/icons8-menu-64.png'
import close from '../assets/icons8-close-window-48.png'
import { useRef, useState } from 'react'
import { getAuthToken, useName } from '../utils'


export default function MainNavigation () {
  const [toggleMenu, setToggleMenu] = useState(false)
  const menuRef = useRef()
  const [searchParams] = useSearchParams();
  const count = useSelector(state => state.cart.totalQuantity)
  const isLogin = searchParams.get('mode') === 'login'
  const token = getAuthToken()
  const { fetchdata } = useName()

  const handleToggleMenu = () => {
    setToggleMenu(prev => !prev)
    menuRef.current.classList.toggle('nav-menu-visible')
  }

  let display;
  if (toggleMenu) {
    display = close
  } else {
    display = menu
  }

  return (
    <header>
      <h1 className='logo'>logo</h1>
      <img className='menu' src={display} alt="" onClick={handleToggleMenu} />
      <div ref={menuRef} className='nav-container'>
        <ul className='navMenu'>
          <li><NavLink to='/' className={({isActive}) => isActive ? 'active' : undefined} end>HOME</NavLink></li>
          <li><NavLink to='/gallery' className={({isActive}) => isActive ? 'active' : undefined}>GALLERY</NavLink></li>
          <li><NavLink to='/about' className={({isActive}) => isActive ? 'active': undefined}>ABOUT</NavLink></li>
          <li><NavLink to='/contact' className={({isActive}) => isActive ? 'active' : undefined}>CONTACT</NavLink></li>
        </ul>
        <div className='cartContainer'>
          {!token && <Link to="/auth?mode=login"><Button>{isLogin ? 'Signup' : 'Login'}</Button></Link>}
          {fetchdata && <p>{fetchdata}</p>}
          <Link to={`${count > 0 ? '/cart' : '/'}`}>
            <div className='cartDiv'>
              <p className='count'>{count > 0 && (count)}</p>
              <img className='cartImg' src={cart} alt=""/>
            </div>
          </Link>
          {token && <Form method='post' action='/logout'>
            <button>Logout</button>
          </Form>}
        </div>
      </div>
    </header>
  )
}