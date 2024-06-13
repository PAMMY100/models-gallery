import { useState } from "react";

export function useSignup(fetchSignup) {
  const [errorStage, setErrorStage] = useState(false)
  const [loading, setLoading] = useState(false)

    fetchSignup = async (formData) => {
      setLoading(true)
      const response = await fetch(`http://localhost:4000/signup`, {
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
    const response = await fetch(`http://localhost:4000/login`, {
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


// export async function useName() {
//   const [fetchdata, setFetchData] = useState(null)
//     useEffect(() => {
//     fetch('http://localhost:4000/user')
//       .then(res => res.json())
//       .then(data => setFetchData(data.username))
//     }, [])

//     return {
//       fetchdata
//     }
// }