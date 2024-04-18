// GoogleMapModal.js
import React from "react";
import Modal from "react-bootstrap/Modal";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const GoogleMapModal = ({ show, handleClose, latitude, longitude }) => {
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: latitude,
    lng: longitude,
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Location on Map</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LoadScript googleMapsApiKey="AIzaSyBpti7QuC_QXwWE90MT0RkfMPlET1KbhS4">
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </Modal.Body>
    </Modal>
  );
};

export default GoogleMapModal;
