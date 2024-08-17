import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

export const UserDashboard = () => {
    const { user } = useAuth();

    return (
        <>
            <div className="bg-gradient-to-r from-blue-500 to-teal-500 py-6">
                <div className="container mx-auto text-center text-white">
                    <h1 className="text-4xl font-extrabold mb-2">Welcome Back, <span className="text-yellow-200">{user.username}</span>!</h1>
                    <p className="text-lg">Your personal dashboard at My Hotel</p>
                </div>
            </div>

            <div className="container mx-auto bg-slate-100 p-6 rounded-lg shadow-md mt-6 mb-6">
                <div className="flex items-center space-x-4 mb-6">
                    {/* Welcome Icon */}
                    <svg className="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2a5 5 0 015 5v3a5 5 0 01-5 5 5 5 0 01-5-5V7a5 5 0 015-5zM6 21h12m-6-5v5m-3-5h6"></path>
                    </svg>
                    {/* Welcome Text */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">Hello, <span className="text-blue-600">{user.username}</span>!</h2>
                        <p className="text-gray-600 mt-1">Manage your bookings, update your profile, and contact support—all from here.</p>
                    </div>
                </div>
                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {/* View Orders Action */}
                    <Link to={`/${user._id}/user/order-history`} className="bg-white p-6 rounded-lg shadow-md hover:bg-blue-50 transition duration-300 ease-in-out">
                        <svg className="w-8 h-8 text-blue-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M4 11h16m-7 4h7"></path>
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-800">View Orders</h3>
                        <p className="text-gray-600 mt-2">Access and manage your hotel bookings easily.</p>
                    </Link>
                    {/* Update Profile Action */}
                    <Link to={`/${user._id}/user/edit-profile`} className="bg-white p-6 rounded-lg shadow-md hover:bg-blue-50 transition duration-300 ease-in-out">
                        <svg className="w-8 h-8 text-blue-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5h6M9 12h6m-6 7h6"></path>
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-800">Update Profile</h3>
                        <p className="text-gray-600 mt-2">Edit your profile details and preferences.</p>
                    </Link>
                    {/* Contact Support Action */}
                    <Link to={`/contact`} className="bg-white p-6 rounded-lg shadow-md hover:bg-blue-50 transition duration-300 ease-in-out">
                        <svg className="w-8 h-8 text-blue-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c4.418 0 8 3.582 8 8s-3.582 8-8 8S4 20.418 4 16s3.582-8 8-8zm0 0V4m0 12h8m-8-8H4"></path>
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-800">Contact Support</h3>
                        <p className="text-gray-600 mt-2">Reach out to our support team for assistance.</p>
                    </Link>
                </div>
            </div>
        </>
    );
}
