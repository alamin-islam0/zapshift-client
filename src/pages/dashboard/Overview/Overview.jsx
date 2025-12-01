import React from "react";
import Stats from "./components/Stats/Stats";
import RevenueChart from "./components/Charts/RevenueChart";
import ShippingReports from "./components/Reports/ShippingReports";
import LateInvoices from "./components/Invoices/LateInvoices";
import ShipmentAlerts from "./components/Alerts/ShipmentAlerts";
import { Plus } from "lucide-react";
import { Link } from "react-router";

const Overview = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            You can access all your data and information from anywhere.
          </p>
        </div>
        <Link to={'/dashboard/add-parcel'} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-lime-500 text-gray-900 font-semibold rounded-lg transition-colors shadow-sm">
          <Plus className="w-5 h-5" />
          Add Parcel
        </Link>
      </div>

      <Stats />
      <RevenueChart />
      <ShippingReports />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LateInvoices />
        <ShipmentAlerts />
      </div>
    </div>
  );
};

export default Overview;
