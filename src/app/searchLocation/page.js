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

  };

  const handleLocationModal = () => {
    setIsSearchModalOpen(true);
  };

  const handleCloseMapModal = (data) => {
    setIsMapModalOpen(false);
    setIsSearchModalOpen(false);
  
  };

  const handleMapLocation = (data)=>{
    setIsSearchModalOpen(data.isChangePressed)
    setIsMapModalOpen(data.isChangePressed)
  } 

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
      {isMapModalOpen && location && !isSearchModalOpen && (
        <MapModal
          show={isMapModalOpen}
          location={location}
          type={locationType}
          onClose={handleCloseMapModal}
          onSelectLocation={handleMapLocation}
        />
      )}
    </div>
  );
}
