import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { Logo } from './Logo'; // Ensure the path is correct
import { SocialLinks } from './SocialLinks'; // Ensure the path is correct
import { Phone, Mail } from 'lucide-react'; // Ensure lucide-react is installed

export default function Footer() {
  const navigate = useNavigate(); // Initialize navigate for navigation

  return (
    <footer className="bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Logo />
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Your one-stop solution for all your shopping needs.
          </p>
          <SocialLinks />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-800">Got Questions? Connect Us</h3>
            <div className="flex items-center gap-2 text-emerald-500">
              <Phone size={20} />
              <a href="tel:+0522330399" className="hover:text-emerald-600 transition-colors">
                +052 2330399
              </a>
              
            </div>
            <div className="flex items-center gap-2 text-emerald-500">
              <Mail size={20} />
              <a href="mailto:treesherbsandmore@gmail.com" className="hover:text-emerald-600 transition-colors">
                Treesherbsandmore@gmail.com
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-800">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="text-gray-600 hover:text-emerald-500 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-500">
                  FAQ
                </a>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')} // Navigate to contact page
                  className="text-gray-600 hover:text-emerald-500 transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-800">My Account</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('/login')} // Navigate to login page
                  className="text-gray-600 hover:text-emerald-500 transition-colors"
                >
                  Sign In
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/cart')} // Navigate to cart page
                  className="text-gray-600 hover:text-emerald-500 transition-colors"
                >
                  View Cart
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/orders')} // Navigate to orders page
                  className="text-gray-600 hover:text-emerald-500 transition-colors"
                >
                  Track My Order
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-800">Follow Us</h3>
            <SocialLinks />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            Trees Herbs & More Flowers - 2024-2025, All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
