import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Eye, Calendar, Filter, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentsHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleView = (payment) => {
    navigate(`/dashboard/payment-details/${payment._id}`);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm m-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-[#03373d]">Payment History</h3>
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

      {isLoading ? (
        <div className="text-center py-8 text-gray-500">
          Loading payment history...
        </div>
      ) : payments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No payment history found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-sm text-gray-500 bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 font-medium">Parcel Info</th>
                <th className="py-3 px-4 font-medium">Tracking Number</th>
                <th className="py-3 px-4 font-medium">Transaction ID</th>
                <th className="py-3 px-4 font-medium">Payment Info</th>
                <th className="py-3 px-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={payment._id || index}
                  className="text-sm text-gray-700 border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="font-medium text-gray-800">
                        {payment.parcelName || "N/A"}
                      </div>
                      <div className="text-xs text-gray-500">
                        Parcel ID: {payment.parcelId || "N/A"}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-700">
                      {payment.trackingId || "N/A"}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-mono text-xs text-gray-600">
                      {payment.transactionId || "N/A"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="font-semibold text-gray-800">
                        ৳ {payment.amount || "0"}
                        <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          {payment.paymentStatus || "Paid"}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(payment.paidAt?.$date || payment.paidAt)}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleView(payment)}
                      className="bg-[#d1e7dd] hover:bg-[#c1d7cd] text-[#03373d] font-medium px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentsHistory;
