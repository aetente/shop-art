import { useShoppingCartContext } from '@/providers/ShoppinCartProvider'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface Props {
  name: string
  price: number
  quantity: number
  img: string
  id: number
}

function CartItem(props: Props) {

  const { addItem, removeItem, setItemQuantityById, removeWholeItem } = useShoppingCartContext();
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
          <img
            src={props.img}
            alt={props.name}
            style={{
              objectFit: 'cover',
              width: '100%',
              height: 'auto',
              maxWidth: '200px',
              maxHeight: '200px'
            }}
          />
        </div>
        <div>
          <div className='text-4xl'>{props.name}</div>
          <div className='text-red-500' onClick={() => {
            removeWholeItem(props.id);
          }}>Delete</div>
        </div>
      </div>

      {/* <input
        type='number'
        defaultValue={props.quantity}
        className='min-w-[48px] w-12 border-solid border-[1px] border-black text-center'
        onChange={(e: any) => {
          setItemQuantityById(props.id, +e.target.value)
        }}
      /> */}

      <div>
        ${Math.round(props.price * 100 * props.quantity) / 100}
      </div>
    </div>
  )
}

export default CartItem