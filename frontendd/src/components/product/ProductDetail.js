import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { createReview, getProduct } from "../../actions/productActions"
import Loader from '../layouts/Loader';
import { Carousel } from 'react-bootstrap';
import MetaData from "../layouts/MetaData";
import { addCartItem } from "../../actions/cartActions";
import { clearReviewSubmitted, clearError, clearProduct } from '../../slices/productSlice';
import { Modal } from 'react-bootstrap';
import { toast } from "react-toastify";
import ProductReview from "./ProductReview";
import { motion } from 'framer-motion';

export default function ProductDetail() {
    const { loading, product = {}, isReviewSubmitted, error } = useSelector((state) => state.productState);
    const { user } = useSelector(state => state.authState);
    const dispatch = useDispatch();
    const { id } = useParams()
    const [quantity, setQuantity] = useState(1);
    const [show, setShow] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQty = () => {
        const count = document.querySelector('.count')
        if (product.stock == 0 || count.valueAsNumber >= product.stock) return;
        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
    }
    const decreaseQty = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber == 1) return;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const reviewHandler = () => {
        const formData = new FormData();
        formData.append('rating', rating);
        formData.append('comment', comment);
        formData.append('productId', id);
        dispatch(createReview(formData))
    }

    useEffect(() => {
        if (isReviewSubmitted) {
            handleClose()
            toast('Review Submitted successfully', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearReviewSubmitted())
            })
        }
        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            })
            return
        }
        if (!product._id || isReviewSubmitted) {
            dispatch(getProduct(id))
        }

        return () => {
            dispatch(clearProduct())
        }
    }, [dispatch, id, isReviewSubmitted, error])

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="container mx-auto px-4 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="product-images"
                            >
                                <Carousel pause="hover" className="bg-white rounded-lg shadow-lg overflow-hidden">
                                    {product.images && product.images.length > 0 && product.images.map(image =>
                                        <Carousel.Item key={image._id}>
                                            <img className="d-block w-100" src={image.image} alt={product.name} />
                                        </Carousel.Item>
                                    )}
                                </Carousel>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="product-info bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
                            >
                                <h1 className="text-3xl font-bold text-green-700 dark:text-green-500 mb-4">{product.name}</h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Product # {product._id}</p>
                                <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="mt-8"
                            >
                                <div className="rating-outer">
                        <div className="rating-inner" style={{width: `${product.ratings/ 5 * 100}%` }}></div>
                    </div>
                               
                                    <div>
                                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">({product.numOfReviews} Reviews)</span>
                                </div>
</motion.div>
                                <h3 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">${product.price}</h3>

                                <div className="flex items-center mb-4">
                                    <button className="bg-gray-200 text-gray-700 px-3 py-2 rounded-l-md hover:bg-gray-300 transition duration-300" onClick={decreaseQty}>-</button>
                                    <input type="number" className="count appearance-none w-16 text-center bg-gray-100 border-t border-b border-gray-300 py-2" value={quantity} readOnly />
                                    <button className="bg-gray-200 text-gray-700 px-3 py-2 rounded-r-md hover:bg-gray-300 transition duration-300" onClick={increaseQty}>+</button>
                                    <button
                                        type="button"
                                        id="cart_btn"
                                        disabled={product.stock === 0}
                                        onClick={() => {
                                            dispatch(addCartItem(product._id, quantity))
                                            toast('Cart Item Added!', {
                                                type: 'success',
                                                position: toast.POSITION.BOTTOM_CENTER
                                            })
                                        }}
                                        className="ml-4 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Add to Cart
                                    </button>
                                </div>

                                <p className="mb-4">
                                    Status:
                                    <span className={product.stock > 0 ? 'text-green-600 ml-2' : 'text-red-600 ml-2'} id="stock_status">
                                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </p>

                                <h4 className="text-xl font-semibold mb-2">Description:</h4>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>

                                <p className="mb-4">
                                    Sold by: <strong>{product.seller}</strong>
                                </p>

                                {user ? (
                                    <button
                                        onClick={handleShow}
                                        id="review_btn"
                                        type="button"
                                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                                    >
                                        Submit Your Review
                                    </button>
                                ) : (
                                    <div className="alert alert-danger mt-5">Login to post your review.</div>
                                )}

                            </motion.div>
                        </div>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Submit Review</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ul className="stars">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <li
                                            key={star}
                                            className={`star ${star <= rating ? 'orange' : ''}`}
                                            onClick={() => setRating(star)}
                                            onMouseOver={(e) => e.currentTarget.classList.add('yellow')}
                                            onMouseOut={(e) => e.currentTarget.classList.remove('yellow')}
                                        >
                                            <i className="fa fa-star"></i>
                                        </li>
                                    ))}
                                </ul>

                                <textarea
                                    name="review"
                                    id="review"
                                    className="form-control mt-3"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>

                                <button
                                    aria-label="Close"
                                    className="btn my-3 float-right review-btn px-4 text-white"
                                    onClick={reviewHandler}
                                    disabled={loading}
                                >
                                    Submit
                                </button>
                            </Modal.Body>
                        </Modal>

                        {product.reviews && product.reviews.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="mt-8"
                            >
                                <ProductReview reviews={product.reviews} />
                            </motion.div>
                        )}
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

