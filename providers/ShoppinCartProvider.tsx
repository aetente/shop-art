import { useState, createContext, useContext, useEffect } from "react";
import nookies, { setCookie } from 'nookies'

const ShoppingCartContext = createContext<any>({});

export const ShoppingCartProvider: React.FC<{
  children: any
}> = ({ children }) => {
  const cartCookie =
  nookies.get()["cart"] !== "undefined" ? nookies.get()["cart"] : null;

  const [user, setUser] = useState(null);
  const [showCart, setShowCart] = useState(true);
  const [cart, setCart] = useState(
    cartCookie ? JSON.parse(cartCookie) : { items: [], total: 0 }
  );

  useEffect(() => {
    setCookie(null, 'jwt', JSON.stringify(cart), {
      httpOnly: false,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
  }, [cart]);

  const addItem = (item: any) => {
    let newItem = cart.items.find((i: any) => i.id === item.id);
    if (!newItem) {
      const newItem = {
        quantity: 1,
        ...item,
      };
      setCart((prevCart: any) => ({
        items: [...prevCart.items, newItem],
        total: prevCart.total + item.attributes.price,
      }));
    } else {
      setCart((prevCart: any) => ({
        items: prevCart.items.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
        total: prevCart.total + item.attributes.price,
      }));
    }
  };

  const removeItem = (item: any) => {
    let newItem = cart.items.find((i) => i.id === item.id);
    if (newItem.quantity > 1) {
      setCart((prevCart: any) => ({
        items: prevCart.items.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity - 1 } : i
        ),
        total: prevCart.total - item.attributes.price,
      }));
    } else {
      setCart((prevCart: any) => ({
        items: prevCart.items.filter((i) => i.id !== item.id),
        total: prevCart.total - item.attributes.price,
      }));
    }
  };

  const resetCart = () => {
    setCart({ items: [], total: 0 });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        user,
        setUser,
        cart,
        addItem,
        removeItem,
        resetCart,
        showCart,
        setShowCart,
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