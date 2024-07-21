import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import {FaUser, FaHome, FaRegListAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/auth";
import { IoMdTimer } from "react-icons/io";
import { BsCartCheck } from "react-icons/bs";
import { MdPeople } from "react-icons/md";
import { FaUsersBetweenLines } from "react-icons/fa6";


export const AdminLayout = () => {
    const { user, isLoading } = useAuth();
    const location = useLocation();


    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <h1>Loading ...........</h1>
            </div>
        );
    }

    // This File path is /admin if this path then navigate to /admin/dashboard write below login
    // logic here
    // if location.path == /admin then navigate /admin/dashboard
    if (!user.isAdmin) {
        return <Navigate to="/" />;
    }

    if (location.pathname === '/admin') {
        return <Navigate to="/admin/dashboard" />;
    }
    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            <header className="w-full lg:w-1/6 border-b lg:border-r border-gray-300 p-5 bg-white">
                <div className="container mx-auto">
                    <nav>
                        <ul className="flex flex-wrap lg:flex-col items-center lg:items-start justify-center lg:justify-start gap-2 lg:gap-0 lg:space-y-5">
                            <li className="w-full">
                                <NavLink
                                    to="/admin/dashboard"
                                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded w-full justify-center lg:justify-start"
                                    activeclassname="bg-gray-200"
                                >
                                    <FaHome />
                                    <span>Home</span>
                                </NavLink>
                            </li>
                            <li className="w-full">
                                <NavLink
                                    to="/admin/users"
                                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded w-full justify-center lg:justify-start"
                                    activeclassname="bg-gray-200"
                                >
                                    <FaUser />
                                    <span>Users</span>
                                </NavLink>
                            </li>
                            <li className="w-full">
                                <NavLink
                                    to="/admin/staff"
                                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded w-full justify-center lg:justify-start"
                                    activeclassname="bg-gray-200"
                                >
                                    <FaUsersBetweenLines />
                                    <span>Staff</span>
                                </NavLink>
                            </li>
                            <li className="w-full">
                                <NavLink
                                    to="/admin/services"
                                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded w-full justify-center lg:justify-start"
                                    activeclassname="bg-gray-200"
                                >
                                    <FaRegListAlt />
                                    <span>Services</span>
                                </NavLink>
                            </li>
                            <li className="w-full">
                                <NavLink
                                    to="/admin/orders"
                                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded w-full justify-center lg:justify-start"
                                    activeclassname="bg-gray-200"
                                >
                                    <BsCartCheck />
                                    <span>Orders</span>
                                </NavLink>
                            </li>
                            <li className="w-full">
                                <NavLink
                                    to="/admin/contacts"
                                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded w-full justify-center lg:justify-start"
                                    activeclassname="bg-gray-200"
                                >
                                    <FaMessage />
                                    <span>Contacts</span>
                                </NavLink>
                            </li>
                            <li className="w-full">
                                <NavLink
                                    to={`/admin/totp/${user._id}`}
                                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded w-full justify-center lg:justify-start"
                                    activeclassname="bg-gray-200"
                                >
                                    <IoMdTimer />
                                    <span>Totp</span>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main className="flex-1 p-4">
                <Outlet />
            </main>
        </div>
    );
};
