"use client";
import { Button, Card, Flex, Title } from "@tremor/react";
import Image from "next/image";
import { useState } from 'react';


const CustomAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log("Selected file: " + file);
    setSelectedImage(file);
  };

  const handleUpload = () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('images', selectedImage);

      fetch('https://dc4d-87-116-164-65.ngrok-free.app/predict', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          setCurrentImage(`https://dc4d-87-116-164-65.ngrok-free.app${data["url"]}`)
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        });
    }
  };

  return <Card>
    <Title>Получить анализ для данных с ПК</Title>
    <Flex justifyContent="center" flexDirection="col" className="mt-6">
      {currentImage && <Image src={currentImage}
        width={600}
        height={900}
        className="mb-5"
      />}
      <input onChange={handleImageChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
      <Button className="mt-10" onClick={handleUpload}>Загрузить картинку или архив</Button>
    </Flex>
  </Card>
};

export default CustomAnalysis;
