import nookies from 'nookies';

export async function updateUser(dataToUpdate: any) {
  try {
    const cookies = nookies.get();
    if (cookies['jwt']) {
      const res = await fetch('http://localhost:1337/api/bought-items', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cookies['jwt']}`,
        },
        body: JSON.stringify(dataToUpdate)
      })
      const data = await res.json()
      return true
    } else {
      throw "no jwt token"
    }
  } catch(e) {
    console.error('Error SIGN UP:', e)
  }
  return false
}