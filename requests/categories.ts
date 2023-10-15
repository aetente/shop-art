export async function getCategories() {
  try {
    const res = await fetch('http://localhost:1337/api/categories?populate=*', {
      method: 'GET'
    })
    
    console.log('getCategories', res)
    const data = await res.json()
    console.log('getCategories', data)
    return data;
  } catch(e) {
    console.error('Error getCategories', e)
  }
  return null;
}