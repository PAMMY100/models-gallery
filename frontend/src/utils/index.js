import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";

export function useSignup(fetcher, error, state) {
  const [errorStage, setErrorStage] = useState(false)
  const [loading, setIsLoading] = useState(false)

   fetcher = async function signupUser(formData) {
    const mode = 'login' || 'signup'
    setIsLoading(true)
    const response = await fetch(`http://localhost:4000/${mode}`, {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      setIsLoading(false)
      //get the token
      if(!response.ok) {
        setErrorStage(true)
      }
      const data = await response.json();
      localStorage.setItem('token', data.token)
      redirect("/")

  }
  return {
    error: errorStage,
    state: loading,
    fetcher 
  }
}

export function getAuthToken() {
  const token = localStorage.getItem('token');
  return token;
}


export async function useName() {
  const [fetchdata, setFetchData] = useState(null)
    useEffect(() => {
    fetch('http://localhost:4000/user')
      .then(res => res.json())
      .then(data => setFetchData(data.username))
    }, [])
  
    return {
      fetchdata
    }
}