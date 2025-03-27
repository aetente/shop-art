import nookies from 'nookies';

export async function updateUser(userId:string, dataToUpdate: any) {
  try {
    const cookies = nookies.get();
    if (cookies['jwt']) {
      const res = await fetch(process.env.NEXT_PUBLIC_STRIPE + '/api/users/' + userId, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${cookies['jwt']}`,
          "Content-Type": "application/json",
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