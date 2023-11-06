export async function getProducts(categoryId: string | string[] | undefined) {
  try {
    // populate[file_download][populate]=*
    // populate[images][populate]=*
    const res = await fetch(`http://localhost:1337/api/products?filters[category][catID][$eq]=${categoryId}&populate=*`, {
      method: 'GET'
    })
    
    console.log('getProducts', res)
    const data = await res.json()
    console.log('getProducts', data)
    return data;
  } catch(e) {
    console.error('Error getProducts', e)
  }
  return null;
}