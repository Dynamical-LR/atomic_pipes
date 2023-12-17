"use client";

import Image from "next/image";
import { useState, useEffect } from "react";


const DefectImage = () => {
  const [currentImage, setCurrentImage] = useState("https://dc4d-87-116-164-65.ngrok-free.app/predict/last");
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage("https://dc4d-87-116-164-65.ngrok-free.app/predict/last");
    }, 1000)

    return () => clearInterval(intervalId);
  }, [])

  return <Image src={currentImage}
    width={600}
    height={900}
  />
};

export default DefectImage;

