import React, { useEffect, useState } from "react";
import { MdTableRestaurant } from "react-icons/md"; // Import the table restaurant icon
import { useAuth } from "../store/auth";
import { io } from "socket.io-client";
import { Tooltip } from "react-tooltip";
import "../tooltip.css"

export const AdminDashboard = () => {
  const [orderData, setOrderData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const { authorizationToken, API } = useAuth();

  useEffect(() => {
    const socket = io(`${API}`, {
      auth: { token: authorizationToken },
    });

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("orderData", (data) => {
      setOrderData(data);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, [authorizationToken]);

  useEffect(() => {
    const socket = io(`${API}`, {
      auth: { token: authorizationToken },
    });

    socket.on("connect", () => {
      console.log("Socket connected Table");
    });

    socket.on("tableData", (data) => {
      setTableData(data);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected Table");
    });

    return () => {
      socket.disconnect();
    };
  }, [authorizationToken]);

// Calculate the time difference in minutes
const getTimeDifferenceInMinutes = (updatedAt) => {
  const updatedAtTime = new Date(updatedAt);
  const currentTime = new Date();
  const diffInMs = currentTime - updatedAtTime;
  const diffInMinutes = Math.floor(diffInMs / 60000); // Convert ms to minutes
  
  // // Log the calculation details
  // console.log(`Updated At: ${updatedAt}`);
  // console.log(`Updated At Time: ${updatedAtTime}`);
  // console.log(`Current Time: ${currentTime}`);
  // console.log(`Difference in MS: ${diffInMs}`);
  // console.log(`Difference in Minutes: ${diffInMinutes}`);
  
  return diffInMinutes;
};


  return (
    <>
      <div className="flex flex-wrap justify-center sm:justify-between w-4/5 mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 m-2 w-48 text-center">
          <div className="text-sm font-bold mb-2">Pending Orders</div>
          <div className="text-xl font-bold">237</div>
          <div className="h-1 bg-blue-500 mt-2 w-full"></div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 m-2 w-48 text-center">
          <div className="text-sm font-bold mb-2">Active Orders</div>
          <div className="text-xl font-bold">164</div>
          <div className="h-1 bg-green-500 mt-2 w-full"></div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 m-2 w-48 text-center">
          <div className="text-sm font-bold mb-2">Delivered Orders</div>
          <div className="text-xl font-bold">197</div>
          <div className="h-1 bg-green-800 mt-2 w-full"></div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 m-2 w-48 text-center">
          <div className="text-sm font-bold mb-2">Cancelled Orders</div>
          <div className="text-xl font-bold">77</div>
          <div className="h-1 bg-red-500 mt-2 w-full"></div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 m-2 w-48 text-center">
          <div className="text-sm font-bold mb-2">Food Items</div>
          <div className="text-xl font-bold">77</div>
          <div className="h-1 bg-orange-500 mt-2 w-full"></div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 m-2 w-48 text-center">
          <div className="text-sm font-bold mb-2">Food Categories</div>
          <div className="text-xl font-bold">77</div>
          <div className="h-1 bg-purple-500 mt-2 w-full"></div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 m-2 w-48 text-center">
          <div className="text-sm font-bold mb-2">Total Tables</div>
          <div className="text-xl font-bold">20</div>
          <div className="h-1 bg-blue-700 mt-2 w-full"></div>
        </div>
      </div>
      <hr className="mt-4 w-4/5 justify-center mx-auto border-3" />
 {/* Tables for Ground Floor */}
 <div className="w-4/5 mx-auto">
        <div className="text-lg font-bold mb-2 text-center">Ground Floor</div>
        <div className="flex flex-wrap justify-center gap-4">
          {tableData.slice(0, 10).map((table, index) => (
            <div
              key={index}
              className={`relative rounded-lg shadow-lg p-4 m-2 w-32 h-32 flex flex-col items-center justify-center text-center ${
                table.tableEngage ? "bg-red-200" : "bg-gray-200"
              }`}
              data-tip={table.tableEngage 
                ? `Engaged for ${getTimeDifferenceInMinutes(table.updatedAt)} minutes` 
                : ""}
            >
              <MdTableRestaurant className="text-gray-700 text-6xl mb-2" />
              <div className="text-sm font-bold">Table {table.tableNo}</div>
              {table.tableEngage && (
                <div className="tooltiptext">
                  {`Engaged for ${getTimeDifferenceInMinutes(table.updatedAt)} minutes`}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <hr className="w-4/5 mx-auto mt-6 mb-6 border-t-2 border-gray-300" />

      {/* Tables for First Floor */}
      <div className="w-4/5 mx-auto">
        <div className="text-lg font-bold mb-2 text-center">First Floor</div>
        <div className="flex flex-wrap justify-center gap-4">
          {tableData.slice(10, 20).map((table, index) => (
            <div
              key={index}
              className={`relative rounded-lg shadow-lg p-4 m-2 w-32 h-32 flex flex-col items-center justify-center text-center ${
                table.tableEngage ? "bg-red-200" : "bg-gray-200"
              }`}
              data-tip={table.tableEngage 
                ? `Engaged for ${getTimeDifferenceInMinutes(table.updatedAt)} minutes` 
                : ""}
            >
              <MdTableRestaurant className="text-gray-700 text-6xl mb-2" />
              <div className="text-sm font-bold">Table {table.tableNo}</div>
              {table.tableEngage && (
                <div className="tooltiptext">
                  {`Engaged for ${getTimeDifferenceInMinutes(table.updatedAt)} minutes`}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
