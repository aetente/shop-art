import { useShoppingCartContext } from '@/providers/ShoppinCartProvider';
import Image from 'next/image'
import { useRouter } from 'next/router'

const itemsData = [
  {
    name: 'item',
    img: '/test/test_image1.jpg',
    attributes: {
      price: 1.34
    }
  },
  {
    name: 'item',
    img: '/test/test_image1.jpg',
    attributes: {
      price: 1.34
    }
  },
  {
    name: 'item',
    img: '/test/test_image1.jpg',
    attributes: {
      price: 1.34
    }
  },
  {
    name: 'item',
    img: '/test/test_image1.jpg',
    attributes: {
      price: 1.34
    }
  },
  {
    name: 'item',
    img: '/test/test_image1.jpg',
    attributes: {
      price: 1.34
    }
  },
]

function Items() {

  const router = useRouter()

  const { addItem, setShowCart } = useShoppingCartContext();

  const handleAddItem = (data: any) => {
    addItem(data);
    setShowCart(true);
  }

  const mapItems = (c: any, i: number) => {
    return (
      <div key={`item-${i}`} className='grid w-full relative pb-[100%]'>
        <div className='absolute top-0 left-0 bottom-0 right-0'>
          <p>{c.name}</p>
          <div
            className='relative w-full h-full min-w-[168px] min-h-[100%] mt-2 cursor-pointer'
            onClick={() => {
              // router.push('/item')
              handleAddItem(c);
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
    <div className='w-full grid grid-flow-column grid-cols-6 auto-rows-[1fr] auto-cols-[1fr] gap-x-4 gap-y-4'>
      {Array(20).fill({
        name: 'item',
        img: '/test/test_image1.jpg',
        attributes: {
          price: 1.34
        }
      }).map(mapItems)}
    </div >
  )
}

export default Items