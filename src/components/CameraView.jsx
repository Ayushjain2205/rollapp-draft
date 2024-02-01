import React, { useRef } from "react";
import { Camera } from "react-camera-pro";

const Cameraview = () => {
  const camera = useRef(null);
  return (
    <div className="h-full w-full">
      <Camera ref={camera} facingMode="environment" />
    </div>
  );
};

export default Cameraview;
