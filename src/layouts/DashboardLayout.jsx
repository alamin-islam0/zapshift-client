import React, { useState } from "react";
import { Outlet, NavLink } from "react-router";
import { MdOutlineDeliveryDining } from "react-icons/md";
import {
  LayoutDashboard,
  Truck,
  FileText,
  Store,
  CreditCard,
  Map,
  Settings,
  Lock,
  HelpCircle,
  LogOut,
  Menu,
  Bell,
  PackageCheck,
  CreditCardIcon,
  User2,
} from "lucide-react";
import Logo from "../components/logo/Logo";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    {
      label: "MENU",
      items: [
        { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        {
          name: "My Parcels",
          icon: PackageCheck,
          path: "/dashboard/my-parcels",
        },
        { name: "Payment History", icon: CreditCardIcon, path: "/dashboard/payments-history" },
        { name: "Rider Status", icon: MdOutlineDeliveryDining, path: "/dashboard/rider-status" },
        { name: "Deliveries", icon: Truck, path: "/dashboard/deliveries" },
        { name: "Invoices", icon: FileText, path: "/dashboard/invoices" },
        { name: "Stores", icon: Store, path: "/dashboard/stores" },
        { name: "Pricing Plan", icon: CreditCard, path: "/dashboard/pricing" },
        { name: "Coverage Area", icon: Map, path: "/dashboard/coverage" },
      ],
    },
    {
      label: "GENERAL",
      items: [
        {name: "User Management", icon: User2, path: "/dashboard/user-management"},
        { name: "Settings", icon: Settings, path: "/dashboard/settings" },
        {
          name: "Change Password",
          icon: Lock,
          path: "/dashboard/change-password",
        },
        { name: "Help", icon: HelpCircle, path: "/dashboard/help" },
        {
          name: "Logout",
          icon: LogOut,
          path: "/logout",
          className: "text-red-500 hover:bg-red-50",
        },
      ],
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-100 transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 flex items-center gap-2">
            <Logo />
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 overflow-y-auto custom-scrollbar">
            {menuItems.map((section, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-4">
                  {section.label}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <NavLink
                        to={item.path}
                        end={item.path === "/dashboard"}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-primary text-gray-900 shadow-sm"
                              : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                          } ${item.className || ""}`
                        }
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="p-2 -ml-2 rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-800">
                  {user.displayName}
                </p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src={user?.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
