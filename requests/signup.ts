import axios from 'axios';

export async function signUp(email:string, password:string) {
  try {
    // await axios
    //   .post('http://localhost:1337/auth/local/register', {
    //     username: 'test@test.com',
    //     email: 'test@test.com',
    //     password: 'Password',
    //   })
    //   .then(response => {
    //     console.log('User profile', response.data.user);
    //     console.log('User token', response.data.jwt);
    //   })
    //   .catch(error => {
    //     console.log('An error occurred:', error.response);
    //   });
    const res = await fetch('http://localhost:1337/api/auth/local/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        email: email,
        password: password
      })
    })
    
    console.log('signUp res', res)
    const data = await res.json()
    console.log('signUp', data)
    // localStorage.setItem("jwt", data.data.jwt);
    return true
  } catch(e) {
    console.error('Error SIGN UP:', e)
  }
  return false
}