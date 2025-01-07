import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const team = [
  { name: 'Sarah Johnson', role: 'Founder & Plant Expert', image: 'https://.../image1.jpg' },
  { name: 'Michael Chen', role: 'Head of Horticulture', image: 'https://.../image2.jpg' },
  { name: 'Emma Williams', role: 'Plant Care Specialist', image: 'https://.../image3.jpg' },
];

export const Team = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-center text-gray-800 mb-12"
        >
          Meet Our Team
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={member.image}
                alt={member.name}
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
