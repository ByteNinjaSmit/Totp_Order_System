import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const UserOrderHistory = () => {
  const { authorizationToken, API, user } = useAuth();
  const [ordersData, setOrdersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [error, setError] = useState(null);
  const ordersPerPage = 10;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getOrdersData = async () => {
    try {
      const response = await fetch(`${API}/api/user/${user._id}/user/orders`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }
      const data = await response.json();
      setOrdersData(data);
      setTotalOrders(data.length);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getOrdersData().catch((error) => {
      setError(error.message);
    });
  }, [authorizationToken]);

  return (
    <>
      <div className="container bg-slate-400 mt-3 mb-3">
        <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-white py-3">
          Order History
        </h1>
      </div>

      <div className="overflow-x-auto shadow-md sm:rounded-lg mt-3 bg-white">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-2 text-center">#</th>
              <th scope="col" className="px-4 py-2 text-center">Username</th>
              <th scope="col" className="px-4 py-2 text-center">Date</th>
              <th scope="col" className="px-4 py-2 text-center">Status</th>
              <th scope="col" className="px-4 py-2 text-center">Items</th>
              <th scope="col" className="px-4 py-2 text-center">
                Payment Status
              </th>
              <th scope="col" className="px-4 py-2 text-center">Amount</th>
              <th scope="col" className="px-4 py-2 text-center">View Order</th>
            </tr>
          </thead>
          <tbody>
            {ordersData
              .slice(
                (currentPage - 1) * ordersPerPage,
                currentPage * ordersPerPage
              )
              .map((order, index) => (
                <tr
                  key={order._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {order?.buyer?.username}
                  </td>
                  <td className="px-4 py-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div
                      className={`${
                        order.status === "Delivered"
                          ? "bg-green-200 font-bold text-black text-center rounded-lg py-1"
                          : order.status === "Cancelled"
                          ? "bg-red-200 font-bold text-black text-center rounded-lg py-1"
                          : order.status === "Processing"
                          ? "bg-yellow-200 font-bold text-black text-center rounded-lg py-1"
                          : "bg-gray-200 font-bold text-black text-center rounded-lg py-1"
                      }`}
                    >
                      {order.status}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {order?.products.length}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div
                      className={`${
                        order.paymentStatus === "Completed"
                          ? "bg-green-200 font-bold text-black text-center rounded-lg py-1"
                          : "bg-red-200 font-bold text-black text-center rounded-lg py-1"
                      }`}
                    >
                      {order.paymentStatus}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ₹{" "}
                    {order?.products.reduce(
                      (total, product) =>
                        total + product.price * product.quantity,
                      0
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Link to={`/user/orders/view/${order._id}`}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            {ordersData.length === 0 && (
              <tr>
                <td colSpan="8" className="px-4 py-2 text-center">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <nav className="flex items-center justify-between px-4 py-2 bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(totalOrders / ordersPerPage)}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-400">
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * ordersPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * ordersPerPage, totalOrders)}
                </span>{" "}
                of <span className="font-medium">{totalOrders}</span> orders
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Previous
                </button>
                {[...Array(Math.ceil(totalOrders / ordersPerPage)).keys()].map(
                  (number) => (
                    <button
                      key={number + 1}
                      onClick={() => handlePageChange(number + 1)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                        currentPage === number + 1
                          ? "text-blue-600 bg-blue-50 border-blue-500 dark:bg-blue-600 dark:border-blue-600 dark:text-white"
                          : "text-gray-700 bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      {number + 1}
                    </button>
                  )
                )}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={
                    currentPage === Math.ceil(totalOrders / ordersPerPage)
                  }
                  className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
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
