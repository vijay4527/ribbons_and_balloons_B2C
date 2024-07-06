"use client";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import { Modal, Button, Form } from "react-bootstrap";
import * as yup from "yup";
import { locationSchema } from "@/components/validation";
import { useState, useEffect } from "react";

const MapModal = ({ show, location, type, onClose, onSelectLocation }) => {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  // const [flat, setFlate] = useState("");
  // const [landmark, setLandMark] = useState("");
  // const [userName, setUserName] = useState("");
  // const [isChangePressed, setIsChangePressed] = useState(false);
  const [errors, setErrors] = useState({});
  const [locationData, setLocationData] = useState({
    flate: "",
    landmark: "",
    name: "",
    isChangePressed: false,
  });
  const [currentLocation, setCurrentLocation] = useState(null);

  const handleChange = async () => {
    try {
      setLocationData((prevData) => {
        const updatedData = { ...prevData, isChangePressed: true };
        onSelectLocation(updatedData);
        return updatedData;
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleSave = async (e) => {
    try {
      await locationSchema.validate(locationData, { abortEarly: false });
      location.isChangePressed = true;
      // const addressData = {
      //  locationData,
      // };
      onSelectLocation(locationData);
      onClose(locationData);
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        const newErrors = {};
        validationError.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      } else {
        console.error(validationError);
      }
    }
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocationData({ ...locationData, [name]: value });
    if (value.trim() !== "") {
      setErrors({ ...errors, [name]: "" });
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
                      value={locationData.flate}
                      onChange={handleInputChange}
                      className={`flatInput ${errors.flate ? "error" : ""}`}
                      name="flate"
                    ></Form.Control>
                  </Form.Group>
                  <div className="errorDiv">
                    {errors.flate && (
                      <div className="text-danger">{errors.flate}</div>
                    )}
                  </div>

                  <Form.Group
                    controlId="formLocationDescription"
                    className="mt-3"
                  >
                    <Form.Label className="flate">LandMark</Form.Label>
                    <Form.Control
                      type="text"
                      className={`flatInput ${errors.landmark ? "error" : ""}`}
                      value={locationData.landmark}
                      onChange={handleInputChange}
                      name="landmark"
                    />
                  </Form.Group>
                  <div className="errorDiv">
                    {errors.landmark && (
                      <div className="text-danger">{errors.landmark}</div>
                    )}
                  </div>
                  <Form.Group
                    controlId="formLocationDescription"
                    className="mt-3"
                  >
                    <Form.Label className="flate">Name</Form.Label>
                    <Form.Control
                      type="text"
                      className={`flatInput ${errors.name ? "error" : ""}`}
                      value={locationData.name}
                      onChange={handleInputChange}
                      name="name"
                    />
                  </Form.Group>
                  <div className="errorDiv">
                    {errors.name && (
                      <div className="text-danger">{errors.name}</div>
                    )}
                  </div>
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
