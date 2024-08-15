import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../store/cart";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";

const PaymentSuccess = () => {
  const { cart, setCart } = useCart();
  const { user } = useAuth();
  const seachQuery = useSearchParams()[0];
  localStorage.removeItem("cart");
  setCart([]);
  const referenceNum = seachQuery.get("reference");
  return (
    <Box>
      <VStack h="100vh" justifyContent={"center"}>
        <Heading textTransform={"uppercase"}> Order Successfull</Heading>

        <Text>Reference No.{referenceNum}</Text>

        <Link to={`/${user._id}/user/order-history`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full">
            View Order
          </button>
        </Link>
      </VStack>
    </Box>
  );
};

export default PaymentSuccess;
