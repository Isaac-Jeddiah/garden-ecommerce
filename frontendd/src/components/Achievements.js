import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users2, DollarSign, TreePalm, Star } from 'lucide-react';
import { useInView } from "react-intersection-observer";

function Counter({ end, suffix = "", duration = 2 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let startTime;
      let animationFrame;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);

        if (progress < 1) {
          setCount(Math.floor(end * progress));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="font-bold text-[2.5rem] text-[#1a237e]">
      {count}
      {suffix}
    </span>
  );
}

export default function Achievements() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center space-y-16">
        <div>
          <h2 className="text-center uppercase tracking-wider text-sm font-medium text-emerald-500 mb-4">
            OUR ACHIEVEMENTS
          </h2>
          <h3 className="text-[#1a237e] text-3xl md:text-4xl font-bold">5000+ Buyers Across the World</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-emerald-500/10 p-4 rounded-full">
              <Users2 className="w-8 h-8 text-emerald-500" />
            </div>
            <Counter end={25} suffix="k" />
            <p className="text-gray-600 font-medium">Happy Customer&apos;s</p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="bg-emerald-500/10 p-4 rounded-full">
              <DollarSign className="w-8 h-8 text-emerald-500" />
            </div>
            <Counter end={1800} suffix="+" />
            <p className="text-gray-600 font-medium">Monthly Selling Products</p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="bg-emerald-500/10 p-4 rounded-full">
              <TreePalm className="w-8 h-8 text-emerald-500" />
            </div>
            <Counter end={27} suffix="k+" />
            <p className="text-gray-600 font-medium">Total Plants</p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="bg-emerald-500/10 p-4 rounded-full">
              <Star className="w-8 h-8 text-emerald-500" />
            </div>
            <Counter end={4} />
            <p className="text-gray-600 font-medium">4,512 Total Ratings</p>
          </div>
        </div>

        <motion.div
          className="bg-gradient-to-br from-emerald-500 to-emerald-400 rounded-3xl p-12 text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-emerald-400 rounded-full translate-x-1/4 translate-y-1/4" />
          <div className="relative z-10 max-w-xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Happiness is Availing Great Offers</h3>
            <p className="mb-8 opacity-90">
              Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse gravida.
            </p>
            <motion.a
              href="tel:+180012451424" // Change to anchor tag for dialing
              className="bg-white text-emerald-600 px-6 py-3 rounded-full font-medium inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="inline-block w-6 h-6 bg-emerald-100 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-full h-full p-1"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </motion.span>
              Call Us
              <span className="font-normal">+1800-1245-1424</span>
            </motion.a>
          </div>
          <div className="absolute right-8 bottom-0">
            <motion.img
              src="https://png.pngtree.com/png-vector/20240207/ourmid/pngtree-indoor-plant-flowerpot-png-image_11669796.png"
              alt="Decorative plant"
              className="w-48 h-auto"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
