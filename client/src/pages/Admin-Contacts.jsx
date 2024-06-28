import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";


export const AdminContacts = () => {
    const { authorizationToken } = useAuth();
    const [contactData, setContactData] = useState([]);
    const getContactsData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/admin/contacts', {
                method: 'GET',
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setContactData(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Contact delete Button

    const deleteContactById = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (response.ok) {
                toast.success("Contact Deleted Successfull")
            }else{
                toast.alert("Contact Not Delete Successfull")
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getContactsData();
    })
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
                    {contactData.map((curContactData, index) => {
                        return (
                            <tr key={index}>
                                <td>{curContactData.username}</td>
                                <td>{curContactData.email}</td>
                                <td>{curContactData.message}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteContactById(curContactData._id)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};