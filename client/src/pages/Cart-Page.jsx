import { useAuth } from "../store/auth";
import { useCart } from "../store/cart";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { user } = useAuth();
  const { cart, tableNo, setCart } = useCart();
  const [quantities, setQuantities] = useState({});
  const [data, setData] = useState({
    paymentMethod: "",
    tableNo: "",
    paymentStatus: "",
  });

  // Initialize quantities from cart items
  useEffect(() => {
    const initialQuantities = {};
    cart.forEach((item) => {
      initialQuantities[item._id] = item.quantity || 1; // Default to 1 if quantity is not defined
    });
    setQuantities(initialQuantities);
  }, [cart]);

  // Function to remove item from cart
  const removeItem = (ID) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === ID);
      if (index !== -1) {
        myCart.splice(index, 1);
        setCart(myCart);
        localStorage.setItem("cart", JSON.stringify(myCart));
        const updatedQuantities = { ...quantities };
        delete updatedQuantities[ID];
        setQuantities(updatedQuantities);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to increase item quantity
  const increaseQuantity = (ID) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = {
        ...prevQuantities,
        [ID]: (prevQuantities[ID] || 1) + 1,
      };
      const updatedCart = cart.map((item) =>
        item._id === ID ? { ...item, quantity: updatedQuantities[ID] } : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedQuantities;
    });
  };

  // Function to decrease item quantity
  const decreaseQuantity = (ID) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = {
        ...prevQuantities,
        [ID]: (prevQuantities[ID] || 1) - 1,
      };
      if (updatedQuantities[ID] < 1) updatedQuantities[ID] = 1; // Ensure quantity is at least 1
      const updatedCart = cart.map((item) =>
        item._id === ID ? { ...item, quantity: updatedQuantities[ID] } : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedQuantities;
    });
  };
  // useEffect To store TableNo in data
  // Store tableNo in data when tableNo changes
  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      tableNo: tableNo,
    }));
  }, [tableNo]);

  // Handle payment method selection
  const handlePaymentMethodChange = (e) => {
    const selectedPaymentMethod = e.target.value;
    setData((prevData) => ({
      ...prevData,
      paymentMethod: selectedPaymentMethod,
      paymentStatus:
        selectedPaymentMethod === "Cash / Online at Counter" ? "pending" : "",
    }));
  };

  // Function to calculate total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart.forEach((item) => {
        total += item.price * (quantities[item._id] || 1); // Calculate total based on quantity
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <>
        <div className="bg-slate-400 pt-4 pb-2">
          <h1 className="w-full text-center mt-1 sm:text-5xl text-2xl lg:text-4xl mb-10 font-bold">
            Your Cart
          </h1>
        </div>
        <div className="mt-4">
          <h4 className="w-full text-center mt-1 sm:text-3xl text-1xl lg:text-2xl mb-10 font-bold">
            You Have {cart.length} items in your cart. Please Login To Checkout
          </h4>
        </div>
      </>
    );
  }

  if (user && cart.length === 0) {
    return (
      <>
        <div className="bg-slate-400 pt-4 pb-2">
          <h1 className="w-full text-center mt-1 sm:text-5xl text-2xl lg:text-4xl mb-10 font-bold">
            Your Cart
          </h1>
        </div>
        <div className="mt-5">
          <h4 className="w-full text-center mt-1 sm:text-3xl text-red-500 text-1xl lg:text-2xl mb-10 font-bold">
            Cart is Empty
          </h4>
        </div>
      </>
    );
  }

  // Function to remove duplicate items
  const uniqueCart = cart.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t._id === item._id)
  );

  return (
    <>
      <section className="relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
          <div className="grid grid-cols-12">
            <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
              <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                  Shopping Cart
                </h2>
                <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">
                  {uniqueCart.length} Items
                </h2>
              </div>
              <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                <div className="col-span-12 md:col-span-7">
                  <p className="font-normal text-lg leading-8 text-gray-400">
                    Product Details
                  </p>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <div className="grid grid-cols-5">
                    <div className="col-span-3">
                      <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                        Quantity
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                        Total
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {uniqueCart.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center justify-between mt-8 pb-6 border-b border-gray-200 group"
                >
                  <div className="w-full md:max-w-[126px]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="mx-auto rounded-full pr-2"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 w-full mt-4 md:mt-0">
                    <div className="md:col-span-2">
                      <div className="flex flex-col max-w-[500px] items-start gap-3">
                        <h6 className="font-semibold text-base leading-7 text-black">
                          {item.name}
                        </h6>
                        <p className="font-normal text-sm text-wrap leading-7 text-gray-500">
                          {item.ingredients.join(", ")}
                        </p>
                        <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">
                          ₹{item.price}
                        </h6>
                      </div>
                    </div>
                    <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                      <div className="flex items-center h-full">
                        <button
                          onClick={() => decreaseQuantity(item._id)}
                          className="group rounded-l-xl px-4 py-[16px] md:px-5 md:py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-colors duration-300 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus:outline-none"
                        >
                          <svg
                            className="stroke-gray-900 transition-colors duration-300 group-hover:stroke-black"
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                          >
                            <path
                              d="M16.5 11H5.5"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                        <input
                          type="text"
                          value={quantities[item._id] || 1}
                          readOnly
                          className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[14px] md:py-[15px] text-center bg-transparent"
                          placeholder="1"
                        />
                        <button
                          onClick={() => increaseQuantity(item._id)}
                          className="group rounded-r-xl px-4 py-[16px] md:px-5 md:py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-colors duration-300 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus:outline-none"
                        >
                          <svg
                            className="stroke-gray-900 transition-colors duration-300 group-hover:stroke-black"
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                          >
                            <path
                              d="M11 5.5V16.5M16.5 11H5.5"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>

                      </div>
                    </div>
                    <div className="flex items-center justify-center md:justify-end mt-4 md:mt-0 h-full">
                      <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">
                        ₹{quantities[item._id] * item.price}
                      </p>
                    </div>
                    <div className="flex items-center justify-center md:justify-end mt-4 md:mt-0 h-full">
                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md focus:outline-none"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
              <h2 className="font-manrope text-center font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                Order Summary
              </h2>
              <div className="mt-8">
                {/* Table Number Showing */}
                <div className="flex items-center justify-between py-8">
                  <p className="font-medium text-xl leading-8 text-black">
                    Table No:-
                  </p>
                  <p className="font-semibold text-xl leading-8 text-indigo-600">
                    {tableNo}
                  </p>
                </div>
                <hr />
                {/* Payment Methods */}
                <div className="py-8 border-b border-gray-300">
                  <h3 className="font-medium text-xl leading-8 text-black pb-4">
                    Payment Methods
                  </h3>
                  <div className="flex items-center py-2">
                    <input
                      type="radio"
                      id="Cash / Online at Counter"
                      name="paymentMethod"
                      value="Cash / Online at Counter"
                      className="mr-3"
                      onChange={handlePaymentMethodChange}
                    />
                    <label
                      htmlFor="Cash / Online at Counter"
                      className="font-medium text-lg leading-8 text-black"
                    >
                      Cash / Online at Counter
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between py-8">
                  <p className="font-medium text-xl leading-8 text-black">
                    {uniqueCart.length} Items
                  </p>
                  <p className="font-semibold text-xl leading-8 text-indigo-600">
                    {totalPrice()}
                  </p>
                </div>
                <Link
                  to={`/service/${user._id}/${tableNo}/checkout/totp`}
                  state={data}
                >
                  <button
                    className={`w-full text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700 ${!data.paymentMethod || !data.tableNo ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!data.paymentMethod && !data.tableNo}
                  >
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
