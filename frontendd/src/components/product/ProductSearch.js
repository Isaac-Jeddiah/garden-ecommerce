import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import Product from "./Product";
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import { motion } from 'framer-motion';

export default function ProductSearch() {
    const dispatch = useDispatch();
    const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState)
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 1000]);
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState(0);
    const [sort, setSort] = useState('');

    const { keyword } = useParams();
    const categories = [
        'Indoor Plants',
        'Outdoor Plants',
        'Succulents',
        'Plant Care',
        'Pots & Planters',
    ];

    const setCurrentPageNo = (pageNo) => {
        setCurrentPage(pageNo)
    }

    const resetFilters = () => {
        setPrice([1, 1000]);
        setCategory('');
        setRating(0);
        setSort('');
    }

    useEffect(() => {
        if (error) {
            return toast.error(error, {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
        dispatch(getProducts(keyword, price, category, rating, currentPage, sort))
    }, [error, dispatch, currentPage, keyword, price, category, rating, sort])

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={'Buy Best Plants & Plant Care Products'} />
                    <motion.h1 
                        className="text-3xl font-semibold text-center my-8 text-green-700 dark:text-green-500"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Search Products
                    </motion.h1>
                    <section className="container mx-auto mt-5">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <motion.div 
                                className="md:col-span-1"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold mb-4 text-green-700 dark:text-green-500">Filters</h3>
                                    <div className="mb-6">
                                        <h4 className="font-medium mb-2">Price Range</h4>
                                        <Slider
                                            range
                                            marks={{
                                                1: "$1",
                                                1000: "$1000"
                                            }}
                                            min={1}
                                            max={1000}
                                            defaultValue={price}
                                            onChange={(price) => setPrice(price)}
                                            handleRender={
                                                renderProps => {
                                                    return (
                                                        <Tooltip overlay={`$${renderProps.props['aria-valuenow']}`}>
                                                            <div {...renderProps.props}> </div>
                                                        </Tooltip>
                                                    )
                                                }
                                            }
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <h4 className="font-medium mb-2">Categories</h4>
                                        <select 
                                            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            <option value="">All Categories</option>
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-6">
                                        <h4 className="font-medium mb-2">Ratings</h4>
                                        <select 
                                            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                                            value={rating}
                                            onChange={(e) => setRating(Number(e.target.value))}
                                        >
                                            <option value="0">All Ratings</option>
                                            {[4, 3, 2, 1].map(star => (
                                                <option key={star} value={star}>{star}+ Stars</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-6">
                                        <h4 className="font-medium mb-2">Sort By</h4>
                                        <select 
                                            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                                            value={sort}
                                            onChange={(e) => setSort(e.target.value)}
                                        >
                                            <option value="">Relevance</option>
                                            <option value="price_asc">Price: Low to High</option>
                                            <option value="price_desc">Price: High to Low</option>
                                            <option value="ratings_desc">Highest Rated</option>
                                        </select>
                                    </div>
                                    <button 
                                        onClick={resetFilters}
                                        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            </motion.div>
                            <div className="md:col-span-3">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products && products.map(product => (
                                        <Product key={product._id} product={product} />
                                    ))}
                                </div>
                                {productsCount > 0 && productsCount > resPerPage ?
                                    <div className="flex justify-center mt-8">
                                        <Pagination
                                            activePage={currentPage}
                                            onChange={setCurrentPageNo}
                                            totalItemsCount={productsCount}
                                            itemsCountPerPage={resPerPage}
                                            nextPageText={'Next'}
                                            firstPageText={'First'}
                                            lastPageText={'Last'}
                                            itemClass={'inline-block mx-1'}
                                            linkClass={'px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300'}
                                        />
                                    </div> : null}
                            </div>
                        </div>
                    </section>
                </Fragment>
            }
        </Fragment>
    )
}
