import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GalleryCard from './GalleryCard';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch these images from an API
    // For this example, we'll use placeholder images
    const fetchedImages = Array(30).fill().map((_, i) => `https://picsum.photos/seed/${i}/400/400`);
    setImages(fetchedImages);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 py-12 px-4 sm:px-6 lg:px-8">
      <motion.h1
        className="text-4xl font-bold text-center text-green-800 dark:text-green-200 mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Trees and Herbs Gallery
      </motion.h1>
      <div className="max-w-7xl mx-auto">
        {Array(6).fill().map((_, i) => (
          <GalleryCard
            key={i}
            images={images.slice(i * 5, (i + 1) * 5)}
            direction={i % 2 === 0 ? 'left' : 'right'}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;

