import Image from 'next/image'
import { useRouter } from 'next/router'

function CartItem() {

  const router = useRouter()

  return (

    <div className='flex gap-4 justify-between items-center p-4 border-solid border-[1px] border-r-0 border-l-0 border-black'>
      <div className='flex gap-4'>
        <div
          className='relative min-w-[168px] min-h-[168px] cursor-pointer'
          onClick={() => {
            router.push('/item')
          }}
        >
          <Image
            layout='fill'
            src='/test/test_image1.jpg'
            alt='item'
            style={{
              objectFit: 'cover',
              // width: '100%',
              // height: 'auto'
            }}
          />
        </div>
        <div>
          <div className='text-4xl'>SVG File</div>
          <div className='text-red-500'>Delete</div>
        </div>
      </div>

      <input type='number' defaultValue={2} className='min-w-[48px] w-12 border-solid border-[1px] border-black text-center' />

      <div>
        $2.00
      </div>
    </div>
  )
}

export default CartItem