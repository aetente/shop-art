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

    // setCookie({ res }, 'jwt', postRes.data.jwt, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV !== 'development',
    //   maxAge: 30 * 24 * 60 * 60,
    //   path: '/',
    // });
    
    console.log('logIn res', res)
    const data = await res.json()
    console.log('logIn', data)
    return true;
  } catch (e) {
    console.error('Error LOG IN:', e)
    return false;
  }
  return false;
}