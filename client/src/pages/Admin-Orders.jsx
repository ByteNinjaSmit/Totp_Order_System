import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';  // Ensure you have react-toastify installed
import { useNavigate } from 'react-router-dom';  // Ensure you have react-router-dom installed

export const AdminOrders = () => {
    const { authorizationToken } = useAuth();
    const [orderData, setOrderData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const socket = io("http://localhost:5000", {
            auth: { token: authorizationToken },
        });

        socket.on("orderData", (data) => {
            setOrderData(data);
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
            const data = await response.json();
            // console.log(`User After Delete ${data}`);
            if (response.ok){
                toast.success("Order Deleted Successfully");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateOrder = async (id, event) => {
        event.preventDefault();
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
                toast.success("Updated Successfully");
            } else {
                toast.error("Update Failed");
            }
        } catch (error) {
            console.error(`Error updating order: ${error}`);
            toast.error("An error occurred while updating the order");
        }
    };
    return (
        <>
            <h1 className="text-center mt-2">Admin Orders</h1>
            <table className="table table-hover table-striped table-dark table-bordered w-75 mx-auto mt-3 text-center">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Phone</th>
                        <th>Service</th>
                        <th>Provider</th>
                        <th>Price</th>
                        <th>Complete</th>
                        <th>Action</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {orderData
                        .sort((a, b) => {
                            if (a.complete === b.complete) {
                                return new Date(b.createdAt) - new Date(a.createdAt); // Assuming you have a `createdAt` field
                            }
                            return a.complete - b.complete;
                        })
                        .map((curOrderData, index) => (
                            <tr key={index}>
                                <td>{curOrderData.username}</td>
                                <td>{curOrderData.phone}</td>
                                <td>{curOrderData.service}</td>
                                <td>{curOrderData.provider}</td>
                                <td>{curOrderData.price}</td>
                                <td>{curOrderData.complete ? "Yes" : "No"}</td>
                                <td>
                                    {curOrderData.complete ? (
                                        <button type="button" className="btn btn-outline-success" disabled>Completed</button>
                                    ) : (
                                        <button className="btn btn-danger" onClick={(event) => updateOrder(curOrderData._id, event)}>Complete</button>
                                    )}
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteOrder(curOrderData._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
};
