import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="hero"
      >
        <h1>Welcome to Plantify</h1>
        <p>Your one-stop shop for lush, healthy plants.</p>
        <Link to="/shop">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="shop-btn"
          >
            Shop Now
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
