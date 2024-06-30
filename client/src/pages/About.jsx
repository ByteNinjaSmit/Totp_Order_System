import React from "react";
import { useAuth } from "../store/auth";

const About = () => {
  const { user } = useAuth();

  return (
    <>
      <section className="bg-red-100 py-20">
        <div className="container mx-auto">
          <div className="mb-10 text-center">
            <h3 className="text-4xl font-bold mb-2">
              Welcome, {user ? `${user.username} to Our Digital Restaurant` : 'to Our Digital Restaurant'}
            </h3>
            <h3 className="text-4xl font-bold mb-2">Discover the Future of Dining</h3>
            <p className="text-lg">
              Experience the latest in digital dining technology for 2024.
            </p>
          </div>

          <div className="flex flex-wrap justify-center">
            {/* Feature Cards */}
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="bg-white rounded-lg p-6">
                <h5 className="text-xl font-bold mb-2">Quality Ingredients</h5>
                <p className="text-lg">
                  Enjoy meals made with the freshest and finest ingredients.
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="bg-white rounded-lg p-6">
                <h5 className="text-xl font-bold mb-2">24/7 Customer Support</h5>
                <p className="text-lg">
                  Our team is always available to assist you, anytime.
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="bg-white rounded-lg p-6">
                <h5 className="text-xl font-bold mb-2">Fast Delivery</h5>
                <p className="text-lg">
                  Get your food delivered quickly to your doorstep.
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="bg-white rounded-lg p-6">
                <h5 className="text-xl font-bold mb-2">Digital Experience</h5>
                <p className="text-lg">
                  Enjoy a seamless digital dining experience from ordering to payment.
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="bg-white rounded-lg p-6">
                <h5 className="text-xl font-bold mb-2">Secure Transactions</h5>
                <p className="text-lg">
                  Ensure every transaction is safe and secure for all parties involved.
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="bg-white rounded-lg p-6">
                <h5 className="text-xl font-bold mb-2">Customizable Orders</h5>
                <p className="text-lg">
                  Personalize your meals with our customizable order options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 text-center">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center mb-10">
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="bg-white rounded-lg p-6">
                <h5 className="text-6xl font-bold text-red-500 mb-2">99%</h5>
                <p className="text-lg">Quality Assurance</p>
              </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="bg-white rounded-lg p-6">
                <h5 className="text-6xl font-bold text-red-500 mb-2">24/7</h5>
                <p className="text-lg">Support Availability</p>
              </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="bg-white rounded-lg p-6">
                <h5 className="text-6xl font-bold text-red-500 mb-2">Fast</h5>
                <p className="text-lg">Delivery Time</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
