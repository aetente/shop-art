import Image from 'next/image'
import { useRouter } from 'next/router'

const categoriesData = [
  {
    name: 'category',
    img: '/test/test_image1.jpg'
  },
  {
    name: 'category',
    img: '/test/test_image1.jpg'
  },
  {
    name: 'category',
    img: '/test/test_image1.jpg'
  },
  {
    name: 'category',
    img: '/test/test_image1.jpg'
  },
  {
    name: 'category',
    img: '/test/test_image1.jpg'
  },
]

function Categories() {

  const router = useRouter()

  const mapCategories = (c:any, i:number) => {
    return (
      <div key={`category-${i}`} className='grid w-full relative pb-[100%]'>
        <div className='absolute top-0 left-0 bottom-0 right-0'>
          <p>{c.name}</p>
          <div
            className='relative w-full h-full min-w-[168px] min-h-[100%] mt-2 cursor-pointer'
            onClick={() => {
              router.push('/item')
            }}
          >
            <Image
              layout='fill'
              src={c.img}
              alt={c.name}
              style={{
                objectFit: 'cover',
                // width: '100%',
                // height: 'auto'
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full grid grid-flow-column grid-cols-2 auto-rows-[1fr] auto-cols-[1fr] gap-x-4 gap-y-4'>
      {categoriesData.map(mapCategories)}
    </div >
  )
}

export default Categories