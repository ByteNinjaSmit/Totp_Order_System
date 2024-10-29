'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, ChevronUp, Minus, Plus, ShoppingCart, Menu, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCart } from "../store/cart";
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from "../store/auth";

interface Service {
    _id: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
    category: string;
    ingredients: string[];
    vegetarian: boolean;
    spicy: boolean;
    image: string;
    available: boolean;
}

export default function PublicOrderMenu() {
    // const [cart, setCart] = useState<{ [key: number]: number }>({})
    const [activeCategory, setActiveCategory] = useState<string | null>(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
    const scrollContainerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
    const [quantities, setQuantities] = useState({});
    const { cart,tableNo } = useCart();
    // Dyancamic 
    const params = useParams();
    const { services } = useAuth() as { services: Service[] | undefined };
    const navigate = useNavigate(); // Get navigate function
    // If Paranms Greater than 20 table no then navigate


    // Defining Categories
    const categories = services
        ? [...new Set(services.map((service) => service.category))]
        : [];

    useEffect(() => {
        const initialQuantities = {};
        cart.forEach((item) => {
            initialQuantities[item._id] = item.quantity || 1; // Default to 1 if quantity is not defined
        });
        setQuantities(initialQuantities);
    }, [cart]);

    const scrollToCategory = (category: string) => {
        categoryRefs.current[category]?.scrollIntoView({ behavior: 'smooth' })
        setMobileMenuOpen(false)
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveCategory(entry.target.id)
                    }
                })
            },
            { threshold: 0.5 }
        )

        Object.values(categoryRefs.current).forEach((ref) => {
            if (ref) observer.observe(ref)
        })

        return () => observer.disconnect()
    }, [])

    const scrollCategory = (category: string, direction: 'left' | 'right') => {
        const container = scrollContainerRefs.current[category]
        if (container) {
            const scrollAmount = container.clientWidth * 0.8
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    if (!Array.isArray(services)) {
        return <div>Loading services...</div>;
    }
    if (tableNo) {
        return <Navigate to={`/service/${tableNo}`} />;
    }


    return (
        <div className="min-h-screen bg-amber-50">
            <nav className="sticky top-0 bg-white shadow-md z-10">
                <div className="container mx-auto px-4 py-2 md:py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl md:text-3xl font-bold text-amber-800">Our Menu</h1>
                        <div className="md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 text-amber-800 hover:bg-amber-100 rounded-md"
                                aria-label="Toggle menu"
                            >
                                <Menu size={24} />
                            </button>
                        </div>
                        <ul className="hidden md:flex space-x-4">
                            {categories.map((category) => (
                                <li key={category}>
                                    <button
                                        onClick={() => scrollToCategory(category)}
                                        className={`px-3 py-2 rounded-full text-sm transition-colors ${activeCategory === category
                                            ? 'bg-amber-500 text-white'
                                            : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {mobileMenuOpen && (
                    <ul className="md:hidden bg-white border-t border-amber-200 py-2">
                        {categories.map((category) => (
                            <li key={category}>
                                <button
                                    onClick={() => scrollToCategory(category)}
                                    className={`block w-full text-left px-4 py-2 ${activeCategory === category
                                        ? 'bg-amber-500 text-white'
                                        : 'text-amber-800 hover:bg-amber-100'
                                        }`}
                                >
                                    {category}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </nav>

            <div className="container mx-auto px-4 py-8">
                {categories.map((category) => (
                    <section
                        key={category}
                        id={category}
                        ref={(el) => (categoryRefs.current[category] = el)}
                        className="mb-12"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-amber-700 mb-6 pb-2 border-b-2 border-amber-300">
                            {category}
                        </h2>
                        <div className='relative'>
                            <button
                                onClick={() => scrollCategory(category, 'left')}
                                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow-md z-10"
                                aria-label={`Scroll ${category} left`}
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={() => scrollCategory(category, 'right')}
                                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow-md z-10"
                                aria-label={`Scroll ${category} right`}
                            >
                                <ChevronRight size={24} />
                            </button>
                            {/* flex overflow-x-auto space-x-4 pb-4 scrollbar-hide */}
                            <div
                                ref={(el) => (scrollContainerRefs.current[category] = el)}
                                className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >                {services
                                .filter((dish) => dish.category === category)
                                .map((dish) => (
                                    <div
                                        key={dish._id}
                                        className="flex-none w-80 sm:w-80 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                                    >
                                        <div className="relative">
                                            <img src={dish.image} alt={dish.name} className="w-full h-40 sm:h-48 object-cover" />
                                            {!dish.available && (
                                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                                    <span className="text-white font-bold text-lg">Sold Out</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-lg font-bold text-gray-800">{dish.name}</h3>
                                                <div className="flex items-center space-x-2">
                                                    {dish.vegetarian && (
                                                        <span
                                                            className="text-green-600 font-bold text-sm"
                                                            title="Vegetarian"
                                                            aria-label="Vegetarian"
                                                        >
                                                            V
                                                        </span>
                                                    )}
                                                    {dish.spicy && (
                                                        <span
                                                            className="text-red-600"
                                                            title="Spicy"
                                                            aria-label="Spicy"
                                                        >
                                                            🌶️
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-gray-600 text-sm mb-4">{dish.description}</p>
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="text-lg font-bold text-amber-600">
                                                    ₹{dish.price.toFixed(2)}
                                                </span>
                                            </div>
                                            {dish.available && (
                                                <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
                                                    <div className="flex items-center border rounded-md">
                                                        <Link to="/service/QR" >
                                                            <button

                                                                className="px-2 py-1 text-amber-600 hover:bg-amber-100 transition-colors"
                                                                aria-label={`Decrease quantity for ${dish.name}`}
                                                            >
                                                                <Minus size={16} />
                                                            </button>
                                                        </Link>
                                                        <Link to="/service/QR" >
                                                            <span className="px-2 py-1 text-gray-800">{quantities[dish._id] || 0}</span>

                                                        </Link>
                                                        <Link to="/service/QR" >
                                                            <button

                                                                className="px-2 py-1 text-amber-600 hover:bg-amber-100 transition-colors"
                                                                aria-label={`Increase quantity for ${dish.name}`}
                                                            >
                                                                <Plus size={16} />
                                                            </button>
                                                        </Link>
                                                    </div>
                                                    <Link to="/service/QR" >
                                                        <button
                                                            className={`w-full sm:w-auto px-4 py-2 rounded-md text-white font-semibold transition-colors ${cart[dish.id]
                                                                ? 'bg-green-500 hover:bg-green-600'
                                                                : 'bg-amber-500 hover:bg-amber-600'
                                                                }`}
                                                            aria-label={cart[dish._id] ? `${dish.name} in cart` : `Add ${dish.name} to cart`}
                                                        >
                                                            {cart[dish._id] ? (
                                                                <>
                                                                    <ShoppingCart size={16} className="inline mr-2" />
                                                                    In Cart
                                                                </>
                                                            ) : (
                                                                'Add to Cart'
                                                            )}
                                                        </button>
                                                    </Link>

                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    )
}