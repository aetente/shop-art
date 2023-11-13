export async function getCategories() {
  try {
    const res = await fetch('http://localhost:1337/api/categories?populate=thumbnail', {
      method: 'GET'
    })
    
    const data = await res.json()
    return data;
  } catch(e) {
    console.error('Error getCategories', e)
  }
  return null;
}