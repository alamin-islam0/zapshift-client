import { useQuery } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  Users,
  Shield,
  UserCheck,
  Search,
  Filter,
  Mail,
  Calendar,
  ChevronDown,
  X,
  AlertCircle,
  ShieldCheck,
  ShieldOff,
  Eye,
  Crown,
} from "lucide-react";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  // Calculate statistics
  const stats = useMemo(() => {
    const total = users.length;
    const admins = users.filter((u) => u.role === "admin").length;
    const regularUsers = users.filter((u) => u.role !== "admin").length;
    const recentUsers = users.filter((u) => {
      if (!u.createdAt) return false;
      const createdDate = new Date(u.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return createdDate >= weekAgo;
    }).length;

    return [
      {
        title: "Total Users",
        count: total,
        icon: Users,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
      },
      {
        title: "Administrators",
        count: admins,
        icon: Shield,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
      },
      {
        title: "Regular Users",
        count: regularUsers,
        icon: UserCheck,
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
      },
      {
        title: "New This Week",
        count: recentUsers,
        icon: Calendar,
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
      },
    ];
  }, [users]);

  // Filter users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const userName = user.displayName || user.name || "";
      const userEmail = user.email || "";

      const matchesSearch =
        userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        userEmail.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
        roleFilter === "all" ||
        (roleFilter === "admin" && user.role === "admin") ||
        (roleFilter === "user" && user.role !== "admin");

      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const handleAction = (user, type) => {
    setSelectedUser(user);
    setActionType(type);
    setShowActionModal(true);
  };

  const confirmAction = async (user) => {
    if (!user) return;

    const newRole = actionType === "makeAdmin" ? "admin" : "user";
    const updateInfo = { role: newRole };

    try {
      setActionLoading(true);
      const res = await axiosSecure.patch(`/users/${user._id}`, updateInfo);

      const modified = res?.data?.modifiedCount || res?.data?.modified || 0;

      if (modified || res?.data?.success) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title:
            actionType === "makeAdmin"
              ? "User promoted to Admin"
              : "Admin role removed",
          showConfirmButton: false,
          timer: 2000,
        });

        if (typeof refetch === "function") refetch();
      } else {
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
      setSelectedUser(null);
      setActionType(null);
    }
  };

  const getRoleBadge = (role) => {
    if (role === "admin") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-purple-100 text-purple-700 border-purple-200">
          <Crown className="w-3.5 h-3.5" />
          Admin
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-gray-100 text-gray-700 border-gray-200">
        <UserCheck className="w-3.5 h-3.5" />
        User
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getUserName = (user) => {
    return user.displayName || user.name || "Unknown User";
  };

  const getUserInitial = (user) => {
    const name = getUserName(user);
    return name.charAt(0).toUpperCase();
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
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage user accounts and administrative roles
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
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Role Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none bg-white cursor-pointer min-w-[160px]"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admins Only</option>
              <option value="user">Users Only</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || roleFilter !== "all") && (
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
            {roleFilter !== "all" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                Role: {roleFilter}
                <button
                  onClick={() => setRoleFilter("all")}
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
          Showing <span className="font-semibold">{filteredUsers.length}</span>{" "}
          of <span className="font-semibold">{users.length}</span> users
        </p>
      </div>

      {/* Users Table/Cards */}
      {filteredUsers.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No users found
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
                    User Info
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Joined Date
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt={getUserName(user)}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-lime-400 flex items-center justify-center text-gray-900 font-bold text-sm">
                            {getUserInitial(user)}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-gray-800">
                            {getUserName(user)}
                          </p>
                          <p className="text-xs text-gray-500">
                            ID: {user._id?.slice(-8)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="truncate max-w-[250px]">
                          {user.email || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{formatDate(user.createdAt)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewDetails(user)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {user.role === "admin" ? (
                          <button
                            onClick={() => handleAction(user, "removeAdmin")}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove Admin Role"
                          >
                            <ShieldOff className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAction(user, "makeAdmin")}
                            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title="Make Admin"
                          >
                            <ShieldCheck className="w-4 h-4" />
                          </button>
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
            {filteredUsers.map((user) => (
              <div key={user._id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={getUserName(user)}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-lime-400 flex items-center justify-center text-gray-900 font-bold">
                        {getUserInitial(user)}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-800">
                        {getUserName(user)}
                      </p>
                      <p className="text-xs text-gray-500">
                        ID: {user._id?.slice(-8)}
                      </p>
                    </div>
                  </div>
                  {getRoleBadge(user.role)}
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{user.email || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{formatDate(user.createdAt)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleViewDetails(user)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleAction(user, "removeAdmin")}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors text-sm font-medium"
                    >
                      <ShieldOff className="w-4 h-4" />
                      Remove Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAction(user, "makeAdmin")}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors text-sm font-medium"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      Make Admin
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">User Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              {/* User Header */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                {selectedUser.photoURL ? (
                  <img
                    src={selectedUser.photoURL}
                    alt={getUserName(selectedUser)}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-lime-400 flex items-center justify-center text-gray-900 font-bold text-2xl">
                    {getUserInitial(selectedUser)}
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">
                    {getUserName(selectedUser)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Member since {formatDate(selectedUser.createdAt)}
                  </p>
                </div>
                {getRoleBadge(selectedUser.role)}
              </div>

              {/* Details Grid */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                    Account Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500 font-medium">
                        User ID
                      </label>
                      <p className="text-sm text-gray-800 font-medium font-mono">
                        {selectedUser._id}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium">
                        Email Address
                      </label>
                      <p className="text-sm text-gray-800 font-medium flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {selectedUser.email || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium">
                        Account Role
                      </label>
                      <div className="mt-1">
                        {selectedUser.role === "admin" ? (
                          <div className="flex items-center gap-2 text-sm text-purple-700">
                            <Crown className="w-4 h-4" />
                            <span className="font-semibold">Administrator</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <UserCheck className="w-4 h-4" />
                            <span className="font-semibold">Regular User</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium">
                        Registration Date
                      </label>
                      <p className="text-sm text-gray-800 font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {formatDate(selectedUser.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
                {selectedUser.role === "admin" ? (
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleAction(selectedUser, "removeAdmin");
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-semibold"
                  >
                    <ShieldOff className="w-5 h-5" />
                    Remove Admin Role
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleAction(selectedUser, "makeAdmin");
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-semibold"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    Promote to Admin
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Confirmation Modal */}
      {showActionModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                actionType === "makeAdmin" ? "bg-purple-100" : "bg-red-100"
              }`}
            >
              {actionType === "makeAdmin" ? (
                <ShieldCheck className="w-6 h-6 text-purple-600" />
              ) : (
                <ShieldOff className="w-6 h-6 text-red-600" />
              )}
            </div>

            <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
              {actionType === "makeAdmin"
                ? "Promote to Admin?"
                : "Remove Admin Role?"}
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to{" "}
              {actionType === "makeAdmin"
                ? "grant administrator privileges to"
                : "remove administrator privileges from"}{" "}
              <span className="font-semibold">{getUserName(selectedUser)}</span>
              ?
              {actionType === "makeAdmin"
                ? " They will have full access to manage the system."
                : " They will lose administrative access."}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowActionModal(false);
                  setSelectedUser(null);
                  setActionType(null);
                }}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmAction(selectedUser)}
                disabled={actionLoading}
                className={`flex-1 px-6 py-3 text-white rounded-lg transition-colors font-semibold ${
                  actionType === "makeAdmin"
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-red-600 hover:bg-red-700"
                } ${actionLoading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {actionLoading
                  ? actionType === "makeAdmin"
                    ? "Promoting..."
                    : "Removing..."
                  : actionType === "makeAdmin"
                  ? "Confirm"
                  : "Remove"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
