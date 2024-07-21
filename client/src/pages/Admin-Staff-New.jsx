import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import imageCompression from 'browser-image-compression'; // Import the image compression library

const AdminStaffNew = () => {
    const { authorizationToken, API } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        image: '',
        mobile: '',
        countryCode: '+91',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'countryCode' && value.length > 3) return;
        if (name === 'mobile' && value.length > 10) return;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                // Image compression options
                const options = {
                    maxSizeMB: 1, // Adjust the maxSizeMB based on your needs
                    maxWidthOrHeight: 800, // Adjust the maxWidthOrHeight based on your needs
                    useWebWorker: true,
                };

                // Compress the image
                const compressedFile = await imageCompression(file, options);
                const base64 = await imagetobase64(compressedFile);

                setFormData({ ...formData, image: base64 });
            } catch (error) {
                console.error('Error compressing image:', error);
                toast.error('Failed to compress image');
            }
        }
    };


    const imagetobase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Create a new FormData instance
        const data = new FormData();
        data.append('name', formData.name);
        data.append('role', formData.role);
        data.append('mobile', formData.mobile);
        data.append('countryCode', formData.countryCode);
        if (formData.image) {
            data.append('image', formData.image); // Add image base64 string to form data
        }
    
        // Introduce a 1-second delay
        setTimeout(async () => {
            try {
                const response = await fetch(`${API}/api/admin/staff/data`, {
                    method: 'POST',
                    headers: {
                        Authorization: authorizationToken,
                    },
                    body: data, // Send form data including file
                });
    
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
    
                toast.success('Staff member created successfully');
                navigate('/admin/staff');
            } catch (error) {
                console.error('Error creating staff member:', error);
                toast.error('Failed to create staff member');
            }
        }, 400); // 1000 milliseconds = 0.4 second delay
        
    };
    

    return (
        <div className="flex justify-center mt-2 items-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
                <h1 className="text-center text-3xl mb-6">New Staff Form</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            name="role"
                            id="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select Role</option>
                            <option value="Owner">Owner</option>
                            <option value="Manager">Manager</option>
                            <option value="Chef">Chef</option>
                            <option value="Waiter">Waiter</option>
                            <option value="Servant">Servant</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            accept="image/jpg, image/jpeg, image/png"
                            onChange={handleImageChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <p className="mt-1 text-xs text-red-600">Image must be jpg, jpeg, or png.</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <div>
                            <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700">Country Code</label>
                            <input
                                type="text"
                                name="countryCode"
                                id="countryCode"
                                value={formData.countryCode}
                                onChange={handleChange}
                                required
                                maxLength="3"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                            <input
                                type="text"
                                name="mobile"
                                id="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                                maxLength="10"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminStaffNew;
