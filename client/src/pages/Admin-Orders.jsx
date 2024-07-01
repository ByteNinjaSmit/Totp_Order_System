import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const AdminOrders = () => {
    const { authorizationToken } = useAuth();
    const [orderData, setOrderData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const ordersPerPage = 10;

    useEffect(() => {
        const socket = io("http://localhost:5000", {
            auth: { token: authorizationToken },
        });

        socket.on("connect", () => {
            console.log("Socket connected");
        });

        socket.on("orderData", (data) => {
            setOrderData(data);
            setTotalOrders(data.length);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected");
        });

        return () => {
            socket.disconnect();
        };
    }, [authorizationToken]);

    const deleteOrder = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/orders/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (response.ok) {
                toast.success("Order Deleted Successfully");
                // Remove deleted order from state
                setOrderData(orderData.filter(order => order._id !== id));
                setTotalOrders(totalOrders - 1);
            } else {
                toast.error("Failed to delete order");
            }
        } catch (error) {
            console.error("Error deleting order:", error);
            toast.error("Failed to delete order");
        }
    };

    const updateOrder = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/orders/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify({ complete: true }),
            });
            if (response.ok) {
                toast.success("Order Updated Successfully");
                // Update order status in state
                setOrderData(orderData.map(order => {
                    if (order._id === id) {
                        return { ...order, complete: true };
                    }
                    return order;
                }));
            } else {
                toast.error("Failed to update order");
            }
        } catch (error) {
            console.error("Error updating order:", error);
            toast.error("Failed to update order");
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <div className="bg-slate-400 pt-3 pb-2">
                <h1 className="text-center mt-3 sm:text-5xl text-2xl lg:text-6xl mb-10 font-bold text-white">Admin Orders Panel</h1>
            </div>

            <div className="overflow-x-auto shadow-md sm:rounded-lg mt-3">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Username</th>
                            <th scope="col" className="px-6 py-3">Phone</th>
                            <th scope="col" className="px-6 py-3">Service</th>
                            <th scope="col" className="px-6 py-3">Provider</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Complete</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
    {/* Rendering new orders (complete === false) */}
    {orderData
        .filter(order => !order.complete)
        .slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage)
        .map((curOrderData, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{curOrderData.username}</td>
                <td className="px-6 py-4">{curOrderData.phone}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{curOrderData.service}</td>
                <td className="px-6 py-4">{curOrderData.provider}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${curOrderData.price}</td>
                <td className="px-6 py-4">{curOrderData.complete ? "Yes" : "No"}</td>
                <td className="px-6 py-4">
                    {curOrderData.complete ? (
                        <button disabled className="font-medium text-green-600 dark:text-green-100 hover:underline cursor-not-allowed">Completed</button>
                    ) : (
                        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => updateOrder(curOrderData._id)}>Complete</button>
                    )}
                    <button className="font-medium text-red-600 dark:text-red-500 hover:underline ml-2" onClick={() => deleteOrder(curOrderData._id)}>Delete</button>
                </td>
            </tr>
        ))}

    {/* Rendering completed orders (complete === true) */}
    {orderData
        .filter(order => order.complete)
        .slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage)
        .map((curOrderData, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{curOrderData.username}</td>
                <td className="px-6 py-4">{curOrderData.phone}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{curOrderData.service}</td>
                <td className="px-6 py-4">{curOrderData.provider}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${curOrderData.price}</td>
                <td className="px-6 py-4">{curOrderData.complete ? "Yes" : "No"}</td>
                <td className="px-6 py-4">
                    <button disabled className="font-medium text-green-600 dark:text-green-100 hover:underline cursor-not-allowed">Completed</button>
                    <button className="font-medium text-red-600 dark:text-red-500 hover:underline ml-2" onClick={() => deleteOrder(curOrderData._id)}>Delete</button>
                </td>
            </tr>
        ))}

    {/* Render message if no orders */}
    {orderData.length === 0 && (
        <tr>
            <td colSpan="7" className="px-6 py-4 text-center">No orders found</td>
        </tr>
    )}
</tbody>

                </table>

                {/* Pagination */}
                <nav className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Previous</button>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(totalOrders / ordersPerPage)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Next</button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700 dark:text-gray-400">
                                Showing <span className="font-medium">{(currentPage - 1) * ordersPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * ordersPerPage, totalOrders)}</span> of <span className="font-medium">{totalOrders}</span> orders
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    Previous
                                </button>
                                {[...Array(Math.ceil(totalOrders / ordersPerPage)).keys()].map(number => (
                                    <button key={number + 1} onClick={() => handlePageChange(number + 1)} className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${currentPage === number + 1 ? 'text-blue-600 bg-blue-50 border-blue-500 dark:bg-blue-600 dark:border-blue-600 dark:text-white' : 'text-gray-700 bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                                        {number + 1}
                                    </button>
                                ))}
                                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(totalOrders / ordersPerPage)} className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    Next
                                </button>
                            </nav>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default AdminOrders;
