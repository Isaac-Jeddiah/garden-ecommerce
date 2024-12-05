import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Search() {
    const [keyword, setKeyword] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
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

    return (
        <div className="relative">
            <form onSubmit={searchHandler} className="flex items-center">
                <input
                    type="text"
                    id="search_field"
                    className="w-full p-2 rounded-l-md border-2 border-green-500 focus:outline-none focus:border-green-600"
                    placeholder="Search products..."
                    onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                />
                <button type="submit" className="bg-green-500 text-white p-2 rounded-r-md hover:bg-green-600 transition duration-300">
                    <i className="fa fa-search"></i>
                </button>
            </form>
            {suggestions.length > 0 && (
                <div ref={suggestionsRef} className="absolute z-10 bg-white border border-gray-300 mt-1 w-full rounded-md shadow-lg">
                    {suggestions.map((product) => (
                        <div
                            key={product._id}
                            className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                            onClick={() => handleSuggestionClick(product._id)}
                        >
                            <img src={product.images[0].url} alt={product.name} className="w-10 h-10 object-cover mr-2 rounded-md" />
                            <span>{product.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
