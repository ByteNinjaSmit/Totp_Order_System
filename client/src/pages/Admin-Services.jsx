import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export const AdminServices = () => {
    const { authorizationToken, API } = useAuth();
    const [serviceData, setServiceData] = useState([]);
    const [totalServices, setTotalServices] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const servicesPerPage = 10;

    useEffect(() => {
        getServices();
    }, []);

    const getServices = async () => {
        try {
            const response = await fetch(`${API}/api/data/service`, {
                method: "GET",
                
            });
            if (response.ok) {
                const data = await response.json();
                setServiceData(data.msg);
                setTotalServices(data.msg.length);
            } else {
                console.log("Error fetching services:", response.status);
            }
        } catch (error) {
            console.log(`Services frontend error: ${error}`);
        }
    };

    const deleteService = async (id) => {
        try {
            const response = await fetch(`${API}/api/admin/services/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (response.ok) {
                toast.success("Service Deleted Successfully");
                setServiceData(serviceData.filter(service => service._id !== id));
                setTotalServices(totalServices - 1);
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

    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = serviceData.slice(indexOfFirstService, indexOfLastService);

    return (
        <>
            <div className="bg-slate-400 pt-3 pb-2 ">
                <h1 className="w-full text-center mt-3 sm:text-5xl text-2xl lg:text-6xl mb-10 font-bold text-dark-600">
                    Admin Services Panel
                </h1>
            </div>
            <div className="pt-3 pb-2 sm:pl-4">
                <Link to="/admin/services/new/form">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Create New Service
                    </button>
                </Link>
            </div>
            <div className="relative shadow-md sm:rounded-lg mx-4 mt-4 overflow-x-scroll">
                <table className="w-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-scroll">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">#</th>
                            <th scope="col" className="px-6 py-3">Product Img</th>
                            <th scope="col" className="px-6 py-3">Product Name</th>
                            <th scope="col" className="px-6 py-3">Description</th>
                            <th scope="col" className="px-6 py-3">Ingredients</th>
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Vegetarian</th>
                            <th scope="col" className="px-6 py-3">Available</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentServices.length > 0 ? (
                            currentServices.map((service, index) => (
                                <tr key={service._id} className={`bg-white ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-900'} border-b dark:border-gray-700`}>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1 + (currentPage - 1) * servicesPerPage}
                                    </td>
                                    <td scope="row" className="px-6 py-4">
                                        <img className="block w-8 h-8 rounded-full" src={service.image} alt={service.name} />
                                    </td>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {service.name}
                                    </td>
                                    <td className="px-6 py-4">{service.description}</td>
                                    <td className="px-6 py-4">
                                        {service.ingredients.join(", ")}
                                    </td>
                                    <td className="px-6 py-4">{service.category}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{service.vegetarian ? "Yes" : "No"}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{service.available ? "Yes" : "No"}</td>
                                    <td className="px-6 py-4">${service.price}</td>
                                    <td className="px-6 py-4">
                                        <Link to={`/admin/services/${service._id}/edit/form`}>
                                            <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-2">Edit</button>
                                        </Link>
                                        <button className="font-medium text-red-600 dark:text-red-500 hover:underline ml-2" onClick={() => deleteService(service._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="text-center py-4">
                                    No services available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <nav className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Previous</button>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(totalServices / servicesPerPage)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Next</button>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700 dark:text-gray-400">
                                Showing <span className="font-medium">{(currentPage - 1) * servicesPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * servicesPerPage, totalServices)}</span> of <span className="font-medium">{totalServices}</span> services
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    Previous
                                </button>
                                {[...Array(Math.ceil(totalServices / servicesPerPage)).keys()].map(number => (
                                    <button key={number + 1} onClick={() => handlePageChange(number + 1)} className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${currentPage === number + 1 ? 'text-blue-600 bg-blue-50 border-blue-500 dark:bg-blue-600 dark:border-blue-600 dark:text-white' : 'text-gray-700 bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                                        {number + 1}
                                    </button>
                                ))}
                                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(totalServices / servicesPerPage)} className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
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
