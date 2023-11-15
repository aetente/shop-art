import { useState, createContext, useContext, useEffect } from "react";
import nookies, { setCookie } from 'nookies'

const ShoppingCartContext = createContext<any>({});

export const ShoppingCartProvider: React.FC<{
  children: any
}> = ({ children }) => {

  const [user, setUser] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState<any>(
    { items: [], total: 0, init: true }
  );

  console.log('cart', cart, nookies.get())

  useEffect(() => {
    if (!cart.init) {
      console.log("set localStorage", cart)
      localStorage.setItem("cart", JSON.stringify(cart))
      console.log("get localStorage", localStorage.getItem("cart"))
    }
  }, [cart]);

  const addItem = (item: any) => {
    let isOldItem = cart.items.find((i: any) => i.id === item.id);
    if (!isOldItem) {
      const newItem = {
        quantity: 1,
        ...item,
      };
      setCart((prevCart: any) => ({
        items: [...prevCart.items, newItem],
        total: prevCart.total + item.attributes.price,
        init: false
      }));
    } else {
      setCart((prevCart: any) => ({
        items: prevCart.items.map((i: any) =>
          // i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
          i
        ),
        // total: prevCart.total + item.attributes.price,
        total: prevCart.total,
        init: false
      }));
    }
  };

  const setItemQuantityById = (id: number, quantity: number) => {
    let foundItem = cart.items.find((i: any) => i.id === id);
    const previousItemTotal = foundItem.attributes.price * foundItem.quantity;
    if (quantity > 0) {
      setCart((prevCart: any) => ({
        items: prevCart.items.map((i: any) =>
          i.id === foundItem.id ? { ...i, quantity } : i
        ),
        total: prevCart.total - previousItemTotal + foundItem.attributes.price * quantity,
        init: false
      }));
    } else {
      setCart((prevCart: any) => ({
        items: prevCart.items.filter((i: any) => i.id !== id),
        total: prevCart.total - previousItemTotal,
        init: false
      }));
    }
  }

  const removeWholeItem = (id: number) => {
    let foundItem = cart.items.find((i: any) => i.id === id);
    const previousItemTotal = foundItem.attributes.price * foundItem.quantity;
    setCart((prevCart: any) => ({
      items: prevCart.items.filter((i: any) => i.id !== id),
      total: prevCart.total - previousItemTotal,
      init: false
    }));
  }

  const removeItem = (item: any) => {
    let newItem = cart.items.find((i: any) => i.id === item.id);
    if (newItem.quantity > 1) {
      setCart((prevCart: any) => ({
        items: prevCart.items.map((i: any) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity - 1 } : i
        ),
        total: prevCart.total - item.attributes.price,
        init: false
      }));
    } else {
      setCart((prevCart: any) => ({
        items: prevCart.items.filter((i: any) => i.id !== item.id),
        total: prevCart.total - item.attributes.price,
        init: false
      }));
    }
  };

  const resetCart = () => {
    setCart({ items: [], total: 0 });
  };

  // useEffect(() => {
  //   resetCart()
  // }, [])

  useEffect(() => {
    const cartLocalStorage = localStorage.getItem("cart")
      ? localStorage.getItem("cart") : null;
    console.log("cartLocalStorage", cartLocalStorage)
    setCart(
      cartLocalStorage ? JSON.parse(cartLocalStorage) : { items: [], total: 0 }
    );
  }, [])

  return (
    <ShoppingCartContext.Provider
      value={{
        user,
        setUser,
        cart,
        addItem,
        removeItem,
        removeWholeItem,
        resetCart,
        showCart,
        setShowCart,
        setItemQuantityById
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCartContext = () => {
  const context = useContext(ShoppingCartContext);
  if (context === undefined)
    throw new Error("useShoppingCartContext must be used within an ShoppingCartProvider");
  return context;
};