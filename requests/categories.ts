export async function getCategories() {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_STRIPE + '/api/categories?populate=thumbnail', {
      method: 'GET'
    })
    
    const data = await res.json()
    return data;
  } catch(e) {
    console.error('Error getCategories', e)
  }
  return null;
}