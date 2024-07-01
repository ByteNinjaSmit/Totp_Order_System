import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load cart from localStorage after refresh
    useEffect(() => {
        const existingCartItem = localStorage.getItem('cart');
        if (existingCartItem) setCart(JSON.parse(existingCartItem));
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (newItem) => {
        setCart(prevCart => {
            // Check if item with same _id already exists
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
        <CartContext.Provider value={{ cart, setCart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook
const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
