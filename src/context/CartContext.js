import * as React from "react";

export const CartContext = React.createContext(
  {}
);


const CartContextProvider = ({ children }) => {
  const [cart, setCart] = React.useState([]);

  const alredyExist = (id) => {
    return cart.find((item) => item.id === id);
  };

  const addItemCart = (product) => {
    const { id } = product;
    const newItem = { ...product, amount: 1 };

    if (alredyExist(id)) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: item.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const removeItemCart = (id) => {
    const filteredCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(filteredCart);
  };

  const increaseItem = (product) => {
    const { id } = product;
    if (alredyExist(id)) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: alredyExist(id).amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
      addItemCart(alredyExist(id));
    }
  };
  const decreaseItem = (product) => {
    const { id } = product;
    if (alredyExist(id)) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: item.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
    alredyExist(id).amount < 2 && removeItemCart(id);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemCart,
        removeItemCart,
        clearCart,
        increaseItem,
        decreaseItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartContextProvider;