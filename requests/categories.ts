export async function getCategories() {
  try {
    const res = await fetch('http://localhost:80/shopart/api/categories&output_format=JSON', {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa((process.env.NEXT_PUBLIC_PRESTASHOP_KEY as string) + ':'),
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    console.log('getCategories', data)
  } catch(e) {
    console.error('Error getCategories', e)
  }
}