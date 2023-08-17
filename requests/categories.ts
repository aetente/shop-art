export async function getCategories() {
  try {
    const res = await fetch('http://localhost:1337/api/categories?populate=thumbnail', {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    })
    
    console.log('getCategories', res)
    const data = await res.json()
    console.log('getCategories', data)
  } catch(e) {
    console.error('Error getCategories', e)
  }
}