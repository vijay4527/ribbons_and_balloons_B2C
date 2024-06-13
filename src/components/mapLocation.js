"use client";
import { useState } from "react";
import { Modal, Form} from "react-bootstrap";

const LocationSearchModal = ({ show, onClose, onSelectLocation }) => {
  const [query, setQuery] = useState("");
  const [showmapModal, setShowMapModal] = useState(false);
  const [isPlacesActive, setIsPlacesAcitve] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const searchPlaces = [
    {
      placeName: "Taximens Colony, Kurla West",
      address: "Mumbai, Maharashtra, India",
    },
    {
      placeName: "Buddha Colony, Kurla West, Kurla",
      address: "Mumbai, Maharashtra, India",
    },
    {
      placeName: "Buddha Colony, Kurla West, Kurla",
      address: "Mumbai, Maharashtra, India",
    },
    {
      placeName: "Buddha Colony, Kurla West, Kurla",
      address: "Mumbai, Maharashtra, India",
    },
    {
      placeName: "Buddha Colony, Kurla West, Kurla",
      address: "Mumbai, Maharashtra, India",
    },
  ];
  const handleSearch = () => {
    setShowMapModal(true);
    const location = { lat: 37.7749, lng: -122.4194 };
    onSelectLocation(location);
  };

  const handleUseCurrentLocation = (newLocation) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (isPlacesActive) {
          onSelectLocation("place", newLocation);
        } else {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log("Location", location.lat, location.lng);
          onSelectLocation("latLong", location);
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleQuery = (e) => {
    if (e.length > 0) {
      const filteredData = searchPlaces.filter((place) => {
        return place.placeName.toLowerCase().includes(e.toLowerCase());
      });
      setIsPlacesAcitve(true);
      setQuery(e);
      setFilteredPlaces(filteredData); 
      
    }else{
      setIsPlacesAcitve(false);
      setFilteredPlaces([]); 
    }
  };

  return (
    <>
      <div className="mapDiv">
        <Modal show={show} onHide={onClose} size="lg" className="locationModal">
          <Modal.Header closeButton>
            <Modal.Title>Search Location</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={"extraHeaderWrap"}>
              <div className={"searchHeaderWrap"}>
                <div className={"searchInput"}>
                  <Form.Control
                    type="text"
                    aria-label="search"
                    placeholder="search for places"
                    onChange={(e) => handleQuery(e.target.value)}
                    className="mapInput"
                  />
                  <span className={"searchIcon"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>{" "}
            <div className="mt-4">
              <div className="currentLocation">
                <div className="css-1dbjc4n r-1472mwg r-lrsllp"></div>
                <div tabIndex="0" className="locationDiv">
                  <div className="css-1dbjc4n">
                    <div
                      aria-disabled="true"
                      role="img"
                      tabIndex="-1"
                      className="css-1dbjc4n r-1xc7w19 r-17gur6a r-1phboty r-1yadl64 r-10ptun7 r-1nflyc r-6dt33c r-1i6wzkk r-1janqcz"
                    >
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 20 20"
                        fill="#6E42E5"
                        xmlns="http://www.w3.org/2000/svg"
                        className="locationSvg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.063 3.504V5h1.874V3.504a6.567 6.567 0 015.559 5.559H15v1.874h1.496a6.567 6.567 0 01-5.558 5.559V15H9.062v1.496a6.567 6.567 0 01-5.558-5.558H5V9.062H3.504a6.567 6.567 0 015.559-5.558zm0-1.89a8.44 8.44 0 00-7.449 7.449H0v1.874h1.614a8.44 8.44 0 007.449 7.449V20h1.874v-1.614a8.44 8.44 0 007.449-7.448H20V9.062h-1.614a8.44 8.44 0 00-7.448-7.448V0H9.062v1.614zM10 8.438a1.563 1.563 0 100 3.125 1.563 1.563 0 000-3.126zM6.562 10a3.437 3.437 0 116.875 0 3.437 3.437 0 01-6.874 0z"
                          fill="#6E42E5"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="CurrentLocationText">
                    <p
                      dir="auto"
                      role="paragraph"
                      className="css-901oao r-144iecu r-1b43r93 r-1kfrs79 r-rjixqe r-fdjqy7 r-13wfysu r-3twk1y"
                      onClick={handleUseCurrentLocation}
                    >
                      Use current location
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="css-1dbjc4n r-cb25cm r-ve2vwf r-1phboty r-13yce4e r-1yadl64 r-3da1kt"></div>
            <div className="searchResults mt-4">
              <ul className="places">
                {isPlacesActive &&
                  filteredPlaces &&
                  filteredPlaces.length > 0 &&
                  filteredPlaces.map((item, index) => (
                    <li
                      className="Locations"
                      key={index}
                      onClick={() => handleUseCurrentLocation(item)}
                    >
                      <div className="fullAddress">
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 24 24"
                          fill="#545454"
                          xmlns="http://www.w3.org/2000/svg"
                          className="locationIcon"
                        >
                          <path
                            d="M11.426 22.569L12 21.75l.573.82a1 1 0 01-1.147-.001z"
                            fill="#545454"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 5.75a4 4 0 100 8 4 4 0 000-8zm-2 4a2 2 0 114 0 2 2 0 01-4 0z"
                            fill="#545454"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.426 22.569L12 21.75c.573.82.575.818.575.818l.002-.001.006-.004.02-.015.07-.05.257-.192a25.395 25.395 0 003.575-3.368c1.932-2.223 3.995-5.453 3.995-9.188a8.5 8.5 0 10-17 0c0 3.735 2.063 6.965 3.995 9.187a25.4 25.4 0 003.575 3.369 14.361 14.361 0 00.327.242l.02.015.006.004.003.002zM7.404 5.154A6.5 6.5 0 0118.5 9.75c0 3.015-1.687 5.785-3.505 7.875A23.403 23.403 0 0112 20.495a23.4 23.4 0 01-2.995-2.869C7.187 15.534 5.5 12.764 5.5 9.75a6.5 6.5 0 011.904-4.596z"
                            fill="#545454"
                          ></path>
                        </svg>
                        <div>
                          <p dir="auto" role="paragraph" className="place">
                            <b>{item.placeName}</b>
                          </p>
                          <p dir="auto" role="paragraph" className="mapAddress">
                            {item.address}
                          </p>
                        </div>
                      </div>
                      <div className="css-1dbjc4n r-bztko3 r-13qz1uu">
                        <div className="css-1dbjc4n r-10ptun7 r-1janqcz"></div>
                        <div className="css-1dbjc4n r-109y4c4 r-13qz1uu"></div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default LocationSearchModal;
