export async function getProducts(categoryId: string | string[] | undefined) {
  try {
    // populate[file_download][populate]=*
    // populate[images][populate]=*
    const res = await fetch(`http://localhost:1337/api/products?filters[categories][id][$contains]=${categoryId}&populate[images][populate][0]=images&populate[file_download][populate][0]=file`, {
      method: 'GET'
    })
    
    const data = await res.json()
    return data;
  } catch(e) {
    console.error('Error getProducts', e)
  }
  return null;
}