import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Search } from "lucide-react";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.69, 90.34];
  const serviceCenterData = useLoaderData();
  const mapRef = useRef(null)

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenterData.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district) {
      const coord = [district.latitude, district.longitude];
      mapRef.current.flyTo(coord, 18)
    }
  };

  return (
    <div className="py-12 lg:py-20">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Header */}
        <h1 className="text-3xl lg:text-5xl font-bold text-[#03373d] mb-8 lg:mb-10">
          We are available in 64 districts
        </h1>

        {/* Search Bar */}
        <div className="mb-12 lg:mb-16">
          <form
            onSubmit={handleSearch}
            className="flex items-center w-full max-w-xl bg-[#F2F5FA] rounded-full h-14 lg:h-16 px-4 lg:px-6 shadow-sm"
          >
            {/* Search Icon */}
            <Search className="text-gray-500 w-5 h-5 lg:w-6 lg:h-6 mr-3 flex-shrink-0" />

            {/* Input */}
            <input
              type="text"
              name="location"
              placeholder="Search here"
              className="flex-1 bg-transparent outline-none text-sm lg:text-base placeholder:text-gray-400 text-[#03373d]"
            />

            {/* Search Button */}
            <button
              type="submit"
              className="bg-[#caeb66] hover:bg-[#b8d955] text-[#03373d] font-semibold rounded-full px-6 lg:px-8 py-2.5 lg:py-3 ml-3 transition-all text-sm lg:text-base"
            >
              Search
            </button>
          </form>
        </div>

        {/* Map Section */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#03373d] mb-6 lg:mb-8">
            We deliver almost all over Bangladesh
          </h2>

          <div className="w-full h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-lg">
            <MapContainer
              center={position}
              zoom={8}
              scrollWheelZoom={false}
              ref={mapRef}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {serviceCenterData.map((center, index) => (
                <Marker
                  key={index}
                  position={[center.latitude, center.longitude]}
                >
                  <Popup>
                    <strong>{center.district}</strong> <br />
                    <span className="font-semibold text-[10px] text-secondary">
                      {" "}
                      Our Service Area: {center.covered_area.join(", ")}
                    </span>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
