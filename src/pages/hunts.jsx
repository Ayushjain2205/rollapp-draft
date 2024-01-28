import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

const MapMarker = ({ text }) => <div>{text}</div>;

const Hunts = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{ lat: 0, lng: 0 }} // Default center
        defaultZoom={12}
        center={userLocation || { lat: 0, lng: 0 }} // Center map at user's location if available
      >
        {userLocation && (
          <MapMarker
            lat={userLocation.lat}
            lng={userLocation.lng}
            text="Your Location"
          />
        )}
      </GoogleMapReact>
    </div>
  );
};

export default Hunts;
