import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const ForgotPass = () => {
    const navigate = useNavigate();
    const { API } = useAuth();
    const [user, setUser] = useState({
        email: "",
        mobile: "",
    });

    // handle input user value
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`${API}/api/auth/forgot-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          });
          const res_data = await response.json();
          if (response.ok) {
            toast.success("Password reset link sent to your email.");
            setUser({ email: "", mobile: "" });
      
            // Extract the path and query from the full URL
            const redirectPath =
              new URL(res_data.redirectUrl).pathname +
              new URL(res_data.redirectUrl).search;
            navigate(redirectPath);
          } else {
            toast.error(
              res_data.extraDetails ? res_data.extraDetails : res_data.message
            );
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong. Please try again later.");
        }
      };
      
    // reset form
    const handleReset = () => {
        setUser({ email: "", mobile: "" });
    };

    return (
        <div
            className="flex min-h-screen bg-cover bg-center items-center justify-center"
            style={{
                backgroundImage:
                    "url('https://t4.ftcdn.net/jpg/05/51/93/35/360_F_551933523_nBWNQeC6vA8sDE6DDDQeo3YmSRQnlOjN.jpg')",
            }}
        >
            <div className="bg-white bg-opacity-90 shadow-md rounded-lg p-8 sm:max-w-md w-full">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-40 w-auto"
                        src="https://png.pngtree.com/png-clipart/20221110/original/pngtree-health-restaurant-logo-design-template-vector-picture-image_3607709.png"
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Forgot Password?
                    </h2>
                </div>

                <form
                    className="mt-8 space-y-6"
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-lg font-medium leading-6 text-gray-900"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={user.email}
                                required
                                autoComplete="off"
                                onChange={handleInput}
                                className="block w-full pl-4 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="mobile"
                            className="block text-lg shadow-sm font-medium leading-6 text-gray-900"
                        >
                            Mobile Number
                        </label>
                        <div className="mt-2">
                            <input
                                id="mobile"
                                name="mobile"
                                type="text"
                                value={user.mobile}
                                required
                                autoComplete="off"
                                onChange={handleInput}
                                className="block w-full rounded-md pl-4 border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Send Reset Link
                        </button>
                        <button
                            type="reset"
                            className="flex w-full justify-center mt-4 rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                        >
                            Reset
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Remember your password?{" "}
                    <NavLink
                        to="/login"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        Sign In
                    </NavLink>
                </p>
            </div>
        </div>
    );
};
