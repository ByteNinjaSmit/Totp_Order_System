import React, { useState, useRef } from "react";
import { useAuth } from "./../store/auth";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../store/cart";

const TotpVerify = () => {
  const [totpCode, setTotpCode] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const data = useLocation().state;
  const params = useParams();
  const inputs = useRef([]);
  const { cart, setCart } = useCart();
  const { user, isLoggedIn, authorizationToken, API } = useAuth();
  const [failedAttempts, setFailedAttempts] = useState(0);

  if (!user && !isLoggedIn) {
    return <navigate to="/login" />;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const fullTotpCode = totpCode.join("");

    const totalPrice = () => {
      try {
        let total = 0;
        cart.forEach((item) => {
          total += item.price * (item.quantity || 1); // Correct calculation
        });
        return total; // Return the calculated total
      } catch (error) {
        console.log("Error calculating total price:", error);
        return 0; // Return 0 in case of error to handle gracefully
      }
    };

    setTimeout(async () => {
      try {
        console.log(fullTotpCode);
        const response = await fetch(
          `${API}/api/admin/${params.id}/orderData/totp`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: authorizationToken,
            },
            body: JSON.stringify({
              totp: fullTotpCode,
              cart,
              paymentMethod: data.paymentMethod,
              paymentStatus: data.paymentStatus,
              tableNo: data.tableNo,
              amount: totalPrice(),
            }),
          }
        );
        if (response.ok) {
          toast.success("Order Placed Successfully");
          localStorage.removeItem("cart");
          setCart([]);
          navigate("/");
        } else {
          toast.error("Order Failed, Enter Correct TOTP");
          setTotpCode(["", "", "", "", "", ""]);
          setFailedAttempts((prev) => prev + 1);
          if (failedAttempts + 1 >= 5) {
            navigate("/cart");
            toast.error("Maximum attempts exceeded. Please try again later.");
          }
        }
      } catch (error) {
        console.log(`Error from TOTP post: ${error}`);
      }
    }, 300);
  };

  const handleInputChange = (index) => (event) => {
    const { value } = event.target;
    if (/^[0-9]$/.test(value)) {
      const newCode = [...totpCode];
      newCode[index] = value;
      setTotpCode(newCode);
      if (index < 5) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyPress = (event) => {
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleKeyDown = (index) => (event) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      const newCode = [...totpCode];
      newCode[index] = "";
      setTotpCode(newCode);
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  const handleCancel = () => {
    navigate("/service");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-sm md:max-w-lg w-full">
        <h1 className="text-center mt-8 mb-4 text-2xl">Verify TOTP</h1>
        <div className="text-wrap">
          <form
            className="sm:d-block max-sm:flex-col items-center mt-4 mb-4"
            onSubmit={handleSubmit}
          >
            {totpCode.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={handleInputChange(index)}
                onKeyPress={handleKeyPress}
                onKeyDown={handleKeyDown(index)}
                maxLength={1}
                ref={(el) => (inputs.current[index] = el)}
                required
                className="w-16 h-16 m-2 border border-gray-300 rounded-lg text-center text-2xl outline-none focus:border-blue-500"
              />
            ))}
            <div className="mt-4">
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-2 rounded-lg mr-4 hover:bg-green-600 transition duration-300"
                >
                  Submit
                </button>
                <Link to="/cart">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
        <hr className="border-t border-gray-300 my-8" />
      </div>
    </div>
  );
};

export default TotpVerify;
