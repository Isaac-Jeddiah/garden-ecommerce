import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (keyword.length > 2) {
        try {
          const { data } = await axios.get(`/api/v1/products?keyword=${keyword}&limit=5`);
          setSuggestions(data.products);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      } else {
        setSuggestions([]);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [keyword]);

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  const handleSuggestionClick = (productId) => {
    navigate(`/product/${productId}`);
    setKeyword('');
    setSuggestions([]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      setKeyword('');
    }
  }, [location.pathname]);

  return (
    <div className="relative hidden md:flex items-center flex-1 max-w-xl mx-8">
      <form onSubmit={searchHandler} className="w-full">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search plants, pots, tools..."
            className="w-full py-2 px-4 pr-10 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>
      {suggestions.length > 0 && (
        <div ref={suggestionsRef} className="absolute z-10 bg-white text-black border border-gray-300 mt-1 w-full rounded-md shadow-lg top-full">
          {suggestions.map((product) => (
            <div
              key={product._id}
              className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => handleSuggestionClick(product._id)}
            >
              {/* <img src={product.images[0].url} alt={product.name} className="w-10 h-10 object-cover mr-2 rounded-md" />
              */}<span>{product.name}</span> 
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

