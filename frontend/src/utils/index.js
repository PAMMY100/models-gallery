import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const [errorStage, setErrorStage] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchSignup = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch('https://models-gallery-api.vercel.app/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Signup request failed');
      }

      const data = await response.json();
      setLoading(false);

      if (!data.success) {
        setErrorStage(true);
      } else {
        localStorage.setItem('token', data.token);
        navigate('/'); // Navigate to home or desired route after signup
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setLoading(false);
      setErrorStage(true);
    }
  };

  return {
    errorStage,
    loading,
    fetchSignup,
  };
}

export function useLogin() {
  const [errorMode, setErrorMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchLogin = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch('https://models-gallery-api.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      setLoading(false);

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMode(true);
        console.error('Login error:', errorData.message);
        return;
      }

      const data = await response.json();

      if (!data.success) {
        setErrorMode(true);
        return;
      }

      localStorage.setItem('token', data.token);
      navigate('/'); // Redirect to home or desired route
    } catch (error) {
      setLoading(false);
      setErrorMode(true);
      console.error('Network or server error:', error);
    }
  };

  return {
    loginError: errorMode,
    logloading: loading,
    fetchLogin
  };
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
