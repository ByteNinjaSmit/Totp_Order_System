import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../store/auth';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "../store/cart"
import { Badge } from 'antd';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar1 = () => {
  const location = useLocation();
  const { cart, setCart } = useCart(); 
  const { isLoggedIn, isAdmin } = useAuth();
  const [isAdminState, setIsAdminState] = useState(isAdmin);

  useEffect(() => {
    setIsAdminState(isAdmin);
  }, [isAdmin]);

  const navigation = [
    { name: 'Home', to: '/', current: location.pathname === '/' },
    { name: 'About', to: '/about', current: location.pathname === '/about' },
    { name: 'Service', to: '/service', current: location.pathname === '/service' },
    { name: 'Contact', to: '/contact', current: location.pathname === '/contact' },
  ];

  if (isAdmin && isAdminState) {
    navigation.push({ name: 'Admin Panel', to: '/admin', current: location.pathname === '/admin' });
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 w-[92%]">
            <div className="relative flex h-16 items-center justify-center">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex-shrink-0">
                  <h1 className="text-xl font-bold text-red-500">RestPos</h1>
                </div>
              </div>
              <div className="hidden sm:flex flex-1 items-center justify-center">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-1 sm:pr-0 space-x-4">
                {!open && (
                  <Badge count={cart?.length} className='max-sm:hidden'>
                  <Link to="/cart" className='max-sm:hidden'>
                    <button className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md">
                      <AiOutlineShoppingCart className="h-6 w-6" />
                    </button>
                  </Link>
                  </Badge>
                )}
                {isLoggedIn ? (
                  <Link to="/logout">
                    <button className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-700">
                      Logout
                    </button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <button className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-700">
                      Login
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.to}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <Badge count={cart?.length}>
              <Link to="/cart">
                <button className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md">
                  <AiOutlineShoppingCart className="h-6 w-6" />
                </button>
              </Link>
              </Badge>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar1;
