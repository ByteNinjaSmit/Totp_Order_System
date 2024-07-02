import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useCart } from "../store/cart";


export const Logout = () => {
  const { LogoutUser } = useAuth();
  const { setTableNo,setCart } = useCart(); // Correctly initialize useCart
  useEffect(() => {
    // Clear the table number
    setTableNo("");
  }, [setTableNo]);
  useEffect(() => {
    // Clear the cart
    localStorage.removeItem('cart');
    setCart([]);
  }, [setCart]);
  
  useEffect(() => {
    LogoutUser();
  }, [LogoutUser]);
  return <Navigate to="/login" />;
};
