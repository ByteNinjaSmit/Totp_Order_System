import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const AdminContacts = () => {
    const { authorizationToken } = useAuth();
    const [contactData, setContactData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalContacts, setTotalContacts] = useState(0);
    const contactsPerPage = 10;

    useEffect(() => {
        const socket = io("http://localhost:5000", {
            auth: { token: authorizationToken },
        });

        socket.on("connect", () => {
            console.log("Socket connected");
        });

        socket.on("contactData", (data) => {
            if (data) {
                setContactData(data);
                setTotalContacts(data.length);
            } else {
                setContactData([]);
                setTotalContacts(0);
            }
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected");
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
                // Remove deleted contact from state
                setContactData(contactData.filter(contact => contact._id !== id));
                setTotalContacts(totalContacts - 1);
            } else {
                toast.error("Failed to delete contact");
            }
        } catch (error) {
            console.error("Error deleting contact:", error);
            toast.error("Failed to delete contact");
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <div className="bg-slate-400 pt-3 pb-2">
                <h1 className="w-100 text-center mt-3 sm:text-5xl text-2xl lg:text-6xl mb-10 font-bold ">Admin Contacts Panel</h1>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Username</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Message</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactData.length > 0 ? contactData.slice((currentPage - 1) * contactsPerPage, currentPage * contactsPerPage).map((curContactData, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{curContactData.username}</td>
                                <td className="px-6 py-4">{curContactData.email}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">{curContactData.message}</td>
                                <td className="px-6 py-4">
                                    <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => deleteContactById(curContactData._id)}>Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center">No contacts found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">{(currentPage - 1) * contactsPerPage + 1}-{Math.min(currentPage * contactsPerPage, totalContacts)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{totalContacts}</span></span>
                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        <li>
                            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
                        </li>
                        {[...Array(Math.ceil(totalContacts / contactsPerPage)).keys()].map(number => (
                            <li key={number + 1}>
                                <button onClick={() => handlePageChange(number + 1)} className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === number + 1 ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}>{number + 1}</button>
                            </li>
                        ))}
                        <li>
                            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(totalContacts / contactsPerPage)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default AdminContacts;
