import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export const AdminStaff = () => {
    const { authorizationToken, API } = useAuth();
    const [staffData, setStaffData] = useState([]);
    const [totalStaff, setTotalStaff] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const staffsPerPage = 10;

    useEffect(() => {
        getStaff();
    }, []);

    const getStaff = async () => {
        try {
            const response = await fetch(`${API}/api/admin/staff`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setStaffData(data);
                setLoading(false);
                setTotalStaff(data.length);
            } else {
                console.log("Error fetching staff:", response.status);
            }
        } catch (error) {
            console.log("Staff Admin frontend error:", error);
        }
    };

    useEffect(() => {
        getStaff();
    }, []);


    // Delete Staff Logic
        const deleteStaff = async (id) => {
        try {
            const response = await fetch(`${API}/api/admin/staff/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (response.ok) {
                toast.success("Service Deleted Successfully");
                getStaff();
                setStaffData(staffData.filter(staff => staff._id !== id));
                setTotalStaff(totalStaff - 1);
            } else {
                toast.error("Failed to delete service");
            }
        } catch (error) {
            console.error("Error deleting service:", error);
            toast.error("Failed to delete service");
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const indexOfLastStaff = currentPage * staffsPerPage;
    const indexOfFirstStaff = indexOfLastStaff - staffsPerPage;
    const currentStaff = staffData.slice(indexOfFirstStaff, indexOfLastStaff);

    return (
        <>
            <div className="bg-slate-400 pt-3 pb-2 ">
                <h1 className="w-full text-center mt-3 sm:text-5xl text-2xl lg:text-6xl mb-10 font-bold text-purple-600">
                    Admin Staff Panel
                </h1>
            </div>
            <div className="pt-3 pb-2 sm:pl-4">
                <Link to="/admin/staff/new/form">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Add New Staff
                    </button>
                </Link>
            </div>
            <div className="relative shadow-md sm:rounded-lg mx-4 mt-4 overflow-x-auto">
                <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">#</th>
                            <th scope="col" className="px-6 py-3">Staff Img</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Role</th>
                            <th scope="col" className="px-6 py-3">Available</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentStaff.length > 0 ? (
                            currentStaff.map((staff, index) => (
                                <tr key={staff._id} className={`bg-white ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-900'} border-b dark:border-gray-700`}>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1 + (currentPage - 1) * staffsPerPage}
                                    </td>
                                    <td scope="row" className="px-6 py-4">
                                        <img className="block w-8 h-8 rounded-full" src="" alt={staff.name} />
                                    </td>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {staff.name}
                                    </td>
                                    <td className="px-6 py-4 font-semibold">{staff.role}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{staff.work ? "Yes" : "No"}</td>
                                    <td className="px-6 py-4">
                                        <Link to={`/admin/services/${staff._id}/edit/form`}>
                                            <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-2">Edit</button>
                                        </Link>
                                        <button className="font-medium text-red-600 dark:text-red-500 hover:underline ml-2" onClick={() => deleteStaff(staff._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="text-center py-4">
                                    No staff available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <nav className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Previous</button>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(totalStaff / staffsPerPage)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Next</button>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700 dark:text-gray-400">
                                Showing <span className="font-medium">{(currentPage - 1) * staffsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * staffsPerPage, totalStaff)}</span> of <span className="font-medium">{totalStaff}</span> staffs
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    Previous
                                </button>
                                {[...Array(Math.ceil(totalStaff / staffsPerPage)).keys()].map(number => (
                                    <button key={number + 1} onClick={() => handlePageChange(number + 1)} className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${currentPage === number + 1 ? 'text-blue-600 bg-blue-50 border-blue-500 dark:bg-blue-600 dark:border-blue-600 dark:text-white' : 'text-gray-700 bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                                        {number + 1}
                                    </button>
                                ))}
                                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(totalStaff / staffsPerPage)} className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
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
