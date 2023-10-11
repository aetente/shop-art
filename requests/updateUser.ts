import nookies from 'nookies';

export async function updateUser(userId:string, dataToUpdate: any) {
  try {
    const cookies = nookies.get();
    console.log("jwt", cookies['jwt'], cookies)
    if (cookies['jwt']) {
      const res = await fetch('http://localhost:1337/api/users/' + userId, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${cookies['jwt']}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToUpdate)
      })
      console.log('updateUser res', res)
      const data = await res.json()
      console.log('updateUser', data)
      return true
    } else {
      throw "no jwt token"
    }
  } catch(e) {
    console.error('Error SIGN UP:', e)
  }
  return false
}