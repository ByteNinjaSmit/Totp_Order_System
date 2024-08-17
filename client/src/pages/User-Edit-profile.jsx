import { useState } from 'react';
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export const UserEditProfile = () => {
    const { API,user, authorizationToken } = useAuth();
    const [username, setUsername] = useState(user.username || '');
    const [email, setEmail] = useState(user.email || '');
    const [phone, setPhone] = useState(user.phone || '');

    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');

    const [profileErrors, setProfileErrors] = useState({});
    const [passwordErrors, setPasswordErrors] = useState({});
    const params = useParams();
    const userId = params.id;

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            default:
                break;
        }
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        if (name === 'newPassword') setNewPassword(value);
        if (name === 'reNewPassword') setReNewPassword(value);
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        // Add your profile update logic here
        try {
            const response = await fetch(`${API}/api/user/profile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken, // Ensure token is prefixed with "Bearer "
                },
                body: JSON.stringify({
                    id: userId,
                    username: username,
                    phone: phone,
                    email: email,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(data.message || 'Profile updated successfully!');
            } else {
                toast.error(data.message || 'An error occurred while updating the profile.');
            }
        } catch (error) {
            console.error('Profile update failed:', error);
            toast.error('An unexpected error occurred.');
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        let hasErrors = false;
        let errors = {};

        if (!newPassword) {
            errors.newPassword = 'New password is required.';
            hasErrors = true;
        } else if (newPassword.length < 6) {
            errors.newPassword = 'New password must be at least 6 characters long.';
            hasErrors = true;
        }
        if (newPassword !== reNewPassword) {
            errors.reNewPassword = 'Passwords do not match.';
            hasErrors = true;
        }

        if (hasErrors) {
            setPasswordErrors(errors);
            return;
        }

        try {
            const response = await fetch(`${API}/api/user/password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken, // Ensure token is prefixed with "Bearer "
                },
                body: JSON.stringify({
                    id: userId,
                    newPassword: newPassword,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(data.message || 'Password updated successfully!');
            } else {
                toast.error(data.message || 'An error occurred while updating the password.');
            }
        } catch (error) {
            console.error('Password update failed:', error);
            toast.error('An unexpected error occurred.');
        }
    };

    return (
        <>
            <div className="relative overflow-hidden bg-gradient-to-r from-teal-500 to-blue-600 py-12">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <svg
                        className="absolute left-0 transform -translate-x-1/2 -translate-y-1/4 opacity-50"
                        width="500"
                        height="500"
                        viewBox="0 0 500 500"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="250" cy="250" r="200" stroke="url(#gradient)" strokeWidth="70" />
                        <defs>
                            <linearGradient id="gradient" x1="0" x2="1" y1="0" y2="1">
                                <stop offset="0%" stopColor="#00B2FF" />
                                <stop offset="100%" stopColor="#006CFF" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <svg
                        className="absolute right-0 transform translate-x-1/2 translate-y-1/4 opacity-30"
                        width="400"
                        height="400"
                        viewBox="0 0 400 400"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="200" cy="200" r="150" stroke="url(#gradient)" strokeWidth="60" />
                        <defs>
                            <linearGradient id="gradient" x1="0" x2="1" y1="0" y2="1">
                                <stop offset="0%" stopColor="#00B2FF" />
                                <stop offset="100%" stopColor="#006CFF" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <div className="container mx-auto text-center relative z-10">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                        <span className="text-yellow-400">Transform</span> <span className="text-yellow-300">Your Profile</span>
                    </h1>
                    <p className="text-xl sm:text-2xl lg:text-3xl text-gray-100 mb-6">
                        Seamlessly update your details and enhance your account settings with ease.
                    </p>
                    <div className="relative inline-block">
                        <span className="absolute inset-0 transform -skew-x-12 bg-gradient-to-r from-teal-300 to-blue-400 opacity-60"></span>
                        <h2 className="relative text-lg font-semibold text-gray-800 px-4 py-2 bg-white rounded-lg shadow-lg">
                            Manage Your Account
                        </h2>
                    </div>
                </div>
            </div>

            {/* Profile Edit Section */}
            <div className="container mx-auto p-6 bg-white rounded-lg shadow-md mt-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Profile Details</h2>
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={handleProfileChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleProfileChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="phone" className="block text-gray-700 text-sm font-semibold mb-2">
                            Phone
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={phone}
                            onChange={handleProfileChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-teal-500 text-white p-3 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
                        >
                            Update Profile
                        </button>
                    </div>
                </form>
            </div>

            {/* Horizontal Line */}
            <div className="container mx-auto my-6 border-t border-gray-300"></div>

            {/* Change Password Section */}
            <div className="container mx-auto p-6 bg-white rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Change Password</h2>
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    {/* New Password */}
                    <div>
                        <label htmlFor="newPassword" className="block text-gray-700 text-sm font-semibold mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={newPassword}
                            onChange={handlePasswordChange}
                            className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${passwordErrors.newPassword ? 'border-red-500 focus:ring-red-500' : 'focus:ring-teal-500'}`}
                            placeholder="Enter new password"
                            required
                        />
                        {passwordErrors.newPassword && (
                            <p className="text-red-500 text-sm mt-1">{passwordErrors.newPassword}</p>
                        )}
                    </div>

                    {/* Re-enter New Password */}
                    <div>
                        <label htmlFor="reNewPassword" className="block text-gray-700 text-sm font-semibold mb-2">
                            Re-enter New Password
                        </label>
                        <input
                            type="password"
                            id="reNewPassword"
                            name="reNewPassword"
                            value={reNewPassword}
                            onChange={handlePasswordChange}
                            className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${passwordErrors.reNewPassword ? 'border-red-500 focus:ring-red-500' : 'focus:ring-teal-500'}`}
                            placeholder="Re-enter new password"
                            required
                        />
                        {passwordErrors.reNewPassword && (
                            <p className="text-red-500 text-sm mt-1">{passwordErrors.reNewPassword}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};
