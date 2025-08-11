
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50 whitespace-nowrap cursor-pointer"
              >
                <i className={`${item.icon} text-lg`}></i>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 cursor-pointer">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <i className="ri-user-line text-blue-600"></i>
                  </div>
                  <span>Profile</span>
                </Link>
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="text-gray-700 hover:text-red-600 cursor-pointer"
                >
                  <i className="ri-logout-circle-line text-lg"></i>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer">
                  Login
                </Link>
                <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer whitespace-nowrap">
                  Register
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden w-10 h-10 flex items-center justify-center cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl`}></i>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 py-2 cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className={`${item.icon} text-lg`}></i>
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-3 mt-3">
                {isLoggedIn ? (
                  <div className="space-y-3">
                    <Link href="/profile" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 py-2 cursor-pointer">
                      <i className="ri-user-line text-lg"></i>
                      <span>Profile</span>
                    </Link>
                    <button 
                      onClick={() => {
                        setIsLoggedIn(false);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 text-gray-700 hover:text-red-600 py-2 cursor-pointer"
                    >
                      <i className="ri-logout-circle-line text-lg"></i>
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link href="/login" className="block text-gray-700 hover:text-blue-600 py-2 cursor-pointer">
                      Login
                    </Link>
                    <Link href="/register" className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center cursor-pointer">
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
