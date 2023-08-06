export async function getCategories() {
  try {
    const res = await fetch('https://shop-art-strapi.onrender.com/api/categories?populate=thumbnail', {
      method: 'GET',
    })
    
    console.log('getCategories', res)
    const data = await res.json()
    console.log('getCategories', data)
  } catch(e) {
    console.error('Error getCategories', e)
  }
}