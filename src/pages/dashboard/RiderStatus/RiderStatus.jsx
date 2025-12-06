import { useQuery } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  Search,
  Filter,
  MoreVertical,
  Eye,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  FileText,
  Warehouse,
  ChevronDown,
  X,
  AlertCircle,
} from "lucide-react";
import Swal from "sweetalert2";

const RiderStatus = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [selectedRider, setSelectedRider] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState(null); // 'approve' or 'reject'

  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  // Calculate statistics
  const stats = useMemo(() => {
    const total = riders.length;
    const pending = riders.filter((r) => r.status === "pending").length;
    const approved = riders.filter((r) => r.status === "approved").length;
    const rejected = riders.filter((r) => r.status === "rejected").length;

    return [
      {
        title: "Total Riders",
        count: total,
        icon: Users,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
      },
      {
        title: "Pending Review",
        count: pending,
        icon: Clock,
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
      },
      {
        title: "Approved",
        count: approved,
        icon: UserCheck,
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
      },
      {
        title: "Rejected",
        count: rejected,
        icon: UserX,
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
      },
    ];
  }, [riders]);

  // Filter riders
  const filteredRiders = useMemo(() => {
    return riders.filter((rider) => {
      const matchesSearch =
        rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rider.contact.includes(searchTerm);

      const matchesStatus =
        statusFilter === "all" || rider.status === statusFilter;

      const matchesRegion =
        regionFilter === "all" || rider.region === regionFilter;

      return matchesSearch && matchesStatus && matchesRegion;
    });
  }, [riders, searchTerm, statusFilter, regionFilter]);

  // Get unique regions
  const regions = useMemo(() => {
    return [...new Set(riders.map((r) => r.region))];
  }, [riders]);

  const handleViewDetails = (rider) => {
    setSelectedRider(rider);
    setShowDetailsModal(true);
  };

  const handleAction = (rider, type) => {
    setSelectedRider(rider);
    setActionType(type);
    setShowActionModal(true);
  };

  const [actionLoading, setActionLoading] = useState(false);

  const confirmAction = async (rider) => {
    if (!rider) return;

    // Determine final status from actionType
    const finalStatus = actionType === "approve" ? "approved" : "rejected";
    const updateInfo = { status: finalStatus, email: rider.email };

    try {
      setActionLoading(true);
      const res = await axiosSecure.patch(`/riders/${rider._id}`, updateInfo);

      // depending on your server response shape:
      // result.modifiedCount (Mongo) or res.data.modifiedCount
      const modified = res?.data?.modifiedCount || res?.data?.modified || 0;

      if (modified) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title:
            actionType === "approve"
              ? "Rider has been approved"
              : "Rider has been rejected",
          showConfirmButton: false,
          timer: 2000,
        });

        // refresh data
        if (typeof refetch === "function") refetch();
      } else {
        // If server returns a message for already processed or not modified
        Swal.fire({
          position: "top-center",
          icon: "info",
          title: res?.data?.message || "No change made",
          showConfirmButton: false,
          timer: 2000,
        });

        if (typeof refetch === "function") refetch();
      }
    } catch (err) {
      console.error("confirmAction error:", err);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: err?.response?.data?.message || err.message,
      });
    } finally {
      setActionLoading(false);
      setShowActionModal(false);
      setSelectedRider(null);
      setActionType(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        label: "Pending",
        className: "bg-amber-100 text-amber-700 border-amber-200",
        icon: Clock,
      },
      approved: {
        label: "Approved",
        className: "bg-green-100 text-green-700 border-green-200",
        icon: CheckCircle,
      },
      rejected: {
        label: "Rejected",
        className: "bg-red-100 text-red-700 border-red-200",
        icon: XCircle,
      },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.className}`}
      >
        <Icon className="w-3.5 h-3.5" />
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Rider Management</h1>
        <p className="text-sm text-gray-500 mt-1">
          Review and manage rider applications and status
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-white p-5 rounded-xl shadow-sm border ${stat.borderColor} hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2.5 ${stat.bgColor} rounded-lg`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    {stat.title}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800">
                  {stat.count}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none bg-white cursor-pointer min-w-[160px]"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>

          {/* Region Filter */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none bg-white cursor-pointer min-w-[160px]"
            >
              <option value="all">All Regions</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || statusFilter !== "all" || regionFilter !== "all") && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-500">Active filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                Search: {searchTerm}
                <button
                  onClick={() => setSearchTerm("")}
                  className="hover:bg-gray-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {statusFilter !== "all" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                Status: {statusFilter}
                <button
                  onClick={() => setStatusFilter("all")}
                  className="hover:bg-gray-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {regionFilter !== "all" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                Region: {regionFilter}
                <button
                  onClick={() => setRegionFilter("all")}
                  className="hover:bg-gray-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredRiders.length}</span>{" "}
          of <span className="font-semibold">{riders.length}</span> riders
        </p>
      </div>

      {/* Riders Table/Cards */}
      {filteredRiders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No riders found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Rider Info
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Documents
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRiders.map((rider) => (
                  <tr
                    key={rider._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-lime-400 flex items-center justify-center text-gray-900 font-bold text-sm">
                          {rider.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {rider.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Age: {rider.age}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="truncate max-w-[200px]">
                            {rider.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{rider.contact}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-800">
                          {rider.region}
                        </p>
                        <p className="text-xs text-gray-500">
                          {rider.district}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Warehouse className="w-3.5 h-3.5" />
                          {rider.warehouse}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CreditCard className="w-4 h-4 text-gray-400" />
                          <span className="text-xs">
                            DL: {rider.drivingLicense}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-xs">NID: {rider.nid}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(rider.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{formatDate(rider.createdAt.$date)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewDetails(rider)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {rider.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleAction(rider, "approve")}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleAction(rider, "reject")}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Reject"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden divide-y divide-gray-100">
            {filteredRiders.map((rider) => (
              <div key={rider._id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-lime-400 flex items-center justify-center text-gray-900 font-bold">
                      {rider.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {rider.name}
                      </p>
                      <p className="text-xs text-gray-500">Age: {rider.age}</p>
                    </div>
                  </div>
                  {getStatusBadge(rider.status)}
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{rider.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{rider.contact}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>
                      {rider.district}, {rider.region}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{formatDate(rider.createdAt.$date)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleViewDetails(rider)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  {rider.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleAction(rider, "approve")}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors text-sm font-medium"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(rider, "reject")}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors text-sm font-medium"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedRider && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Rider Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              {/* Rider Header */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-lime-400 flex items-center justify-center text-gray-900 font-bold text-2xl">
                  {selectedRider.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">
                    {selectedRider.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Applied on {formatDate(selectedRider.createdAt.$date)}
                  </p>
                </div>
                {getStatusBadge(selectedRider.status)}
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                    Personal Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500 font-medium">
                        Age
                      </label>
                      <p className="text-sm text-gray-800 font-medium">
                        {selectedRider.age} years
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium">
                        Email
                      </label>
                      <p className="text-sm text-gray-800 font-medium flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {selectedRider.email}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium">
                        Contact Number
                      </label>
                      <p className="text-sm text-gray-800 font-medium flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {selectedRider.contact}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                    Location Details
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500 font-medium">
                        Region
                      </label>
                      <p className="text-sm text-gray-800 font-medium">
                        {selectedRider.region}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium">
                        District
                      </label>
                      <p className="text-sm text-gray-800 font-medium">
                        {selectedRider.district}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium">
                        Assigned Warehouse
                      </label>
                      <p className="text-sm text-gray-800 font-medium flex items-center gap-2">
                        <Warehouse className="w-4 h-4 text-gray-400" />
                        {selectedRider.warehouse}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 md:col-span-2">
                  <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                    Documents
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <label className="text-xs text-gray-500 font-medium flex items-center gap-2 mb-2">
                        <CreditCard className="w-4 h-4" />
                        Driving License
                      </label>
                      <p className="text-sm text-gray-800 font-semibold">
                        {selectedRider.drivingLicense}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <label className="text-xs text-gray-500 font-medium flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4" />
                        National ID (NID)
                      </label>
                      <p className="text-sm text-gray-800 font-semibold">
                        {selectedRider.nid}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {selectedRider.status === "pending" && (
                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleAction(selectedRider, "approve");
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-semibold"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Approve Rider
                  </button>
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleAction(selectedRider, "reject");
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-semibold"
                  >
                    <XCircle className="w-5 h-5" />
                    Reject Rider
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Action Confirmation Modal */}
      {showActionModal && selectedRider && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                actionType === "approve" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {actionType === "approve" ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600" />
              )}
            </div>

            <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
              {actionType === "approve" ? "Approve Rider?" : "Reject Rider?"}
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to {actionType}{" "}
              <span className="font-semibold">{selectedRider.name}</span>?
              {actionType === "approve"
                ? " They will be notified and can start accepting deliveries."
                : " They will be notified about the rejection."}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => confirmAction(selectedRider)}
                disabled={actionLoading}
                className={`flex-1 px-6 py-3 text-white rounded-lg transition-colors font-semibold ${
                  actionType === "approve"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                } ${actionLoading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {actionLoading
                  ? actionType === "approve"
                    ? "Approving..."
                    : "Rejecting..."
                  : actionType === "approve"
                  ? "Approve"
                  : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiderStatus;
