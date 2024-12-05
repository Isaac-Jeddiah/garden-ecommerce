import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { logout } from '../../actions/userActions';
import Search from './Search';
import { motion } from 'framer-motion';

export default function Header() {
  const { isAuthenticated, user } = useSelector(state => state.authState);
  const { items: cartItems } = useSelector(state => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedTheme);
    if (savedTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
    localStorage.setItem('darkMode', (!isDarkMode).toString());
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-gradient-to-r from-green-600 to-green-400 text-white shadow-md dark:from-gray-800 dark:to-gray-700 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <motion.img
              width="50"
              height="50"
              alt="PlantStore Logo"
              src="/images/logo.png"
              className="mr-2"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
            <span className="text-xl font-bold">PlantStore</span>
          </Link>
          <div className="flex-grow mx-4">
            <Search />
          </div>
          <nav className="flex items-center">
            <Link to="/" className="mx-2 hover:text-green-200 transition duration-300">Home</Link>
            <Link to="/products" className="mx-2 hover:text-green-200 transition duration-300">Products</Link>
            <Link to="/gallery" className="mx-2 hover:text-green-200 transition duration-300">Gallery</Link>
            <Link to="/blogs" className="mx-2 hover:text-green-200 transition duration-300">Blogs</Link>
            <Link to="/contact" className="mx-2 hover:text-green-200 transition duration-300">Contact</Link>
          
            <Link to="/cart" className="mx-2 flex items-center hover:text-green-200 transition duration-300">
              <i className="fa fa-shopping-cart mr-1"></i>
              Cart
              <motion.span
                className="ml-1 bg-white text-green-600 rounded-full px-2 py-1 text-xs font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 5 }}
              >
                {cartItems.length}
              </motion.span>
            </Link>
            {isAuthenticated ? (
              <Dropdown className="d-inline">
                <Dropdown.Toggle variant="default text-white pr-5" id="dropdown-basic">
                  <img
                    width="30"
                    height="30"
                    src={user.avatar ?? './images/default_avatar.png'}
                    alt="User Avatar"
                    className="rounded-full mr-2"
                  />
                  <span>{user.name}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {user.role === 'admin' && (
                    <Dropdown.Item
                      onClick={() => navigate('admin/dashboard')}
                      className="text-dark"
                    >
                      Dashboard
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item
                    onClick={() => navigate('/myprofile')}
                    className="text-dark"
                  >
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => navigate('/orders')}
                    className="text-dark"
                  >
                    Orders
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={logoutHandler}
                    className="text-danger"
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Link
                to="/login"
                className="mx-2 bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-100 transition duration-300"
              >
                Login
              </Link>
            )}
            <motion.button
              onClick={toggleDarkMode}
              className="ml-4 focus:outline-none bg-white text-green-600 p-2 rounded-full hover:bg-green-100 transition duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
            </motion.button>
          </nav>
        </div>
      </div>
      <div className="bg-green-700 dark:bg-gray-900 py-2">
        <div className="container mx-auto px-4">
          <nav className="flex justify-around">
            <Link
              to="/category/indoor-plants"
              className="text-white hover:text-green-200 transition duration-300"
            >
              Indoor Plants
            </Link>
            <Link
              to="/category/outdoor-plants"
              className="text-white hover:text-green-200 transition duration-300"
            >
              Outdoor Plants
            </Link>
            <Link
              to="/category/succulents"
              className="text-white hover:text-green-200 transition duration-300"
            >
              Succulents
            </Link>
            <Link
              to="/category/plant-care"
              className="text-white hover:text-green-200 transition duration-300"
            >
              Plant Care
            </Link>
            <Link
              to="/category/pots-planters"
              className="text-white hover:text-green-200 transition duration-300"
            >
              Pots & Planters
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
