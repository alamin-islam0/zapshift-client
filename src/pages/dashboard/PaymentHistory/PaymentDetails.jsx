import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
    ArrowLeft,
    Package,
    CreditCard,
    Mail,
    Calendar,
    CheckCircle,
    Hash,
    DollarSign,
    Truck,
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const PaymentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: payment, isLoading } = useQuery({
        queryKey: ["payment", id],
        queryFn: async () => {
            try {
                // Try to fetch single payment first
                const res = await axiosSecure.get(`/payments/${id}`);
                return res.data;
            } catch (error) {
                // Fallback: fetch all payments and filter
                const res = await axiosSecure.get(`/payments?email=${user.email}`);
                const payments = res.data;
                return payments.find(p => p._id === id);
            }
        },
    });

    // Helper function to format date
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (isLoading) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm m-6 mb-6">
                <div className="text-center py-8 text-gray-500">
                    Loading payment details...
                </div>
            </div>
        );
    }

    if (!payment) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm m-6 mb-6">
                <div className="text-center py-8 text-gray-500">
                    Payment not found
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 m-6 mb-6">
            {/* Header */}
            <div className="mb-6">
                <button
                    onClick={() => navigate("/dashboard/payments-history")}
                    className="flex items-center gap-2 text-gray-600 hover:text-[#03373d] transition-colors mb-4"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">Back to Payment History</span>
                </button>
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-[#03373d]">Payment Details</h1>
                    <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        {payment.paymentStatus || "Paid"}
                    </span>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Payment Information Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-[#d1e7dd] rounded-lg">
                            <CreditCard className="w-6 h-6 text-[#03373d]" />
                        </div>
                        <h2 className="text-xl font-bold text-[#03373d]">
                            Payment Information
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {/* Amount */}
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                            <DollarSign className="w-5 h-5 text-gray-600 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm text-gray-500 mb-1">Amount Paid</p>
                                <p className="text-2xl font-bold text-[#03373d]">
                                    ৳ {payment.amount || "0"}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Currency: {payment.currency?.toUpperCase() || "USD"}
                                </p>
                            </div>
                        </div>

                        {/* Transaction ID */}
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                            <Hash className="w-5 h-5 text-gray-600 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm text-gray-500 mb-1">Transaction ID</p>
                                <p className="text-sm font-mono text-gray-800 break-all">
                                    {payment.transactionId || "N/A"}
                                </p>
                            </div>
                        </div>

                        {/* Customer Email */}
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                            <Mail className="w-5 h-5 text-gray-600 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm text-gray-500 mb-1">Customer Email</p>
                                <p className="text-sm font-medium text-gray-800">
                                    {payment.customer_email || "N/A"}
                                </p>
                            </div>
                        </div>

                        {/* Payment Date */}
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                            <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm text-gray-500 mb-1">Payment Date</p>
                                <p className="text-sm font-medium text-gray-800">
                                    {formatDate(payment.paidAt?.$date || payment.paidAt)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Parcel Information Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-[#d1e7dd] rounded-lg">
                            <Package className="w-6 h-6 text-[#03373d]" />
                        </div>
                        <h2 className="text-xl font-bold text-[#03373d]">
                            Parcel Information
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {/* Parcel Name */}
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                            <Package className="w-5 h-5 text-gray-600 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm text-gray-500 mb-1">Parcel Name</p>
                                <p className="text-lg font-semibold text-gray-800">
                                    {payment.parcelName || "N/A"}
                                </p>
                            </div>
                        </div>

                        {/* Parcel ID */}
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                            <Hash className="w-5 h-5 text-gray-600 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm text-gray-500 mb-1">Parcel ID</p>
                                <p className="text-sm font-mono text-gray-800">
                                    {payment.parcelId || "N/A"}
                                </p>
                            </div>
                        </div>

                        {/* Tracking ID */}
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                            <Truck className="w-5 h-5 text-gray-600 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm text-gray-500 mb-1">Tracking Number</p>
                                <p className="text-lg font-semibold text-[#03373d]">
                                    {payment.trackingId || "N/A"}
                                </p>
                            </div>
                        </div>

                        {/* Payment ID */}
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                            <Hash className="w-5 h-5 text-gray-600 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm text-gray-500 mb-1">Payment ID</p>
                                <p className="text-sm font-mono text-gray-800">
                                    {payment._id || "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary Card */}
            <div className="mt-6 bg-gradient-to-r from-[#03373d] to-[#055160] p-6 rounded-xl shadow-lg text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm opacity-90 mb-1">Transaction Summary</p>
                        <p className="text-3xl font-bold">৳ {payment.amount || "0"}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm opacity-90 mb-1">Status</p>
                        <div className="flex items-center gap-2 justify-end">
                            <CheckCircle className="w-5 h-5" />
                            <p className="text-lg font-semibold">
                                {payment.paymentStatus?.toUpperCase() || "PAID"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="opacity-75">Parcel</p>
                            <p className="font-medium">{payment.parcelName || "N/A"}</p>
                        </div>
                        <div className="text-right">
                            <p className="opacity-75">Tracking ID</p>
                            <p className="font-medium">{payment.trackingId || "N/A"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentDetails;
