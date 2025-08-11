
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminJobs from '@/components/admin/AdminJobs';
import AdminContractors from '@/components/admin/AdminContractors';
import AdminComplaints from '@/components/admin/AdminComplaints';
import AdminPayments from '@/components/admin/AdminPayments';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsAuthenticated(true);
      setAdminData({
        name: 'Admin User',
        email: 'admin@worksuperfast.com',
        role: 'Super Admin'
      });
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (loginForm.email === 'admin@worksuperfast.com' && loginForm.password === 'admin123') {
        localStorage.setItem('adminToken', 'admin-token-' + Date.now());
        setIsAuthenticated(true);
        setAdminData({
          name: 'Admin User',
          email: 'admin@worksuperfast.com',
          role: 'Super Admin'
        });
      } else {
        setLoginError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setAdminData(null);
    router.push('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard onTabChange={setActiveTab} />;
      case 'jobs':
        return <AdminJobs />;
      case 'contractors':
        return <AdminContractors />;
      case 'complaints':
        return <AdminComplaints />;
      case 'payments':
        return <AdminPayments />;
      default:
        return <AdminDashboard onTabChange={setActiveTab} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-shield-user-line text-3xl text-blue-600"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
            <p className="text-gray-600">Access the WorkSuperFast admin panel</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={loginForm.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Enter admin email"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Enter admin password"
                required
              />
            </div>
            
            {loginError && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
                {loginError}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <i className="ri-loader-line animate-spin mr-2"></i>
                  Signing In...
                </>
              ) : (
                <>
                  <i className="ri-login-circle-line mr-2"></i>
                  Sign In
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Demo credentials: admin@worksuperfast.com / admin123
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader adminData={adminData} onLogout={handleLogout} />
      
      <div className="flex">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
