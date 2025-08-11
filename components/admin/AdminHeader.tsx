'use client';

import { useState } from 'react';

interface AdminHeaderProps {
  adminData: {
    name: string;
    email: string;
    role: string;
  };
  onLogout: () => void;
}

export default function AdminHeader({ adminData, onLogout }: AdminHeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <i className="ri-hammer-line text-2xl text-blue-600"></i>
              <span className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Pacifico, serif' }}>
                WorkSuperFast
              </span>
            </div>
            <span className="text-sm text-gray-500">Admin Panel</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <i className="ri-notification-line text-xl text-gray-600"></i>
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="ri-user-line text-blue-600"></i>
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900">{adminData.name}</div>
                  <div className="text-xs text-gray-500">{adminData.role}</div>
                </div>
                <i className={`ri-arrow-down-s-line transition-transform ${showDropdown ? 'rotate-180' : ''}`}></i>
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <div className="text-sm font-medium text-gray-900">{adminData.name}</div>
                    <div className="text-xs text-gray-500">{adminData.email}</div>
                  </div>
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <i className="ri-logout-circle-line mr-2"></i>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}