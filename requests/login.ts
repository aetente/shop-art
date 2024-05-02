import axios from 'axios';
import { setCookie } from 'nookies'

export async function logIn(identifier: any, password: any) {

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

    if (data?.error) {
      return false
    }


    const meRes = await fetch('http://localhost:1337/api/users/me?populate[bought_items][populate][file_download][populate][0]=file', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${data.jwt}`,
        "Content-Type": "application/json",
      }
    })
    
    const meData = await meRes.json();
    
    console.log("data", data)
    console.log("meData", meData)

    localStorage.setItem("boughtItems", JSON.stringify(meData.bought_items));
    setCookie({ res }, 'jwt', data.jwt, {
      httpOnly: false,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    setCookie({ res }, 'userId', data.user.id, {
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