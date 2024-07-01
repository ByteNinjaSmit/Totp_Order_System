import React from "react";
import { useAuth } from "../store/auth";
import { FaCartPlus } from "react-icons/fa";
import { useCart } from "../store/cart";
import { toast } from 'react-toastify';

const Service = () => {
  const { services } = useAuth();
  const { cart, addToCart } = useCart();

  // If services is undefined or not an array, provide a fallback
  if (!Array.isArray(services)) {
    return <div>Loading services...</div>;
  }

  return (
    <section className="py-4 bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-manrope font-bold text-5xl text-black mb-10 max-xl:text-center text-center">Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {services.map((curElem, index) => {
            const { price, vegetarian, ingredients, available, spicy, image, name } = curElem;
            return (
              <div className="relative bg-white rounded-3xl shadow-md overflow-hidden" key={index}>
                <img
                  src={image}
                  alt="Service Image"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{name}</h2>
                  <p className="text-gray-600 mb-4">{ingredients.join(', ')}</p>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-700">{available ? 'Available' : 'Not Available'}</p>
                    <p className="text-gray-700">{vegetarian ? 'Veg' : 'Non-Veg'}</p>
                    <p className="text-gray-700">{spicy ? 'Spicy' : 'Not Spicy'}</p>
                    <p className="text-indigo-600 font-semibold">${price}</p>
                  </div>
                  <hr className="border-gray-300 my-4" />
                  <button
                    onClick={() => {
                      addToCart(curElem);
                      toast.success("Item Added To Cart");
                    }}
                    className="flex items-center justify-center w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    aria-label={`Add ${name} to Cart`}
                  >
                    <FaCartPlus className="mr-2" /> Add To Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Service;
