import React, { useState } from 'react';
import { Leaf, Search, ShoppingCart, User, Menu, X, Home, ShoppingBag, ClipboardList, Info } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { SearchBar } from './SearchBar';
import { CartButton } from './CartButton'; // Make sure to import CartButton
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Image } from 'react-bootstrap';
import { logout } from '../../actions/userActions';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { items: cartItems } = useSelector((state) => state.cartState);

  const handleAboutClick = () => {
    navigate('/about');
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="w-full">
      {/* Announcement Bar */}
      <div
        style={{ backgroundColor: '#ffffff', color: '#166534' }}
        className="text-center py-2 text-sm"
      >
        Free Shipping on Orders Over $75 | Same Day Delivery Available
      </div>

      {/* Main Header */}
      <div className="bg-[#166534] text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6" />
              <span className="text-xl font-semibold hidden sm:inline">PlantHub</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 bg-transparent">
              <a href="/" className="text-white hover:text-white/80 transition-colors flex items-center gap-2">
                <Home size={20} />
                Home
              </a>
              <a
                onClick={() => navigate('/shop')}
                className="text-white hover:text-white/80 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <ShoppingBag size={20} />
                Shop
              </a>
              <a href="/orders" className="text-white hover:text-white/80 transition-colors flex items-center gap-2">
                <ClipboardList size={20} />
                Orders
              </a>
              <a onClick={handleAboutClick} className="text-white hover:text-white/80 transition-colors flex items-center gap-2 cursor-pointer">
                <Info size={20} />
                About
              </a>
              <a href="/contact" className="text-white hover:text-white/80 transition-colors flex items-center gap-2">
                Contact
              </a>
            </nav>

            {/* Search Bar */}
            <SearchBar />

            {/* User Actions */}
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <Dropdown className="d-inline">
                  <Dropdown.Toggle variant="default text-white pr-5" id="dropdown-basic">

                    <span>{user.name}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {user.role === 'admin' && (
                      <Dropdown.Item
                        onClick={() => navigate('/admin/dashboard')}
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
                    <Dropdown.Item onClick={logoutHandler} className="text-danger">
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <button
                  className="hover:text-white/80 transition-colors hidden sm:block"
                  onClick={() => navigate('/login')}
                >
                  <User size={24} />
                </button>
              )}
              <button
                className="relative"
                onClick={() => navigate('/cart')}
              >
                <CartButton itemCount={cartItems.length} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}
