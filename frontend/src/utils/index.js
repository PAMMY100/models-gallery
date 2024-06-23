import { useState } from "react";

export function useSignup(fetchSignup) {
  const [errorStage, setErrorStage] = useState(false)
  const [loading, setLoading] = useState(false)

    fetchSignup = async (formData) => {
      setLoading(true)
      const response = await fetch(`https://models-gallery-api.vercel.app/signup`, {
          mode: 'no-cors',
          method: 'POST',
          headers: {
            Accept: 'application/form-data',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        const data = await response.json()

        setLoading(false)
        if(!data.success) {
          setErrorStage(true)
        }
        else {
          localStorage.setItem('token', data.token)
          window.location.replace('/')
        }
    }
  return {
    errorStage,
    loading,
    fetchSignup
  }
}

export function useLogin() {
  const [errorMode, setErrorMode] = useState(false)
  const [loading, setLoading] = useState(false)
    const fetchLogin = async (formData) => {
    setLoading(true)
    const response = await fetch(`https://models-gallery-api.vercel.app/login`, {
        mode: 'no-cors',
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      setLoading(false)
      const data = await response.json()
      if(!data.success) {
        setErrorMode(true)
      }
      else {
        localStorage.setItem('token', data.token)
        window.location.replace('/')
      }
    }
  return {
    loginError: errorMode,
    logloading: loading,
    fetchLogin
  }
}

export function getAuthToken () {
  const token = localStorage.getItem('token');
  return token;
}

export async function addToDatabase (data) {

  if(localStorage.getItem('token')) {
    const response = await fetch('https://models-gallery-api.vercel.app/addtocart',{
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'token': `${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'Items': data})
    })
    // .then((response) => response.json())
    // .then((data) => console.log(data));
    return await response.json()
  }
}

export async function removeFromDatabase (data) {

  if(localStorage.getItem('token')) {
    const response = await fetch('https://models-gallery-api.vercel.app/removefromcart',{
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'token': `${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'Items': data})
    })
    // .then((response) => response.json())
    // .then((data) => console.log(data));
    return await response.json()
  }
}
