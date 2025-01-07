// src/components/StoreLocator.js

import React from 'react';
import './StoreLocator.css'; // Import the CSS styles

export default function StoreLocator() {
  return (
    <div className="store-locator">
      <div className="store-info">
        <h2>Our Store</h2>
        <p>Shop 21, Mina Zayed, Abu Dhabi, UAE.</p>
        <p>+971 522330399</p>
        <p>+971 502369764</p>
        <p>treesherbsandmore@gmail.com</p>
        <p>https://treesherbs.com/</p>
        <a 
          href="https://www.google.com/maps/dir/?api=1&destination=24.517125,54.374292" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="get-directions"
        >
          GET DIRECTIONS
        </a>
      </div>
      <iframe
        title="Store Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3630.085485612088!2d54.37092329716965!3d24.517124198189947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e675698dbeaa7%3A0xdafa40a10b2a3be!2sTrees%20Herbs%20and%20more!5e0!3m2!1sen!2sin!4v1733464692324!5m2!1sen!2sin"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
}
