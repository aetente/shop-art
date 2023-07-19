import Image from "next/image"

const categoriesData = [
  {
    name: 'category',
    img: '/test/test10im2.png'
  },
  {
    name: 'category',
    img: '/test/test10im2.png'
  },
  {
    name: 'category',
    img: '/test/test10im2.png'
  },
  {
    name: 'category',
    img: '/test/test10im2.png'
  },
  {
    name: 'category',
    img: '/test/test10im2.png'
  },
  {
    name: 'category',
    img: '/test/test10im2.png'
  },
  {
    name: 'category',
    img: '/test/test10im2.png'
  },
  {
    name: 'category',
    img: '/test/test10im2.png'
  },
  {
    name: 'category',
    img: '/test/test10im2.png'
  },
  {
    name: 'category',
    img: '/test/test10im2.png'
  },
  {
    name: 'category',
    img: '/test/test10im2.png'
  },
  {
    name: 'category',
    img: '/test/test10im2.png'
  },
  {
    name: 'category',
    img: '/test/test10im2.png'
  },
  {
    name: 'category',
    img: '/test/test10im2.png'
  },
  {
    name: 'category',
    img: '/test/test10im2.png'
  },
  {
    name: 'category',
    img: '/test/test10im2.png'
  },
  {
    name: 'category',
    img: '/test/test10im2.png'
  },
  {
    name: 'category',
    img: '/test/test10im2.png'
  },
  {
    name: 'category',
    img: '/test/test10im2.png'
  },
  {
    name: 'category',
    img: '/test/test10im2.png'
  },
  {
    name: 'category',
    img: '/test/test10im2.png'
  },
  {
    name: 'category',
    img: '/test/test10im2.png'
  },
  {
    name: 'category',
    img: '/test/test10im2.png'
  },
  {
    name: 'category',
    img: '/test/test10im2.png'
  },
  {
    name: 'category',
    img: '/test/test10im2.png'
  }
]

function Categories() {

  const mapCategories = (c:any, i:number) => {
    return (
      <div key={`category-${i}`} className='category-card'>
        <p>{c.name}</p>
        <div className="relative w-full h-full min-w-[168px] min-h-[168px] mt-2">
          <Image
            layout='fill'
            src={c.img}
            alt={c.name}
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    )
  }

  return (
    <div
      className='wrap-categories'
    >
      
      {categoriesData.map(mapCategories)}
    </div >
  )
}

export default Categories