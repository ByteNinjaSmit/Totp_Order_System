import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';  // Ensure you have react-toastify installed
import { useNavigate } from 'react-router-dom';  // Ensure you have react-router-dom installed

export const AdminOrders = () => {
    const { authorizationToken } = useAuth();
    const [orderData, setOrderData] = useState([]);
    const navigate = useNavigate();

    const getOrdersData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/admin/orders', {
                method: 'GET',
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();

            if (response.ok) {
                setOrderData(data);
            } else {
                console.log('Failed to fetch orders');
            }
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const updateOrder = async (id, event) => {
        event.preventDefault();
        setTimeout(async () => {
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
                    getOrdersData();  // Refresh orders data after update
                } else {
                    toast.error("Update Failed");
                }
            } catch (error) {
                console.log(`Error from Update Order: ${error}`);
                toast.error("An error occurred while updating the order");
            }
        }, 500);
    };

    useEffect(() => {
        getOrdersData().catch((error) => {
            console.log(error);
        });
    }, [authorizationToken]);

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
                    </tr>
                </thead>
                <tbody>
                    {orderData.map((curOrderData, index) => (
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
