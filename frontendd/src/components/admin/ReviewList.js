import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview, getReviews } from '../../actions/productActions';
import { clearError, clearReviewDeleted } from '../../slices/productSlice';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import { motion } from 'framer-motion';
import { FiTrash2 } from 'react-icons/fi';

const ReviewList = () => {
  const { reviews = [], loading = true, error, isReviewDeleted } = useSelector((state) => state.productState);
  //const [productId, setProductId] = useState(''); // Removed productId state
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast(error, { position: toast.POSITION.BOTTOM_CENTER, type: 'error', onOpen: () => dispatch(clearError()) });
      return;
    }
    if (isReviewDeleted) {
      toast('Review deleted successfully', {
        type: 'success',
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearReviewDeleted()),
      });
    }
    dispatch(getReviews()); // Modified to fetch all reviews
  }, [dispatch, error, isReviewDeleted]);

  // Removed submitHandler function

  const deleteHandler = (reviewId) => {
    dispatch(deleteReview(reviewId)); // Updated deleteHandler
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10 bg-green-50 ml-64">
        <h1 className="text-3xl font-bold mb-8 text-green-800">Review List</h1>
        {/* Removed the form */}
        {reviews.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Review ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th> {/* Added Product column */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reviews.map((review) => (
                  <motion.tr
                    key={review._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{review._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{review.rating}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{review.comment}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{review.user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{review.product.name}</td> {/* Added product name */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => deleteHandler(review._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 className="inline-block mr-1" />
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        ) : (
          <p className="text-center text-gray-500 mt-4">No reviews found.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewList;

