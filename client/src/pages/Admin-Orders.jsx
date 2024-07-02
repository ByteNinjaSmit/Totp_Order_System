import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Select } from "antd";
import { Link } from "react-router-dom";


const { Option } = Select;

const AdminOrders = () => {
    const { authorizationToken } = useAuth();
    const [orderData, setOrderData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const [statusOptions] = useState(["Not Processed", "Processing", "Delivered", "Cancelled"]);
    const [paymentStatusOptions] = useState(["Pending", "Completed"]);

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

    const updateOrderStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/orders/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify({ status: newStatus }),
            });
            if (response.ok) {
                toast.success("Order Status Updated Successfully");
                setOrderData(orderData.map(order => {
                    if (order._id === id) {
                        return { ...order, status: newStatus };
                    }
                    return order;
                }));
            } else {
                toast.error("Failed to update order status");
            }
        } catch (error) {
            console.error("Error updating order status:", error);
            toast.error("Failed to update order status");
        }
    };

    const updatePaymentStatus = async (id, newPaymentStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/orders/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify({ paymentStatus: newPaymentStatus }),
            });
            if (response.ok) {
                toast.success("Payment Status Updated Successfully");
                setOrderData(orderData.map(order => {
                    if (order._id === id) {
                        return { ...order, paymentStatus: newPaymentStatus };
                    }
                    return order;
                }));
            } else {
                toast.error("Failed to update payment status");
            }
        } catch (error) {
            console.error("Error updating payment status:", error);
            toast.error("Failed to update payment status");
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
                            <th scope="col" className="px-6 py-3">#</th>
                            <th scope="col" className="px-6 py-3">Username</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Items</th>
                            <th scope="col" className="px-6 py-3">Payment Status</th>
                            <th scope="col" className="px-6 py-3">Amount</th>
                            <th scope="col" className="px-6 py-3">View Order</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderData
                            .slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage)
                            .map((order, index) => (
                                <tr key={order._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">{index + 1}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">{order?.buyer?.username}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">{new Date(order.createdAt).toLocaleString()
                                    }</td>
                                    <td className="px-6 py-4">
                                        <Select
                                            defaultValue={order.status}
                                            onChange={(value) => updateOrderStatus(order._id, value)}
                                            className={`w-full ${order.status === "Delivered" ? "bg-green-200 font-bold text-black text-center" :
                                                order.status === "Cancelled" ? "bg-red-200 font-bold text-black text-center" : ""
                                                }`}
                                            disabled={order.status === "Delivered" || order.status === "Cancelled"}
                                        >
                                            {statusOptions.map((status, index) => (
                                                <Option key={index} value={status}>{status}</Option>
                                            ))}
                                        </Select>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">{order?.products.length}</td>
                                    <td className="px-6 py-4 text-black ">
                                        <Select
                                            defaultValue={order.paymentStatus}
                                            onChange={(value) => updatePaymentStatus(order._id, value)}
                                            className={`w-full ${order.paymentStatus === "Completed" ? "bg-green-200 text-green-800 font-semibold" :
                                                order.paymentStatus === "Pending" ? "bg-red-200 text-red-800 font-semibold" : ""
                                                }`}
                                            disabled={order.paymentStatus === "Completed"}
                                        >
                                            {paymentStatusOptions.map((status, index) => (
                                                <Option className="text-black" key={index} value={status}>{status}</Option>
                                            ))}
                                        </Select>


                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                                        ₹ {order?.products.reduce((total, product) => total + (product.price * product.quantity), 0)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link to={`/admin/orders/view/${order._id}`}>
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                                View
                                            </button>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="font-medium text-red-600 dark:text-red-500 hover:underline ml-2" onClick={() => deleteOrder(order._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
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
