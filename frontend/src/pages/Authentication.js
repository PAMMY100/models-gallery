import { json, redirect } from "react-router-dom";
import Authform from "../components/Authform/Authform";



export default function Authentication () {

  return (
    <>
      <Authform />
    </>
  )
}

export async function action({request}) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'signup') {
    throw json({message: 'Unsupported mode.'}, { status: 422 })
  }

  const data = await request.formData()
  const authData = {
    username: data.get('username'),
    email: data.get('email'),
    password: data.get('password'),
  }

  console.log(authData)

  const response = await fetch('http://localhost:4000/' + mode, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(authData)
  })

  if (!response.success) {
    throw json({message: 'Could not authenticate user.'}, { status : 500 })
  }

  //geting the token;
  const resData = response.json();
  const token = resData.token

  localStorage.setItem('token', token);
  alert('register successfully')

  return redirect('/')
}