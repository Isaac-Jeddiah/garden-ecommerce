import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useInView } from "react-intersection-observer";

const testimonials = [
  {
    id: 1,
    heading: "Heading Goes Here...",
    content: "So I set out to create something that will allow me and millions of other businesses, entrepreneurs and marketers that I knew were struggling with the same thing to create effective, cheap and the partes ese traffic producing, attention-grabbing and profit producing ads, fast",
    author: "Jack Hardacre",
    role: "Developer of Company",
    rating: 5
  },
  {
    id: 2,
    heading: "Heading Goes Here...",
    content: "So I set out to create something that will allow me and millions of other businesses, entrepreneurs and marketers that I knew were struggling with the same thing to create effective, cheap and the partes ese traffic producing, attention-grabbing and profit producing ads, fast",
    author: "Jack Hardacre",
    role: "Developer of Company",
    rating: 5
  },
  {
    id: 3,
    heading: "Heading Goes Here...",
    content: "So I set out to create something that will allow me and millions of other businesses, entrepreneurs and marketers that I knew were struggling with the same thing to create effective, cheap and the partes ese traffic producing, attention-grabbing and profit producing ads, fast",
    author: "Jack Hardacre",
    role: "Developer of Company",
    rating: 5
  },
  {
    id: 4,
    heading: "Great Experience",
    content: "The product exceeded my expectations. It's user-friendly, efficient, and has significantly improved our workflow. I highly recommend it to anyone looking to streamline their processes and boost productivity.",
    author: "Emma Thompson",
    role: "Marketing Director",
    rating: 5
  },
  {
    id: 5,
    heading: "Game Changer",
    content: "This solution has been a game changer for our business. It's intuitive, powerful, and has helped us achieve results we never thought possible. The support team is also incredibly responsive and helpful.",
    author: "Michael Chen",
    role: "CEO of TechStart",
    rating: 5
  },
  {
    id: 6,
    heading: "Impressive Results",
    content: "We've seen impressive results since implementing this product. It's easy to use, highly customizable, and has significantly improved our team's efficiency. I wouldn't hesitate to recommend it to others in the industry.",
    author: "Sarah Johnson",
    role: "Operations Manager",
    rating: 5
  },
];

export default function Testimonials() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonialsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  useEffect(() => {
    if (!isPaused && inView) {
      const interval = setInterval(nextPage, 5000); // Change slide every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isPaused, inView, nextPage]);

  const currentTestimonials = testimonials.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage
  );

  return (
    <div className="bg-[#003443] min-h-screen flex items-center justify-center py-20">
      <motion.div 
        ref={ref}
        className="max-w-7xl mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="uppercase tracking-wider text-sm font-medium text-white mb-4">
          TESTIMONIALS
        </h2>
        <h3 className="text-white text-4xl font-bold mb-16">
          Our Clients Say
        </h3>

        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            onClick={prevPage}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 bg-white/10 hover:bg-white/20 transition-colors rounded-full p-2 text-white z-10"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {currentTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-${currentPage}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="bg-white rounded-lg p-8 shadow-lg relative h-full flex flex-col">
                    <div className="absolute w-4 h-4 bg-white rotate-45 -bottom-2 left-1/2 -translate-x-1/2" />
                    <h4 className="text-[#003443] text-xl font-semibold mb-4">
                      {testimonial.heading}
                    </h4>
                    <p className="text-gray-600 mb-6 flex-grow">
                      {testimonial.content}
                    </p>
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-emerald-500 text-emerald-500" />
                      ))}
                    </div>
                    <div className="text-[#003443] font-semibold text-lg">
                      {testimonial.author}
                    </div>
                    <div className="text-emerald-500 font-medium">
                      {testimonial.role}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <button
            onClick={nextPage}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 bg-white/10 hover:bg-white/20 transition-colors rounded-full p-2 text-white z-10"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentPage ? "bg-emerald-500" : "bg-white/20"
                }`}
                aria-label={`Go to testimonial page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
