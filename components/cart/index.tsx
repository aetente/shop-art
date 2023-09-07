import { useRouter } from "next/router";
import { useShoppingCartContext } from "@/providers/ShoppinCartProvider";
import { useUserContext } from "@/providers/UserProvider";


function CartItem({ data }: any) {
  const { addItem, removeItem } = useShoppingCartContext();
  const { quantity, attributes } = data;

  return (
    <div className="p-6 flex flex-wrap justify-between border-b border-blueGray-800">
      <div className="w-2/4">
        <div className="flex flex-col h-full">
          <h6 className="font-bold text-white mb-1">{attributes.name}</h6>
          <span className="block pb-4 mb-auto font-medium text-gray-400">
            {quantity} x ${attributes.price}
          </span>
        </div>
      </div>
      <div className="w-1/4">
        <div className="flex flex-col items-end h-full">
          <div className="flex justify-between">
            <button
              className="mr-2 inline-block mb-auto font-medium text-sm text-gray-400 hover:text-gray-200"
              onClick={() => removeItem(data)}
            >
              Remove
            </button>
            <button
              className="inline-block mb-auto font-medium text-sm text-gray-400 hover:text-gray-200"
              onClick={() => addItem(data)}
            >
              Add
            </button>
          </div>
          <span className="block mt-2 text-sm font-bold text-white">
            ${attributes.price * quantity}
          </span>
        </div>
      </div>
    </div>
  );
}

function Cart() {
  const router = useRouter();
  const { cart, showCart, setShowCart } = useShoppingCartContext();
  const { isLoggedIn } = useUserContext()
  const total = cart.total;
  const displayTotal = Math.abs(total);

  function loginRedirect() {
    router.push("/login");
  }

  function cartRedirect() {
    setShowCart(false);
    router.push("/checkout");
  }

  return (
    <section className="absolute right-0 top-[32px] min-w-[320px]">
      <div className="relative">
        {showCart && (
          <div className="rounded-3xl co bg-gray-800">
            <div className="max-w-lg pt-6 pb-8 px-8 mx-auto">
              <div className="flex mb-10 items-center justify-between">
                <h6 className="font-bold text-2xl text-white mb-0">
                  Your Cart
                </h6>
              </div>

              <div>
                {cart.items
                  ? cart.items.map((item: any, index: number) => {
                    if (item.quantity > 0) {
                      return <CartItem key={index} data={item} />;
                    }
                  })
                  : null}
              </div>
              <div className="p-6">
                <div className="flex mb-6 content-center justify-between">
                  <span className="font-bold text-white">Order total</span>
                  <span className="text-sm font-bold text-white">
                    ${displayTotal}
                  </span>
                </div>
                <button
                  onClick={() => (isLoggedIn ? cartRedirect() : loginRedirect())}
                  className="inline-block w-full px-6 py-3 text-center font-bold text-white bg-green-500 hover:bg-green-600 transition duration-200 rounded-full"
                >
                  {isLoggedIn ? "Continue To Pay" : "Login to Order"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;