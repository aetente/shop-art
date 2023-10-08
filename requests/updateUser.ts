
export async function updateUser(userId:string, dataToUpdate: any) {
  try {
    const res = await fetch('http://localhost:1337/api/users/' + userId, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToUpdate)
		})
    console.log('updateUser res', res)
    const data = await res.json()
    console.log('updateUser', data)
    return true
  } catch(e) {
    console.error('Error SIGN UP:', e)
  }
  return false
}