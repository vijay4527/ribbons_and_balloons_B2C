"use client";
import React, { useEffect, useState } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
const libraries = ["places"];

const SearchLatLng = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBpti7QuC_QXwWE90MT0RkfMPlET1KbhS4",
    libraries,
  });

  const [autocomplete, setAutocomplete] = useState(null);
  const [address, setAddress] = useState("");
  const [latLng, setLatLng] = useState({ lat: null, lng: null });

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setAddress(place.formatted_address);
      setLatLng({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyCRjTnDRhNQ9nDMLqQKY5E2oXX0GGAvCsc&input=TAXIMENS&types=geocode"
      );
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data); // Handle the data as needed
    } catch (err) {
      console.log(err);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Address Autocomplete with Next.js</h1>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Enter address"
          style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        />
      </Autocomplete>
      <div style={{ marginTop: "20px" }}>
        <p>
          <strong>Address:</strong> {address}
        </p>
        <p>
          <strong>Latitude:</strong> {latLng.lat}
        </p>
        <p>
          <strong>Longitude:</strong> {latLng.lng}
        </p>
      </div>
    </div>
  );
};

export default SearchLatLng;
