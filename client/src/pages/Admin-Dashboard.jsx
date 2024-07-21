import React from 'react';

export const AdminDashboard = () => {
    return (
        <>
        <div className="flex flex-wrap justify-center sm:justify-between w-4/5 mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-4 m-2 w-48 text-center">
                <div className="text-sm font-bold mb-2">Pending Orders</div>
                <div className="text-xl font-bold">237</div>
                <div className="h-1 bg-blue-500 mt-2 w-full"></div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4 m-2 w-48 text-center">
                <div className="text-sm font-bold mb-2">Active Orders</div>
                <div className="text-xl font-bold">164</div>
                <div className="h-1 bg-green-500 mt-2 w-full"></div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4 m-2 w-48 text-center">
                <div className="text-sm font-bold mb-2">Delivered Orders</div>
                <div className="text-xl font-bold">197</div>
                <div className="h-1 bg-green-800 mt-2 w-full"></div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4 m-2 w-48 text-center">
                <div className="text-sm font-bold mb-2">Cancelled Orders</div>
                <div className="text-xl font-bold">77</div>
                <div className="h-1 bg-red-500 mt-2 w-full"></div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4 m-2 w-48 text-center">
                <div className="text-sm font-bold mb-2">Food Items</div>
                <div className="text-xl font-bold">77</div>
                <div className="h-1 bg-orange-500 mt-2 w-full"></div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4 m-2 w-48 text-center">
                <div className="text-sm font-bold mb-2">Food Categories</div>
                <div className="text-xl font-bold">77</div>
                <div className="h-1 bg-purple-500 mt-2 w-full"></div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 m-2 w-48 text-center">
                <div className="text-sm font-bold mb-2">Total Tables</div>
                <div className="text-xl font-bold">12</div>
                <div className="h-1 bg-blue-700 mt-2 w-full"></div>
            </div>
        </div>
        <hr className='mt-4 w-4/5 justify-center mx-auto border-3' />
        </>
    );
}
