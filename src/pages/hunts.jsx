import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  MarkerF,
  LoadScript,
  OverlayView,
} from "@react-google-maps/api";
import mapStyle from "../utils/mapStyle.json";
import Stamp from "../components/UI/Stamp";

const Hunts = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [randomPoints, setRandomPoints] = useState([]);
  const [activeOverlay, setActiveOverlay] = useState(null);

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const options = {
    disableDefaultUI: true,
    clickableIcons: false,
    styles: mapStyle,
  };

  const getRandomCoordinates = (center, radius) => {
    const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

    const earthRadius = 6371; // Radius of the Earth in kilometers
    const randomDistance = getRandomNumber(0, radius / 1000); // Convert radius to kilometers
    const randomBearing = getRandomNumber(0, 2 * Math.PI); // Bearing is in radians

    const lat =
      (Math.asin(
        Math.sin((center.lat * Math.PI) / 180) *
          Math.cos(randomDistance / earthRadius) +
          Math.cos((center.lat * Math.PI) / 180) *
            Math.sin(randomDistance / earthRadius) *
            Math.cos(randomBearing)
      ) *
        180) /
      Math.PI;

    const lng =
      center.lng +
      (Math.atan2(
        Math.sin(randomBearing) *
          Math.sin(randomDistance / earthRadius) *
          Math.cos((center.lat * Math.PI) / 180),
        Math.cos(randomDistance / earthRadius) -
          Math.sin((center.lat * Math.PI) / 180) *
            Math.sin((lat * Math.PI) / 180)
      ) *
        180) /
        Math.PI;

    return { lat, lng };
  };

  const stampData = [
    { image: "/images/mickey.png", color: "#FFC022" },
    { image: "/images/hm.png", color: "#FB4912" },
    { image: "/images/apple.png", color: "#FCFCFC" },
    { image: "/images/mcd.png", color: "#FEC7C7" },
    { image: "/images/starbucks.png", color: "#F091F9" },
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });

          // Generate 5 random points and update the state
          const points = [];
          for (let i = 0; i < 5; i++) {
            points.push(
              getRandomCoordinates({ lat: latitude, lng: longitude }, 3000)
            );
          }
          setRandomPoints(points);
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
    <div className="relative" style={{ height: "665px", width: "390px" }}>
      <div className="absolute flex flex-col justify-center px-[20px] top-0 left-0 h-[52px] w-full z-10 bg-[#FFC022] ">
        <span className="text-[28px]"> EXPLORE..</span>
      </div>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation || { lat: 0, lng: 0 }}
          zoom={15}
          options={options}
        >
          {userLocation && (
            <MarkerF
              icon="/images/marker.png"
              position={{ lat: userLocation.lat, lng: userLocation.lng }}
            />
          )}
          {randomPoints.map((point, index) => (
            <OverlayView
              key={index}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              position={{ lat: point.lat, lng: point.lng }}
            >
              <div onClick={() => setActiveOverlay(index)}>
                <Stamp
                  image={stampData[index].image}
                  color={stampData[index].color}
                  marker
                />
              </div>
            </OverlayView>
          ))}
        </GoogleMap>
      </LoadScript>
      {activeOverlay !== null && (
        <div className="absolute h-[208px] w-[352px] border-[2px] border-black rounded-[8px] bg-white flex flex-col bottom-[40px] left-[19px] z-10 ">
          <div className=" flex flex-row gap-[22px] mt-[22px] mx-[22px] ">
            <div>
              <Stamp image="/images/mickey.png" preview />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="text-[24px] font-[700]">find MICKEY!</p>
              <p className="text-[12px] leading-[16px] tracking-[0.2px]">
                Solve the clues to win free goodies at your loved spot
              </p>
              <p className="text-[12px] text-[#00000054] mt-[2px]">
                Disneyland Park, Paris
              </p>
              <p className="text-[16px] text-[#F24E1E] font-[700]">1/5</p>
            </div>
          </div>
          <div className="absolute flex bottom-0 w-full h-[48px] items-center bg-[#262626]">
            <p className="text-center text-white w-full">Start the hunt</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hunts;
