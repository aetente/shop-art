export async function signUp(email:string, password:string) {
  try {
    const res = await fetch('https://localhost:1337/auth/local/register', {
      method: 'POST',
      body: JSON.stringify({
        username: email,
        email,
        password
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    })
    
    const data = await res.json()
    console.log('signUp', data)
    // localStorage.setItem("jwt", data.data.jwt);
    return true
  } catch(e) {
    console.error('Error SIGN UP:', e)
  }
  return false
}