import { useForm, useWatch } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const SendParcel = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      parcelType: "document",
    },
  });

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const onSubmit = (data) => {
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    console.log("cost", cost);

    Swal.fire({
      title: "Agree with the Cost?",
      text: `You will be charge! ${cost} taka`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "I agree!",
    }).then((result) => {
      if (result.isConfirmed) {

        

        // Swal.fire({
        //   title: "Cancel!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
      }
    });
  };

  //   const parcelType = useWatch({control, name: "parcelType"});

  return (
    <div className="py-12 mx-4 lg:py-20 lg:mx-0 bg-white rounded-4xl my-10 shadow-sm">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-5xl font-bold text-[#03373d] mb-4">
            Send A Parcel
          </h1>
        </div>

        <div className="mb-8">
          <h2 className="text-xl lg:text-2xl font-bold text-[#03373d]">
            Enter your parcel details
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Parcel Type Radio */}
          <div className="flex items-center gap-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative flex items-center">
                <input
                  {...register("parcelType")}
                  type="radio"
                  value="document"
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-gray-300 checked:border-[#28a745] transition-all"
                />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-[#28a745] opacity-0 peer-checked:opacity-100 transition-opacity"></div>
              </div>
              <span className="text-[#03373d] font-medium">Document</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative flex items-center">
                <input
                  {...register("parcelType")}
                  type="radio"
                  value="not-document"
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-gray-300 checked:border-[#28a745] transition-all"
                />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-[#28a745] opacity-0 peer-checked:opacity-100 transition-opacity"></div>
              </div>
              <span className="text-[#03373d] font-medium">Not-Document</span>
            </label>
          </div>

          {/* Parcel Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#03373d]">
                Parcel Name
              </label>
              <input
                {...register("parcelName", { required: true })}
                type="text"
                placeholder="Parcel Name"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#caeb66] focus:ring-1 focus:ring-[#caeb66] transition-all placeholder:text-gray-300"
              />
              {errors.parcelName && (
                <small className="text-red-500">Parcel Name is required</small>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#03373d]">
                Parcel Weight (KG)
              </label>
              <input
                {...register("parcelWeight", { required: true })}
                type="number"
                placeholder="Parcel Weight (KG)"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#caeb66] focus:ring-1 focus:ring-[#caeb66] transition-all placeholder:text-gray-300"
              />
              {errors.parcelWeight && (
                <small className="text-red-500">Weight is required</small>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Sender Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-[#03373d]">
                Sender Details
              </h3>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#03373d]">
                  Sender Name
                </label>
                <input
                  {...register("senderName", { required: true })}
                  type="text"
                  placeholder="Sender Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#caeb66] focus:ring-1 focus:ring-[#caeb66] transition-all placeholder:text-gray-300"
                />
                {errors.senderName && (
                  <small className="text-red-500">
                    Sender Name is required
                  </small>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#03373d]">
                  Address
                </label>
                <input
                  {...register("senderAddress", { required: true })}
                  type="text"
                  placeholder="Address"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#caeb66] focus:ring-1 focus:ring-[#caeb66] transition-all placeholder:text-gray-300"
                />
                {errors.senderAddress && (
                  <small className="text-red-500">Address is required</small>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#03373d]">
                  Sender Phone No
                </label>
                <input
                  {...register("senderPhone", { required: true })}
                  type="tel"
                  placeholder="Sender Phone No"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#caeb66] focus:ring-1 focus:ring-[#caeb66] transition-all placeholder:text-gray-300"
                />
                {errors.senderPhone && (
                  <small className="text-red-500">Phone is required</small>
                )}
              </div>

              {/* Sender Region */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#03373d]">
                  Sender Region
                </label>
                <div className="relative">
                  <select
                    {...register("senderRegion", { required: true })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#caeb66] focus:ring-1 focus:ring-[#caeb66] transition-all appearance-none bg-white text-gray-500 cursor-pointer"
                  >
                    <option defaultValue={true} disabled={false} value="">
                      Select your Region
                    </option>
                    {regions.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
                {errors.senderRegion && (
                  <small className="text-red-500">District is required</small>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#03373d]">
                  Your District
                </label>
                <div className="relative">
                  <select
                    {...register("senderDistrict", { required: true })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#caeb66] focus:ring-1 focus:ring-[#caeb66] transition-all appearance-none bg-white text-gray-500 cursor-pointer"
                  >
                    <option defaultValue={true} value="">
                      Select your District
                    </option>
                    {districtsByRegion(senderRegion).map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
                {errors.senderDistrict && (
                  <small className="text-red-500">District is required</small>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#03373d]">
                  Pickup Instruction
                </label>
                <textarea
                  {...register("pickupInstruction")}
                  placeholder="Pickup Instruction"
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#caeb66] focus:ring-1 focus:ring-[#caeb66] transition-all placeholder:text-gray-300 resize-none"
                ></textarea>
              </div>
            </div>

            {/* Receiver Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-[#03373d]">
                Receiver Details
              </h3>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#03373d]">
                  Receiver Name
                </label>
                <input
                  {...register("receiverName", { required: true })}
                  type="text"
                  placeholder="Sender Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#caeb66] focus:ring-1 focus:ring-[#caeb66] transition-all placeholder:text-gray-300"
                />
                {errors.receiverName && (
                  <small className="text-red-500">
                    Receiver Name is required
                  </small>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#03373d]">
                  Receiver Address
                </label>
                <input
                  {...register("receiverAddress", { required: true })}
                  type="text"
                  placeholder="Address"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#caeb66] focus:ring-1 focus:ring-[#caeb66] transition-all placeholder:text-gray-300"
                />
                {errors.receiverAddress && (
                  <small className="text-red-500">Address is required</small>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#03373d]">
                  Receiver Contact No
                </label>
                <input
                  {...register("receiverContact", { required: true })}
                  type="tel"
                  placeholder="Sender Contact No"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#caeb66] focus:ring-1 focus:ring-[#caeb66] transition-all placeholder:text-gray-300"
                />
                {errors.receiverContact && (
                  <small className="text-red-500">Contact is required</small>
                )}
              </div>

              {/* Receiver Region */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#03373d]">
                  Receiver Region
                </label>
                <div className="relative">
                  <select
                    {...register("receiverRegion", { required: true })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#caeb66] focus:ring-1 focus:ring-[#caeb66] transition-all appearance-none bg-white text-gray-500 cursor-pointer"
                  >
                    <option defaultValue={true} disabled={false} value="">
                      Select your Region
                    </option>
                    {regions.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
                {errors.receiverRegion && (
                  <small className="text-red-500">District is required</small>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#03373d]">
                  Receiver District
                </label>
                <div className="relative">
                  <select
                    {...register("receiverDistrict", { required: true })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#caeb66] focus:ring-1 focus:ring-[#caeb66] transition-all appearance-none bg-white text-gray-500 cursor-pointer"
                  >
                    <option defaultValue={true} disabled={false} value="">
                      Select Receiver District
                    </option>
                    {districtsByRegion(receiverRegion).map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
                {errors.receiverDistrict && (
                  <small className="text-red-500">District is required</small>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#03373d]">
                  Delivery Instruction
                </label>
                <textarea
                  {...register("deliveryInstruction")}
                  placeholder="Delivery Instruction"
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#caeb66] focus:ring-1 focus:ring-[#caeb66] transition-all placeholder:text-gray-300 resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm text-[#03373d] font-medium mb-6">
              * PickUp Time 4pm-7pm Approx.
            </p>

            <button
              type="submit"
              className="bg-[#caeb66] hover:bg-[#b8d955] text-[#03373d] font-bold rounded-lg px-8 py-3.5 transition-all duration-300 shadow-md"
            >
              Proceed to Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
