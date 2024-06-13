import { Link, Form} from 'react-router-dom'
import './Authform.css'
import { useState } from 'react';
import { useLogin, useSignup } from '../../utils';
import displayImg from '../../assets/login-display-img.jpg'



const Authform = () => {
   const [authMode, setAuthMode] = useState('login')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: "",
  })

  const {errorStage, loading, fetchSignup} = useSignup()
 const {loginError, logloading, fetchLogin} = useLogin()



  // const isLogin = searchParams.get('mode') === 'login'


  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const login = async () => {
    console.log("Logging in data", formData);
    fetchLogin(formData)
  }

  const signup = async (e) => {
    console.log("signing up data", formData)
    fetchSignup(formData)
  }

  const switchAuth = () => {
    setAuthMode(prev=> prev === 'login' ? 'signup' : 'login')
  }

  return (
    <div className='authContainer'>
      <div className='display-pic'>
        <img src={displayImg} alt="display"/>
      </div>
      <Form className='form'>
        <h1>{authMode === 'login' ? 'Log in' : 'Sign up'}</h1>
        <p className='detailsText'>Enter your details below</p>
        {errorStage && <p className='error'>User Registration fails! use a unique details</p>}
        {loginError && <p className='error'>user not found, Please verify details</p>}
        {authMode === 'signup' && <p>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id='username'
            name='username'
            onChange={handleChange}
            value={formData.username}
            required/>
        </p>}
        <p>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            required />
        </p>
        <p>
          <label htmlFor='image'>Password</label>
          <input
            id="password"
            type='password'
            name="password"
            onChange={handleChange}
            value={formData.password}
            minLength={6}
            required />
        </p>
        <div className='actions'>
          <Link to={`?mode= ${authMode === 'login' ? 'signup' : 'login'}`} onClick={switchAuth}>{authMode === 'login' ? 'Register' : 'Login'}</Link>
          <button onClick={() => authMode === 'login' ? login(): signup()}>{loading || logloading ? 'Submitting...' : `${authMode === 'login' ? 'Login' : 'Signup'}`}</button>
        </div>
      </Form>
    </div>
  )
}

export default Authform
