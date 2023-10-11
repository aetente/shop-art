import { useState, createContext, useContext, useEffect } from "react";
import nookies, { setCookie } from 'nookies'

const ShoppingCartContext = createContext<any>({});

export const ShoppingCartProvider: React.FC<{
  children: any
}> = ({ children }) => {
  const cartCookie =
    nookies.get()["cart"] !== "undefined" ? nookies.get()["cart"] : null;

  const [user, setUser] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState(
    cartCookie ? JSON.parse(cartCookie) : { items: [], total: 0 }
  );

  useEffect(() => {
    setCookie(null, 'cart', JSON.stringify(cart), {
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
        items: prevCart.items.map((i: any) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
        total: prevCart.total + item.attributes.price,
      }));
    }
  };

  const setItemQuantityById = (id: number, quantity: number) => {
    let foundItem = cart.items.find((i: any) => i.id === id);
    const previousItemTotal = foundItem.attributes.price * foundItem.quantity;
    if (quantity > 0) {
      setCart((prevCart: any) => ({
        items: prevCart.items.map((i:any) =>
          i.id === foundItem.id ? { ...i, quantity } : i
        ),
        total: prevCart.total - previousItemTotal + foundItem.attributes.price * quantity,
      }));
    } else {
      setCart((prevCart: any) => ({
        items: prevCart.items.filter((i: any) => i.id !== id),
        total: prevCart.total - previousItemTotal,
      }));
    }
  }

  const removeWholeItem = (id: number) => {
    let foundItem = cart.items.find((i: any) => i.id === id);
    const previousItemTotal = foundItem.attributes.price * foundItem.quantity;
    setCart((prevCart: any) => ({
      items: prevCart.items.filter((i: any) => i.id !== id),
      total: prevCart.total - previousItemTotal,
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
      }));
    } else {
      setCart((prevCart: any) => ({
        items: prevCart.items.filter((i: any) => i.id !== item.id),
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