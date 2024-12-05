import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiBox, FiShoppingCart, FiUsers, FiStar } from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: FiHome, text: 'Dashboard', path: '/admin/dashboard' },
    { icon: FiBox, text: 'Products', path: '/admin/products' },
    { icon: FiShoppingCart, text: 'Orders', path: '/admin/orders' },
    { icon: FiUsers, text: 'Users', path: '/admin/users' },
    { icon: FiStar, text: 'Reviews', path: '/admin/reviews' },
  ];

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="bg-green-100 text-green-800 h-screen w-64 fixed left-0 top-0 overflow-y-auto"
      style={{ zIndex: 1000 }}
    >
      <div className="p-5">
        <h2 className="text-2xl font-bold mb-5">Admin Panel</h2>
        <nav>
          {menuItems.map((item, index) => (
            <Link key={index} to={item.path}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center p-3 mb-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-green-200 text-green-900'
                    : 'text-green-700 hover:bg-green-200 hover:text-green-900'
                }`}
              >
                <item.icon className="mr-3" />
                {item.text}
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;

