import CartItem from "@/components/cart-item/cart-item"

function Checkout() {
  return (
    <div className='pt-24'>
      <div>SHOPPING CART</div>
      <div className='mt-4 flex flex-col gap-2'>
        <CartItem />
        <CartItem />
        <CartItem />
      </div>
      <div>INFO</div>
      <div className='flex justify-between items-stretch'>
        <div className='min-h-[168px] min-w-[256px] border-solid border-[1px] border-black' />
        <div className='relative flex flex-col justify-between items-end gap-4'>
          <div/>
          <div>$2.00</div>
          <button className='bg-green-600 text-gray-50 p-4' >CHECKOUT</button>
        </div>
      </div>
    </div>
  )
}

export default Checkout