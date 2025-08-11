'use client';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'ri-dashboard-line' },
    { id: 'jobs', label: 'Jobs Management', icon: 'ri-briefcase-line' },
    { id: 'contractors', label: 'Contractors', icon: 'ri-group-line' },
    { id: 'complaints', label: 'Complaints', icon: 'ri-feedback-line' },
    { id: 'payments', label: 'Payments', icon: 'ri-money-dollar-circle-line' }
  ];

  return (
    <div className="fixed left-0 top-16 h-full w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Admin Panel</h2>
        
        <nav className="space-y-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-500'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className={`${item.icon} text-xl`}></i>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}