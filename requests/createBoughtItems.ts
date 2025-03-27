import nookies from 'nookies';

export async function createBoughtItems(dataToUpdate: any) {
  try {
    const cookies = nookies.get();
    if (cookies['jwt']) {
      const res = await fetch(process.env.NEXT_PUBLIC_STRIPE + '/api/buy-items', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cookies['jwt']}`,
        },
        body: JSON.stringify(dataToUpdate)
      })
      const data = await res.json()
      console.log("data", data)
      return true
    } else {
      throw "no jwt token"
    }
  } catch(e) {
    console.error('Error SIGN UP:', e)
  }
  return false
}