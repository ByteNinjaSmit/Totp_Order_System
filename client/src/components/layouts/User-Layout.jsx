import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { FaUser, FaHome, FaHistory, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../store/auth";
import { IoMdSettings } from "react-icons/io";

/**
 * UserLayout Component
 * This layout component wraps the user dashboard with a navigation sidebar and main content area.
 * Handles authentication state and redirects unauthenticated users to the home page.
 */
export const UserLayout = () => {
    const { user, isLoading, isLoggedIn } = useAuth();
    const location = useLocation();

    // Check if user data is still loading
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <h1>Loading ...........</h1>
            </div>
        );
    }

    // Redirect unauthenticated users to the home page
    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    // Redirect the root user dashboard URL to the nested user dashboard
    if (location.pathname === `/${user._id}/user`) {
        return <Navigate to={`/${user._id}/user/dashboard`} />;
    }

    // Navigation links array
    const navLinks = [
        { to: `/${user._id}/user/dashboard`, icon: <FaHome />, label: "Dashboard" },
        { to: `/${user._id}/user/edit-profile`, icon: <IoMdSettings />, label: "Edit Profile" },
        { to: `/${user._id}/user/order-history`, icon: <FaHistory />, label: "Order History" },
        { to: `/logout`, icon: <FaSignOutAlt />, label: "Logout" },
    ];

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Sidebar Navigation */}
            <header className="w-full lg:w-1/6 border-b lg:border-r border-gray-300 p-5 bg-white">
                <div className="container mx-auto">
                    <nav>
                        <ul className="flex flex-wrap lg:flex-col items-center lg:items-start justify-center lg:justify-start gap-2 lg:gap-0 lg:space-y-5">
                            {navLinks.map((link) => (
                                <li key={link.to} className="w-full">
                                    <NavLink
                                        to={link.to}
                                        className={({ isActive }) =>
                                            `flex items-center space-x-2 p-2 rounded w-full justify-center lg:justify-start ${
                                                isActive ? "bg-gray-200" : "hover:bg-gray-100"
                                            }`
                                        }
                                    >
                                        {link.icon}
                                        <span>{link.label}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 p-4">
                <Outlet />
            </main>
        </div>
    );
};
