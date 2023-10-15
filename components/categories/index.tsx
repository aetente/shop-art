import Image from 'next/image'
import { useRouter } from 'next/router'

interface Props {
  categoriesData: any
}

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

function Categories(props: Props) {

  const router = useRouter()

  const mapCategories = (c:any, i:number) => {
    return (
      <div key={`category-${i}`} className='grid w-full relative pb-[100%]'>
        <div className='absolute top-0 left-0 bottom-0 right-0'>
          <p>{c.attributes.name}</p>
          <div
            className='relative w-full h-full min-w-[168px] min-h-[100%] mt-2 cursor-pointer'
            onClick={() => {
              router.push('/items')
            }}
          >
            <img
              src={"http://localhost:1337/" + c.attributes.thumbnail.data.attributes.url}
              alt={c.attributes.name}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: 'auto',
                position: 'absolute'
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full grid grid-flow-column grid-cols-2 auto-rows-[1fr] auto-cols-[1fr] gap-x-4 gap-y-4'>
      {props.categoriesData.map(mapCategories)}
    </div >
  )
}

export default Categories