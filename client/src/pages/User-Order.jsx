import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Select } from "antd";
import axios from "axios";

export const UserOrderDetail = () => {
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { authorizationToken, API, user } = useAuth();
  const { order } = useParams();
  const [TAmount, setTAmount] = useState(0);

  // Fetch order data
  const getSingleOrderData = async () => {
    try {
      const response = await fetch(
        `${API}/api/user/${user._id}/user/orders/view/${order}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setOrderData(data);
        setTAmount(data.amount);
        // console.log(data.amount);
        setIsLoading(false); // Data fetched successfully, loading complete
      } else {
        console.error("Failed to fetch order data");
        toast.error("Failed to fetch order data");
        setIsLoading(false); // Error occurred, loading complete
      }
    } catch (error) {
      console.error(`Error fetching order data: ${error}`);
      toast.error("Error fetching order data");
      setIsLoading(false); // Error occurred, loading complete
    }
  };

  // console.log(`Amount: ${TAmount}`);
  // console.log(orderData._id);
  const handlePayment = async () => {
    try {
      // Get key from Backend
      const {
        data: { key },
      } = await axios.get(`${API}/api/payment/razorpay/getkey`);
      console.log(`key: ${key}`);

      // Ensure the amount is a whole number in paise
      const amountInPaise = Math.round(TAmount * 100);

      // Prepare payment data
      const response = await axios.post(
        `${API}/api/payment/${user._id}/razorpay/existing`,
        {
          // username: user.name,
          Tamount: amountInPaise,
          number: user.phone,
          orderId: orderData._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );

      const paymentData = response.data;

      // Setup Razorpay options
      const options = {
        key: key,
        amount: amountInPaise, // Amount in paise
        currency: "INR",
        name: "Hotel Order",
        description: "Online Food Order",
        image: "https://avatars.githubusercontent.com/u/58396188?v=4",
        order_id: paymentData.order.id,
        callback_url: `${API}/api/payment/razorpay/paymentVerification/existing`,
        prefill: {
          name: user.username,
          email: user.email,
          contact: `91${user.phone}`, // Ensure this is properly formatted
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#F0EB51",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      // Handle errors from axios requests or Razorpay API
      console.error("Error in handlePayment:", error);
      alert(
        "An error occurred while processing your payment. Please try again."
      );
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getSingleOrderData();
  }, [API, authorizationToken, order]);

  // Render loading indicator while data is being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Format date for display
  const createdAtDateTime = new Date(orderData.createdAt).toLocaleString();

  return (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-6 mx-auto">
        <div className="flex flex-wrap justify-between items-center">
          <h2 className="font-manrope font-bold text-3xl sm:text-4xl leading-tight text-black mb-11">
            Order Detail
          </h2>
          <div className="flex gap-4">
            {/* <div>{orderData.paymentStatus}</div> */}
            {orderData.paymentStatus !== "Completed" && (
              <button
                onClick={handlePayment}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full"
                disabled={orderData.paymentStatus === "Completed"}
              >
                Pay Now
              </button>
            )}

            <Link to={`/${user._id}/user/order-history`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Go To Orders Page
              </button>
            </Link>
          </div>
        </div>

        <h6 className="font-medium text-xl leading-8 text-black mb-3">
          From, {orderData.buyer && orderData.buyer.username}
        </h6>
        <p className="font-normal text-lg leading-8 text-gray-500 mb-11">
          This order has been {orderData.status}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 py-6 border-y border-gray-100 mb-6">
          <div className="box group">
            <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
              Ordered Date
            </p>
            <h6 className="font-semibold font-manrope text-2xl leading-9 text-black">
              {createdAtDateTime}
            </h6>
          </div>
          <div className="box group">
            <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
              Order
            </p>
            <h6 className="font-semibold font-manrope text-lg leading-9 text-black">
              #{orderData._id}
            </h6>
          </div>
          <div className="box group">
            <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
              Payment Method
            </p>
            <h6 className="font-semibold font-manrope text-xl leading-9 text-black">
              {orderData.paymentMethod}
            </h6>
          </div>
          <div className="box group">
            <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
              Table No
            </p>
            <h6 className="font-semibold font-manrope text-2xl leading-9 text-black">
              {orderData.tableNo}
            </h6>
          </div>
        </div>

        {/* Assuming products is an array */}
        {orderData.products &&
          orderData.products.map((product) => (
            <div
              key={product._id}
              className="grid grid-cols-7 w-full pb-6 border-b border-gray-100"
            >
              <div className="col-span-7 min-[500px]:col-span-2 md:col-span-1">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full rounded-full"
                />
              </div>
              <div className="col-span-7 md:col-span-5 md:pl-5 flex flex-col justify-center">
                <div className="flex flex-col items-start md:flex-row md:items-center justify-between">
                  <div>
                    <h5 className="font-manrope font-semibold text-2xl leading-9 text-black mb-3">
                      {product.name}
                    </h5>
                    <p className="font-normal text-xl leading-8 text-gray-500">
                      Veg :{" "}
                      <span className="text-black font-semibold">
                        {product.vegetarian ? "Yes" : "No"}
                      </span>
                    </p>
                    <p className="font-normal text-xl leading-8 text-gray-500">
                      Price :{" "}
                      <span className="text-black font-semibold">
                        ₹ {product.price}
                      </span>
                    </p>
                    <p className="font-normal text-xl leading-8 text-gray-500">
                      Quantity :{" "}
                      <span className="text-black font-semibold">
                        {product.quantity}
                      </span>
                    </p>
                    <p className="font-normal text-xl leading-8 text-gray-500">
                      Delivery Status :{" "}
                      <span
                        className={`${
                          product.shippingStatus === "Delivered"
                            ? "text-green-500 font-semibold"
                            : product.shippingStatus === "Cancelled"
                            ? "text-red-600 font-semibold"
                            : product.shippingStatus === "Processing"
                            ? "text-yellow-400 font-semibold"
                            : "text-black font-semibold"
                        }`}
                      >
                        {product.shippingStatus}
                      </span>
                    </p>
                  </div>
                  <h5 className="font-manrope font-semibold text-3xl leading-10 text-black md:text-right mt-3">
                    ₹ {product.price * product.quantity}
                  </h5>
                </div>
              </div>
            </div>
          ))}

        <div className="flex justify-center md:justify-end w-full my-6">
          <div className="w-full md:max-w-md lg:max-w-lg xl:max-w-xl">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">
                  Order Summary
                </h3>
              </div>
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex justify-between mb-2">
                  <p className="text-base text-gray-600">Subtotal</p>
                  <p className="text-base font-semibold text-gray-800">
                    ₹{" "}
                    {orderData?.products.reduce(
                      (total, product) =>
                        total + product.price * product.quantity,
                      0
                    ).toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-base text-gray-600">Discount</p>
                  <p className="text-base font-semibold text-gray-800">
                    ₹ 0.00
                  </p>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-200">
                  <p className="text-xl font-semibold text-gray-800">Total</p>
                  <p className="text-xl font-bold text-indigo-600">
                    ₹{" "}
                    {orderData?.products.reduce(
                      (total, product) =>
                        total + product.price * product.quantity,
                      0
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="data">
          <h6 className="font-manrope font-bold text-2xl leading-9 text-black mb-3">
            Thank you for your trust!
          </h6>
          <p className="font-normal text-lg leading-8 text-gray-500">
            Should you have any queries or require further assistance, please
            don't hesitate to reach out to us. We're here to ensure your
            experience is smooth and delightful. Happy dining!
          </p>
        </div>
      </div>
    </section>
  );
};
