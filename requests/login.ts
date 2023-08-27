import axios from 'axios';
import { setCookie } from 'nookies'

export async function  logIn(identifier:any, password:any) {

  try {
    const res = await fetch('http://localhost:1337/api/auth/local', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      })
    })
    
    const data = await res.json()
    console.log('logIn', data)

    setCookie({ res }, 'jwt', data.jwt, {
      httpOnly: false,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    localStorage.setItem('loggedIn', 'true');
    return true;
  } catch (e) {
    console.error('Error LOG IN:', e)
    return false;
  }
  return false;
}