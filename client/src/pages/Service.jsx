import React from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

const Service = () => {
  const { services } = useAuth();

  // If services is undefined or not an array, provide a fallback
  if (!Array.isArray(services)) {
    return <div>Loading services...</div>;
  }

  return (
    <section className="py-24 bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-manrope font-bold text-5xl text-black mb-10 max-xl:text-center text-center">Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {services.map((curElem, index) => {
            const { Price, Description, Provider, Service, _id } = curElem;
            return (
              <div className="relative bg-white rounded-3xl shadow-md overflow-hidden" key={index}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV3V_QmFRmB8xPPSOmShms0tMMMAH1G9i7pg&s"
                  alt="Service Image"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{Service}</h2>
                  <p className="text-gray-600 mb-4">{Description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-700">{Provider}</p>
                    <p className="text-indigo-600 font-semibold">${Price}</p>
                  </div>
                  <hr className="border-gray-300 my-4" />
                  <Link
                    to={`/service/${_id}/totp`}
                    className="block w-full bg-indigo-600 text-white text-center py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  >
                    Order Now
                  </Link>
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
