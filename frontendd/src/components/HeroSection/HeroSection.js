import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './HeroSection.module.css';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80",
    title: "Transform Your Space with Nature's Beauty",
    description: "Discover our curated collection of indoor and outdoor plants, premium pots, and expert gardening supplies."
  },
  {
    image: "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80",
    title: "Create Your Own Indoor Paradise",
    description: "Explore our selection of exotic indoor plants and create a stunning green sanctuary in your home."
  },
  {
    image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxpaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80",
    title: "Expert Care for Every Plant",
    description: "Get professional advice and premium supplies to help your plants thrive in any environment."
  }
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const navigate = useNavigate(); // Initialize useNavigate

  const changeSlide = useCallback((index) => {
    if (isAnimating || index === currentSlide) return; // Prevent changing to the same slide or while animating
    setIsAnimating(true);
    setPrevSlide(currentSlide);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 800); // Allow animation to complete
  }, [currentSlide, isAnimating]);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextSlide = (currentSlide + 1) % slides.length; // Cycle through slides
      changeSlide(nextSlide);
    }, 5000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [currentSlide, changeSlide]);

  return (
    <section className={styles.heroSection}>
      <div className={styles.slider}>
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`${styles.slide} ${
              index === currentSlide ? styles.activeSlide : 
              index === prevSlide ? styles.exitingSlide : ''
            }`}
          >
            <div 
              className={styles.backgroundImage}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className={styles.overlay} />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.content}>
        <div className={`${styles.contentWrapper} ${styles.contentActive}`}>
          <h1 className={styles.title}>
            {slides[currentSlide].title}
          </h1>
          <p className={styles.description}>
            {slides[currentSlide].description}
          </p>
          <div className={styles.buttonGroup}>
            <button 
              className={styles.primaryButton} 
              onClick={() => navigate('/shop')} // Navigate to shop page
            >
              Shop Now
              <ArrowRight className={styles.arrowIcon} />
            </button>
            <button 
              className={styles.secondaryButton} 
              onClick={() => navigate('/contact')} // Navigate to contact page
            >
              Get Expert Advice
            </button>
          </div>
        </div>
      </div>

      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
            onClick={() => changeSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            disabled={isAnimating}
          />
        ))}
      </div>
    </section>
  );
}
export default HeroSection; // Ensure to export the component as default
