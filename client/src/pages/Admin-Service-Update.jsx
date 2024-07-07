import React, { useState, useEffect } from 'react';
import { useParams, useNavigate,Link } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

export const AdminServiceUpdate = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { authorizationToken,API } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        ingredients: [],
        vegetarian: false,
        spicy: false,
        image: '',
        available: false,
    });

    useEffect(() => {
        const getSingleServiceData = async () => {
            try {
                const response = await fetch(`${API}/api/admin/services/data/single/${params.id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: authorizationToken,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setFormData(data);
                setIsLoading(false);
            } catch (error) {
                console.error(`Admin Update Service Data: ${error}`);
                setIsLoading(false);
            }
        };

        getSingleServiceData();
    }, [params.id, authorizationToken]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API}/api/admin/services/update/${params.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success('Service updated successfully');
                navigate('/admin/services');
            } else {
                toast.error('Failed to update service');
            }
        } catch (error) {
            console.error('Error updating service:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="bg-slate-400 pt-3 pb-2">
                <h1 className="text-center mt-3 sm:text-5xl text-2xl lg:text-6xl mb-10 font-bold text-dark-600">
                    Admin Service Update
                </h1>
            </div>
            <div className="pt-3 pb-2 sm:pl-4">
                <Link to="/admin/services">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                        Go back 
                    </button>
                </Link>
            </div>
            <div className="container mx-auto py-6">
                <form
                    className="max-w-lg mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md"
                    onSubmit={handleSubmit}
                >
                    {/* Form fields */}
                    {/* Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full p-2.5 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            className="w-full p-2.5 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-sm font-medium mb-1">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className="w-full p-2.5 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Category */}
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium mb-1">
                            Category
                        </label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            className="w-full p-2.5 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.category}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Ingredients */}
                    <div className="mb-4">
                        <label htmlFor="ingredients" className="block text-sm font-medium mb-1">
                            Ingredients
                        </label>
                        <input
                            type="text"
                            id="ingredients"
                            name="ingredients"
                            className="w-full p-2.5 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter ingredients separated by commas"
                            value={formData.ingredients.join(', ')}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    ingredients: e.target.value.split(',').map((ingredient) => ingredient.trim()),
                                })
                            }
                        />
                    </div>

                    {/* Vegetarian */}
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            id="vegetarian"
                            name="vegetarian"
                            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                            checked={formData.vegetarian}
                            onChange={handleChange}
                        />
                        <label htmlFor="vegetarian" className="ml-2 text-sm font-medium">
                            Vegetarian
                        </label>
                    </div>

                    {/* Spicy */}
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            id="spicy"
                            name="spicy"
                            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                            checked={formData.spicy}
                            onChange={handleChange}
                        />
                        <label htmlFor="spicy" className="ml-2 text-sm font-medium">
                            Spicy
                        </label>
                    </div>

                    {/* Image URL */}
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium mb-1">
                            Image URL
                        </label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            className="w-full p-2.5 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.image}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Available */}
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            id="available"
                            name="available"
                            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                            checked={formData.available}
                            onChange={handleChange}
                        />
                        <label htmlFor="available" className="ml-2 text-sm font-medium">
                            Available
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full p-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Update
                    </button>
                </form>
            </div>
        </>
    );
};
