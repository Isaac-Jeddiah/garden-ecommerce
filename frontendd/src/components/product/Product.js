import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Product({ product }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
        >
            <Link to={`/product/${product._id}`}>
                <img
                    className="w-full h-48 object-cover"
                    src={product.images[0]?.image}
                    alt={product.name}
                />
            </Link>
            <div className="p-4">
                <Link to={`/product/${product._id}`} className="block">
                    <h2 className="text-lg font-semibold text-green-700 dark:text-green-500 mb-2 hover:text-green-600 transition duration-300">{product.name}</h2>
                </Link>
                <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, index) => (
                            <i key={index} className={`fas fa-star ${index < Math.floor(product.ratings) ? '' : 'text-gray-300'}`}></i>
                        ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">({product.numOfReviews} Reviews)</span>
                </div>
                <p className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">${product.price}</p>
                <Link
                    to={`/product/${product._id}`}
                    className="block w-full text-center bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
                >
                    View Details
                </Link>
            </div>
        </motion.div>
    )
}

