'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) setIsLoggedIn(true);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  const navItems = [
    { name: 'Search Work', href: '/search-work', icon: 'ri-search-line' },
    { name: 'Post Work', href: '/post-work', icon: 'ri-add-circle-line' },
    { name: 'Add Contractor', href: '/add-contractor', icon: 'ri-user-add-line' },
    { name: 'About', href: '/about', icon: 'ri-information-line' },
    { name: 'Contact', href: '/contact', icon: 'ri-phone-line' },
    { name: 'Refer & Earn', href: '/refer-earn', icon: 'ri-gift-line' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
              <i className="ri-hammer-line text-white text-xl"></i>
            </div>
            <span className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Pacifico' }}>
              WorkSuperFast
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50 whitespace-nowrap"
              >
                <i className={`${item.icon} text-lg`}></i>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4 relative" ref={dropdownRef}>
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center hover:ring-2 hover:ring-blue-300"
                >
                  <i className="ri-user-line text-blue-600 text-lg"></i>
                </button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
                    >
                      <li className="hover:bg-gray-100">
                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:text-blue-600"
                          onClick={() => setShowDropdown(false)}
                        >
                          <i className="ri-user-line mr-2"></i> Profile
                        </Link>
                      </li>
                      <li className="hover:bg-red-50 border-t border-gray-100">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left flex items-center px-4 py-3 text-sm text-red-600 hover:text-red-700"
                        >
                          <i className="ri-logout-circle-line mr-2"></i> Logout
                        </button>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                  Login
                </Link>
                <Link
                 href="/login?tab=register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl`}></i>
          </button>
        </div>
      </div>
    </nav>
  );
}
