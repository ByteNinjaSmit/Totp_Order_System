import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Select } from "antd";

const AdminViewOrder = () => {
  const [orderData, setOrderData] = useState(null); // Initialize as null
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const shipStatusOptions = [
    { value: "Not Processed", label: "Not Processed" },
    { value: "Processing", label: "Processing" },
    { value: "Delivered", label: "Delivered" },
    { value: "Cancelled", label: "Cancelled" },
  ];
  const params = useParams();
  const { authorizationToken, API } = useAuth();

  // Fetch order data
  const getSingleOrderData = async () => {
    try {
      const response = await fetch(
        `${API}/api/admin/orders/view/${params.id}`,
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
      } else {
        console.error("Failed to fetch order data");
      }
    } catch (error) {
      console.error(`Error fetching order data: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Update product shipping status
  const updateOrderProductShipStatus = async (productId, newStatus) => {
    console.log(`Shipping Status New: ${newStatus}`);
    try {
      const response = await fetch(
        `${API}/api/admin/orders/update/${params.id}/product/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify({ shippingStatus: newStatus }),
        }
      );
      if (response.ok) {
        toast.success("Product Status Updated Successfully");
        await getSingleOrderData(); // Refresh data
      } else {
        toast.error("Failed to update Product status");
      }
    } catch (error) {
      console.error("Error updating Product status:", error);
      toast.error("Failed to update Product status");
    }
  };

  // Check and update order status if all products are delivered
  const checkAndUpdateOrderStatus = async () => {
    if (!orderData || !orderData.products) {
      console.error("Order data or products not available.");
      return;
    }

    // console.log("Order data available:", orderData);

    const deliveredProductsCount = orderData.products.filter(
      (product) => product.shippingStatus === "Delivered"
    ).length;

    if (deliveredProductsCount === orderData.products.length) {
      await updateOrderStatusAuto(orderData._id);
      await getSingleOrderData(); // Refresh data
    }
  };

  // Automatically update order status
  const updateOrderStatusAuto = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/orders/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify({ status: "Delivered" }),
      });
      if (response.ok) {
        // console.log("Order status updated to Delivered");
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Manually update order status
  const updateOrderStatus = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/orders/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify({
          status: "Delivered",
          paymentStatus: "Completed",
        }),
      });
      if (response.ok) {
        toast.success("Order Status Updated Successfully");
        await getSingleOrderData(); // Refresh data
      } else {
        toast.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };
  // get table Data
  // Fetch table data
  const getAlltableData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/table`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTableData(data);
      } else {
        console.error("Failed to fetch table data");
      }
    } catch (error) {
      console.error(`Error fetching table data: ${error}`);
    } finally {
    }
  };

  // Update table engage
  const updateTableEngage = async () => {
    try {
      const response = await fetch(`${API}/api/admin/table/${orderData.tableNo}`, {
        method: "POST",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        toast.success("Successfully updated Table.");
        getAlltableData(); // Re-fetch table data to update the status
      } else {
        console.error("Failed to Free  table data");
      }
    } catch (error) {
      console.error(`Error Free table data: ${error}`);
    } finally {
    }
  };
  // Check if the order's table is engaged
  const isTableEngaged = () => {
    const table = tableData.find((t) => t.tableNo === orderData.tableNo);
    return table ? table.tableEngage : false;
  };

  // Fetch data on component mount
  useEffect(() => {
    getAlltableData();
    getSingleOrderData();
  }, [API, authorizationToken]);

  // Check order status after data is fetched
  useEffect(() => {
    if (orderData) {
      checkAndUpdateOrderStatus();
    }
  }, [orderData]);

  // Render loading indicator while data is being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Format date for display
  const createdAtDateTime = new Date(orderData.createdAt).toLocaleString();

  // Render the order details once data is loaded
  return (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <div className="flex max-sm:flex-wrap justify-between">
          <h2 className="font-manrope font-bold text-3xl sm:text-4xl leading-10 text-black mb-11">
            Order Detail
          </h2>
          <Link to="/admin/orders">
            <button className="btn btn-primary mb-10 ">
              Go To Orders Page
            </button>
          </Link>
          {isTableEngaged() && (
            <button
              className="btn btn-danger mb-10"
              onClick={updateTableEngage}
            >
              Free Table
            </button>
          )}
          <button
            onClick={() => updateOrderStatus(orderData._id)}
            className={`btn btn-primary mb-10 ${
              orderData.paymentStatus === "Completed"
                ? "bg-green-200 text-green-800 font-semibold disabled btn-success"
                : ""
            }`}
          >
            Mark As Done
          </button>
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
                      Quantity :{" "}
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
                    <Select
                      defaultValue={product.shippingStatus}
                      onChange={(newStatus) =>
                        updateOrderProductShipStatus(product._id, newStatus)
                      }
                      className={`w-full ${
                        product.shippingStatus === "Cancelled"
                          ? "bg-red-200 font-bold text-black text-center"
                          : product.shippingStatus === "Delivered"
                          ? "bg-green-200 font-bold text-black text-center"
                          : product.shippingStatus === "Processing"
                          ? "bg-yellow-200 font-bold text-black text-center rounded-lg py-1"
                          : "bg-gray-200 font-bold text-black text-center rounded-lg py-1"
                      }`}
                      disabled={
                        product.shippingStatus === "Delivered" ||
                        product.shippingStatus === "Cancelled"
                      }
                      options={shipStatusOptions}
                    />
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
                    )}
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
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="data">
          <h6 className="font-manrope font-bold text-2xl leading-9 text-black mb-3">
            Thank you for Dealing with us!
          </h6>
          <p className="font-medium text-xl leading-8 text-indigo-600">
            Team Cyber_Byte
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdminViewOrder;
