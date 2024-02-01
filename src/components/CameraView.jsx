import React, { useState, useRef } from "react";
import { Camera } from "react-camera-pro";

const Cameraview = () => {
  const camera = useRef(null);
  return (
    <div className="h-[665px] w-[390px]">
      <Camera ref={camera} facingMode="environment" style={{ zIndex: 0 }} />
    </div>
  );
};

export default Cameraview;
