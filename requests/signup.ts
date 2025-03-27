

export async function signUp(email:string, password:string) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_STRIPE + '/api/auth/local/register', {
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
    
    const data = await res.json()
    // localStorage.setItem("jwt", data.data.jwt);
    return true
  } catch(e) {
    console.error('Error SIGN UP:', e)
  }
  return false
}