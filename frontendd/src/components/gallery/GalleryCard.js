import React from 'react';
import { motion } from 'framer-motion';

const GalleryCard = ({ images, direction }) => {
  return (
    <motion.div
      className="flex overflow-hidden mb-8"
      initial={{ opacity: 0, x: direction === 'left' ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={`flex space-x-4 ${direction === 'left' ? '' : 'flex-row-reverse'}`}>
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={`w-48 h-48 rounded-lg overflow-hidden ${direction === 'left' ? 'rounded-r-3xl' : 'rounded-l-3xl'}`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <img src={image} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default GalleryCard;

