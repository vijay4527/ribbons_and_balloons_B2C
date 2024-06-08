"use client"
import { useEffect, useState } from 'react';

export default function Home() {
  const [title, setTitle] = useState('');
  const [results, setResults] = useState([]);
  const [input, setInput] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [request, setRequest] = useState({
    input: "",
    locationRestriction: { west: 68.1, north: 35.0, east: 97.5, south: 6.5 }, // India bounding box
    origin: { lat: 20.5937, lng: 78.9629 }, // Center of India
    language: "en-US",
    region: "in", // India
  });
  let token;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&libraries=places&v=weekly`;
    script.defer = true;
    script.onload = () => window.init();
    document.head.appendChild(script);
    window.init = init;
  }, []);

  const init = () => {
    token = new google.maps.places.AutocompleteSessionToken();
    setRequest(prev => ({ ...prev, sessionToken: token }));
  };

  const makeAcRequest = async (e) => {
    const value = e.target.value;
    setInput(value);

    if (value === '') {
      setTitle('');
      setResults([]);
      return;
    }

    const updatedRequest = { ...request, input: value };

    // @ts-ignore
    const service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions(updatedRequest, (predictions, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setTitle(`Query predictions for "${value}"`);
        setResults(predictions.map(prediction => prediction));
      }
    });
  };

  const onPlaceSelected = async (placeId) => {
    // @ts-ignore
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails({ placeId, fields: ['geometry'] }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setSelectedPlace({
          name: place.name,
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        setResults([]);
        setTitle('Selected Place:');
        setInput('');
        showOnMap(place.geometry.location.lat(), place.geometry.location.lng());
        refreshToken();
      }
    });
  };

  const refreshToken = () => {
    token = new google.maps.places.AutocompleteSessionToken();
    setRequest(prev => ({ ...prev, sessionToken: token }));
  };

  const showOnMap = (lat, lng) => {
    const mapOptions = {
      center: { lat, lng },
      zoom: 16,    };
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: map,
      title: "selectedPlace.name"
    });
    setMap(map);
    setMarker(marker);
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search for a place..." 
        value={input}
        onChange={makeAcRequest} 
      />
      <div id="title">{title}</div>
      <ul id="results">
        {results.map((result, index) => (
          <li key={index}>
            <a href="#" onClick={() => onPlaceSelected(result.place_id)}>{result.description}</a>
          </li>
        ))}
      </ul>
      {selectedPlace && (
        <div>
          <h2>{selectedPlace.name}</h2>
          <p>{selectedPlace.address}</p>
          <p>Latitude: {selectedPlace.lat}</p>
          <p>Longitude: {selectedPlace.lng}</p>
        </div>
      )}
      <div id="map" style={{ height: "400px", width: "100%" }}></div>
      <img
        className="powered-by-google"
        src="https://storage.googleapis.com/geo-devrel-public-buckets/powered_by_google_on_white.png"
        alt="Powered by Google"
      />
      <style jsx>{`
        body {
          font-family: Arial, sans-serif;
        }

        .powered-by-google {
          margin-top: 20px;
        }

        input[type="text"] {
          width: 100%;
          padding: 8px;
          box-sizing: border-box;
          margin-bottom: 10px;
        }

        #title {
          font-size: 18px;
          font-weight: bold;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        li {
          margin-bottom: 10px;
        }

        li a {
          text-decoration: none;
          color: blue;
          cursor: pointer;
        }

        h2 {
          margin: 0;
        }

        p {
          margin: 5px 0;
        }
      `}</style>
    </div>
  );
}
