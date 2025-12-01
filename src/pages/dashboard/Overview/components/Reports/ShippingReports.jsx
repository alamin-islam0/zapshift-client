import React from "react";
import { Calendar, Filter, MoreVertical, Edit2 } from "lucide-react";

const ShippingReports = () => {
  const reports = [
    {
      id: "#RQ21534",
      client: "Rasel Ahmed",
      date: "Jan 6, 2025",
      weight: "10 kg",
      shipper: "DHL",
      price: "4500.00",
      status: "Delivered",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      id: "#RQ21534",
      client: "Rakib Hossain",
      date: "Jan 8, 2025",
      weight: "15 kg",
      shipper: "Inpost",
      price: "9800.00",
      status: "Delivered",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      id: "#RQ21534",
      client: "Rakib",
      date: "12 Feb, 2025",
      weight: "5 kg",
      shipper: "Pathao",
      price: "2000.00",
      status: "Transit",
      statusColor: "bg-blue-100 text-blue-700",
    },
    {
      id: "#RQ21534",
      client: "Abu Sufian",
      date: "06 Jan, 2025",
      weight: "7 kg",
      shipper: "Steadfast",
      price: "2700.00",
      status: "Waiting",
      statusColor: "bg-red-100 text-red-700",
    },
    {
      id: "#RQ21534",
      client: "Rasel Ahmed",
      date: "Jan 5, 2025",
      weight: "15 kg",
      shipper: "UPS",
      price: "1500.00",
      status: "Transit",
      statusColor: "bg-blue-100 text-blue-700",
    },
    {
      id: "#RQ21534",
      client: "Jhankar Mahbub",
      date: "22 Dec, 2024",
      weight: "10 kg",
      shipper: "DHL",
      price: "8500.00",
      status: "Pending",
      statusColor: "bg-orange-100 text-orange-700",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-800">Shipping Reports</h3>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            <Calendar className="w-4 h-4" />
            This Week
          </button>
          <button className="p-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs text-gray-500 border-b border-gray-100">
              <th className="py-3 font-medium">ID</th>
              <th className="py-3 font-medium">Client</th>
              <th className="py-3 font-medium">Date</th>
              <th className="py-3 font-medium">Weight</th>
              <th className="py-3 font-medium">Shipper</th>
              <th className="py-3 font-medium">Price</th>
              <th className="py-3 font-medium">Status</th>
              <th className="py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr
                key={index}
                className="text-sm text-gray-700 border-b border-gray-50 hover:bg-gray-50"
              >
                <td className="py-3 text-gray-500">{report.id}</td>
                <td className="py-3 font-medium">{report.client}</td>
                <td className="py-3 text-gray-500">{report.date}</td>
                <td className="py-3 text-gray-500">{report.weight}</td>
                <td className="py-3 text-gray-500">{report.shipper}</td>
                <td className="py-3 text-gray-500">{report.price}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${report.statusColor}`}
                  >
                    {report.status}
                  </span>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                      <Edit2 className="w-3 h-3" />
                      <span className="text-xs">Edit</span>
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-3 h-3" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50">
          ← Previous
        </button>
        <div className="flex gap-1">
          <button className="w-6 h-6 rounded-full bg-lime-400 text-white text-xs flex items-center justify-center">
            1
          </button>
          <button className="w-6 h-6 rounded-full text-gray-500 hover:bg-gray-100 text-xs flex items-center justify-center">
            2
          </button>
          <button className="w-6 h-6 rounded-full text-gray-500 hover:bg-gray-100 text-xs flex items-center justify-center">
            3
          </button>
          <span className="text-xs text-gray-400 flex items-center">...</span>
          <button className="w-6 h-6 rounded-full text-gray-500 hover:bg-gray-100 text-xs flex items-center justify-center">
            10
          </button>
        </div>
        <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50">
          Next →
        </button>
      </div>
    </div>
  );
};

export default ShippingReports;
