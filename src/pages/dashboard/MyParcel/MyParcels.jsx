import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Calendar, Filter, MoreVertical, Edit2 } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleParcelDelete = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`parcels/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handlePayment = async(parcel) => {
    const paymentInfo = {
        cost: parcel.cost,
        parcelId: parcel._id,
        senderEmail: parcel.senderEmail,
        parcelName: parcel.parcelName,
    }
    const res = await axiosSecure.post('/create-checkout-session', paymentInfo)
    window.location.href = res.data.url
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Helper function to get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "in transit":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm m-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-800">My Parcels</h3>
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
        <div className="text-center py-8 text-gray-500">Loading parcels...</div>
      ) : parcels.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No parcels found</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-100">
                  <th className="py-3 font-medium">ID</th>
                  <th className="py-3 font-medium">Parcel Name</th>
                  <th className="py-3 font-medium">Receiver</th>
                  <th className="py-3 font-medium">Date</th>
                  <th className="py-3 font-medium">Weight (kg)</th>
                  <th className="py-3 font-medium">From → To</th>
                  <th className="py-3 font-medium">Cost (৳)</th>
                  <th className="py-3 font-medium">Payment</th>
                  <th className="py-3 font-medium">Status</th>
                  <th className="py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {parcels.map((parcel, index) => (
                  <tr
                    key={parcel._id || index}
                    className="text-sm text-gray-700 border-b border-gray-50 hover:bg-gray-50"
                  >
                    <td className="py-3 font-medium">{parcel.parcelId}</td>
                    <td className="py-3 font-medium">{parcel.parcelName}</td>
                    <td className="py-3 text-gray-600">
                      {parcel.receiverName}
                    </td>
                    <td className="py-3 text-gray-500">
                      {formatDate(parcel.createdAt?.$date || parcel.createdAt)}
                    </td>
                    <td className="py-3 text-gray-500">
                      {parcel.parcelWeight} kg
                    </td>
                    <td className="py-3 text-gray-500">
                      {parcel.senderDistrict} → {parcel.receiverDistrict}
                    </td>
                    <td className="py-3 text-gray-700 font-medium">
                      ৳{parcel.cost}
                    </td>
                    <td className="py-3 text-gray-700 font-medium">
                      {parcel.paymentStatus === "paid" ? (
                        <span className="bg-green-100 px-2 py-1 rounded-full text-xs font-medium text-green-700">
                          Paid
                        </span>
                      ) : (
                        <Button
                          onClick={() => handlePayment(parcel)}
                          className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
                        >
                          Pay
                        </Button>
                      )}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          parcel.status || "pending"
                        )}`}
                      >
                        {parcel.status || "Pending"}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                          <Edit2 className="w-3 h-3" />
                          <span className="text-xs">Edit</span>
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <div className="dropdown dropdown-left">
                            <MoreVertical
                              tabIndex={0}
                              role="button"
                              className="w-3 h-3"
                            />
                            <ul
                              tabIndex="-1"
                              className="dropdown-content menu bg-base-100 rounded-box z-1 w-30 p-2 shadow-sm space-y-2"
                            >
                              <li>
                                <a className="text-secondary">View</a>
                              </li>
                              <li>
                                <a
                                  onClick={() => handleParcelDelete(parcel._id)}
                                  className="bg-red-100 text-red-700"
                                >
                                  Delete
                                </a>
                              </li>
                            </ul>
                          </div>
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
              <span className="text-xs text-gray-400 flex items-center">
                ...
              </span>
              <button className="w-6 h-6 rounded-full text-gray-500 hover:bg-gray-100 text-xs flex items-center justify-center">
                10
              </button>
            </div>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50">
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyParcels;
