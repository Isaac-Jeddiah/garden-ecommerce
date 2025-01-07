import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

export const AboutHero = () => {
  return (
    <div className="relative bg-green-50 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        <div className="flex flex-col items-center text-center">
          <Leaf className="w-12 h-12 text-green-600 mb-6" />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-bold text-gray-800 mb-6"
          >
            Growing Green Dreams
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-2xl"
          >
            We're passionate about bringing the beauty of nature into your home,
            one plant at a time.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};
