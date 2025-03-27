import CartItem from "@/components/cart-item/cart-item"
import { useShoppingCartContext } from "@/providers/ShoppinCartProvider";
import { useRouter } from "next/router";

function CartPage() {
  const router = useRouter();

  const { cart } = useShoppingCartContext();

  return (
    <div className='pt-24'>
      <div>SHOPPING CART</div>
      <div className='mt-4 flex flex-col gap-2'>
        {cart.items.map((item: any, i: number) => {
          return (
            <CartItem
              key={`cart-item-${item.id}`}
              name={item.name}
              price={item.attributes.price}
              quantity={item.quantity}
              img={process.env.NEXT_PUBLIC_STRIPE + item.attributes.images.data[0].attributes.url}
              id={item.id}
            />
          )
        })}
      </div>
      <div>INFO</div>
      <div className='flex justify-between items-stretch'>
        <div className='min-h-[168px] min-w-[256px] border-solid border-[1px] border-black' />
        <div className='relative flex flex-col justify-between items-end gap-4'>
          <div />
          <div>${Math.round(cart.total * 100) / 100}</div>
          <button
            onClick={() => {
              router.push("/checkout");
            }}
            className='bg-green-600 text-gray-50 p-4'
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartPage