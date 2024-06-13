"use client";
import { useState } from "react";
import LocationSearchModal from "@/components/mapLocation";
import MapModal from "@/components/mapModal";

export default function Home() {
  const [location, setLocation] = useState(null);
  const [locationType,setLocationType] = useState("")
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const handleSelectLocation = (type, location) => {
    setLocation(location);
    setLocationType(type)
    setIsSearchModalOpen(false);
    setIsMapModalOpen(true);
    console.log("type in main page", type);
    console.log("location on main page", location);
  };

  const handleLocationModal = () => {
    setIsSearchModalOpen(true);
  };

  const handleCloseMapModal = (data) => {
    setIsMapModalOpen(false);
    setIsSearchModalOpen(true);
    if (data) {
      console.log("Data from MapModal:", data);
    }
  };

  return (
    <div>
      <button onClick={handleLocationModal}>Search Location</button>
      {isSearchModalOpen && (
        <LocationSearchModal
          show={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
          onSelectLocation={handleSelectLocation}
        />
      )}
      {isMapModalOpen && location && (
        <MapModal
          show={isMapModalOpen}
          location={location}
          type={locationType}
          onClose={handleCloseMapModal}
        />
      )}
    </div>
  );
}
