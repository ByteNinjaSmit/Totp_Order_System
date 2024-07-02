import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  // Load cart and tableNo from localStorage on component mount
  const [cart, setCart] = useState(() => {
    const existingCart = localStorage.getItem('cart');
    return existingCart ? JSON.parse(existingCart) : [];
  });

  const [tableNo, setTableNo] = useState(() => {
    return localStorage.getItem('tableNo') || '';
  });

  // Save cart and tableNo to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('tableNo', tableNo);
  }, [tableNo]);

  const addToCart = (newItem) => {
    setCart(prevCart => {
      // Check if item with the same _id already exists
      const itemExists = prevCart.some(item => item._id === newItem._id);
      if (itemExists) {
        // Return previous cart if item already exists
        return prevCart;
      }
      // Add new item to cart if it doesn't exist
      return [...prevCart, newItem];
    });
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, tableNo, setTableNo }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
