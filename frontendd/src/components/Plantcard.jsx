import React from 'react';
import { motion } from 'framer-motion';

const PlantCard = ({ plant }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="plant-card"
    >
      <img src={`/assets/${plant.name.toLowerCase().replace(/\s/g, '-')}.jpg`} alt={plant.name} />
      <h3>{plant.name}</h3>
      <p>${plant.price}</p>
    </motion.div>
  );
};

export default PlantCard;
