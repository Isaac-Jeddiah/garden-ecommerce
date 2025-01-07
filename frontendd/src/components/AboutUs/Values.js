import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sprout, Heart, Leaf, Globe } from 'lucide-react';

const values = [
  { icon: Sprout, title: 'Sustainability', description: 'Eco-friendly practices.' },
  { icon: Heart, title: 'Quality Care', description: 'Personal care for plants.' },
  { icon: Leaf, title: 'Expert Knowledge', description: 'Best advice and support.' },
  { icon: Globe, title: 'Community', description: 'Passion for greenery.' },
];

export const Values = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="py-20 bg-green-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-center text-gray-800 mb-12"
        >
          Our Values
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <value.icon className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
