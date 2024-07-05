"use client";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import { Modal, Button, Form } from "react-bootstrap";

import { useState, useEffect } from "react";
const MapModal = ({ show, location, type, onClose }) => {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const [flat, setFlate] = useState("");
  const [landmark, setLandMark] = useState("");
  const [userName, setUserName] = useState("");
  const [isChangePressed, setIsChangePressed] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  const handleChange = () => {
    setIsChangePressed(true);
    onClose();
  };
  const handleSave = (e) => {
    e.preventDefault();
    const addressData = {
      flat,
      landmark,
      userName,
      isChangePressed,
    };
    onClose(addressData);
  };

  useEffect(() => {
    if (show) {
      if (type === "place") {
        setCurrentLocation(location.placeName);
      } else {
        getUserLocation();
      }
    }
  }, [show, type, location]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(location);
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  return (
    <>
      <div className="mapModalDiv">
        <Modal
          show={show}
          onHide={() => onClose()}
          size="xl"
          className="mapModal"
        >
         
          <Modal.Body>
            <div className="row">
              <div className="col-lg-7">
                <LoadScript googleMapsApiKey="AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&libraries=places&v=weekly">
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={currentLocation}
                    zoom={10}
                  >
                    {currentLocation && <Marker position={currentLocation} />}
                  </GoogleMap>
                </LoadScript>
              </div>
              <div className="col-lg-5 p-4">
                <button
                  className="btn btn-primary btnChange"
                  onClick={handleChange}
                >
                  Change
                </button>
                <div className="css-1dbjc4n r-1habvwh r-18u37iz r-1wtj0ep r-13qz1uu mt-5">
                  <div
                    tabIndex="-1"
                    className="css-1dbjc4n r-1habvwh r-13awgt0 r-eqz5dr r-1777fci r-13qz1uu"
                  >
                    <h4
                      dir="auto"
                      aria-level="4"
                      role="heading"
                      className="mapPlace"
                    >
                      Taximens Colony
                    </h4>
                    <div className="css-1dbjc4n r-hdaws3 r-10g5efv"></div>
                    <p dir="auto" role="paragraph" className="address">
                      Taximens Colony, Kurla West, Mumbai, Maharashtra, India
                    </p>
                  </div>
                  <div className="css-1dbjc4n r-cb25cm r-ve2vwf r-1phboty r-13yce4e r-1yadl64 r-3da1kt"></div>
                </div>
                <Form className="mt-4">
                  <Form.Group controlId="formLocationName">
                    <Form.Label className="flate">Flate / House</Form.Label>
                    <Form.Control
                      type="text"
                      value={flat}
                      onChange={(e) => setFlate(e.target.value)}
                      className="flatInput"
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group
                    controlId="formLocationDescription"
                    className="mt-3"
                  >
                    <Form.Label className="flate">LandMark</Form.Label>
                    <Form.Control
                      type="text"
                      className="flatInput"
                      value={landmark}
                      onChange={(e) => setLandMark(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="formLocationDescription"
                    className="mt-3"
                  >
                    <Form.Label className="flate">Name</Form.Label>
                    <Form.Control
                      type="text"
                      className="flatInput"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="button"
                    className="mt-3"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </Form>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default MapModal;
