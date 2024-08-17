import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

export const ForgotPassNew = () => {
    const searchQuery = useSearchParams()[0];
    const { API } = useAuth();
    const userId = searchQuery.get("_id");
    const token = searchQuery.get("token"); // Ensure the token is extracted from the URL
    const [user, setUser] = useState({ newPassword: "", confirmPassword: "" });
    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.newPassword !== user.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch(`${API}/api/auth/reset-password/${userId}/${token}`, { // Use token in URL
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newPassword: user.newPassword }),
            });

            if (response.ok) {
                const resData = await response.json();
                toast.success(resData.message);
                navigate("/login");
            } else {
                const resData = await response.json();
                toast.error(resData.message || "Failed to reset password.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong. Please try again later.");
        }
    };

    const handleReset = () => {
        setUser({ newPassword: "", confirmPassword: "" });
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

                <form className="mt-8 space-y-6" onSubmit={handleSubmit} onReset={handleReset}>
                    <div>
                        <label htmlFor="newPassword" className="block text-lg font-medium leading-6 text-gray-900">
                            New Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                value={user.newPassword}
                                required
                                autoComplete="off"
                                onChange={handleInput}
                                className="block w-full pl-4 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-lg font-medium leading-6 text-gray-900">
                            Re-Enter Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={user.confirmPassword}
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
                            Confirm Password
                        </button>
                        <button
                            type="reset"
                            className="flex w-full justify-center mt-4 rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
