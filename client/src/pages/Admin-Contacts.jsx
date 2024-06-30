import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

export const AdminContacts = () => {
    const { authorizationToken } = useAuth();
    const [contactData, setContactData] = useState([]);

    useEffect(() => {
        const socket = io("http://localhost:5000", {
            auth: { token: authorizationToken },
        });
        socket.on("contactData", (data) => {
            setContactData(data);
        });
        return () => {
            socket.disconnect();
        };
    }, [authorizationToken]);

    const deleteContactById = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (response.ok) {
                toast.success("Contact Deleted Successfully");
            } else {
                toast.error("Failed to delete contact");
            }
        } catch (error) {
            console.error("Error deleting contact:", error);
            toast.error("Failed to delete contact");
        }
    };

    // if (error) {
    //     return <p>Error fetching contacts: {error}</p>;
    // }
    return (
        <>
            <h1 className="w-100 text-center mt-3">Admin Contacts Panel</h1>
            <table className="table table-hover table-striped table-dark table-bordered w-75 mx-auto mt-3 text-center ">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {contactData.map((curContactData, index) => (
                        <tr key={index}>
                            <td>{curContactData.username}</td>
                            <td>{curContactData.email}</td>
                            <td>{curContactData.message}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteContactById(curContactData._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
