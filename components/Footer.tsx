
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <i className="ri-hammer-line text-white text-2xl"></i>
              </div>
              <span className="text-3xl font-bold" style={{ fontFamily: 'Pacifico' }}>
                WorkSuperFast
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Connect with skilled contractors and find work opportunities across India. Fast, secure, and reliable work platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <i className="ri-twitter-fill text-xl"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <i className="ri-instagram-fill text-xl"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <i className="ri-linkedin-fill text-xl"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/search-work" className="hover:text-white transition-colors cursor-pointer">Search Work</Link></li>
              <li><Link href="/post-work" className="hover:text-white transition-colors cursor-pointer">Post Work</Link></li>
              <li><Link href="/add-contractor" className="hover:text-white transition-colors cursor-pointer">Add Contractor</Link></li>
              <li><Link href="/refer-earn" className="hover:text-white transition-colors cursor-pointer">Refer & Earn</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors cursor-pointer">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors cursor-pointer">Contact</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors cursor-pointer">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors cursor-pointer">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 WorkSuperFast. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
