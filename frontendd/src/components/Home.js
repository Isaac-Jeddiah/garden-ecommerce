import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { getProducts } from "../actions/productActions";
import Loader from "./layouts/Loader";
import MetaData from "./layouts/MetaData";
import Product from "./product/Product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import AboutSection from "./AboutSection"; // Import the AboutSection
import Contact from './Contact/Contact';
import HeroSection from './HeroSection/HeroSection'; // Import the HeroSection
import Achievements from './Achievements'; // Import Achievements
import Testimonials from './Testimonials'; // Import Testimonials
import PlantShop from './PlantShop'; // Import PlantShop
import 'animate.css';
import StoreLocator from '../components/StoreLocator';
import './StoreLocator.css'; // Import the CSS file

export default function Home() {
    const dispatch = useDispatch();
    const { products, loading, error, productsCount, resPerPage } = useSelector(
        (state) => state.productsState
    );
    const [currentPage, setCurrentPage] = useState(1);

    const setCurrentPageNo = (pageNo) => {
        setCurrentPage(pageNo);
    };

    useEffect(() => {
        if (error) {
            return toast.error(error, {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
        dispatch(getProducts(null, null, null, null, currentPage));
    }, [error, dispatch, currentPage]);

    return (
        <Routes>
            {/* Route for the Home page */}
            <Route
                path="/"
                element={
                    <Fragment>
                        {loading ? (
                            <Loader />
                        ) : (
                            <Fragment>
                                <MetaData title={"Buy Best Products"} />
                                <HeroSection /> {/* Add HeroSection here */}
                               
                                <h1 id="products_heading" className="animate__animated animate__fadeInRight text-center">Latest Products</h1>
                                <section id="products" className="container mt-5">
                                    <div className="row">
                                        {products &&
                                            products.map((product) => (
                                                <Product
                                                    col={3}
                                                    key={product._id}
                                                    product={product}
                                                />
                                            ))}
                                    </div>
                                </section>
                                {productsCount > 0 && productsCount > resPerPage ? (
                                    <div className="d-flex justify-content-center mt-5">
                                        <Pagination
                                            activePage={currentPage}
                                            onChange={setCurrentPageNo}
                                            totalItemsCount={productsCount}
                                            itemsCountPerPage={resPerPage}
                                            nextPageText={"Next"}
                                            firstPageText={"First"}
                                            lastPageText={"Last"}
                                            itemClass={"page-item"}
                                            linkClass={"page-link"}
                                        />
                                    </div>
                                ) : null}
                                 <Achievements /> {/* Add Achievements here */}
                                 <PlantShop /> {/* Add PlantShop here */}
                                 <Testimonials /> {/* Add Testimonials here */}
                                <AboutSection /> {/* Add AboutSection here */}
                                <StoreLocator /> {/* Add StoreLocator here */}
                            </Fragment>
                        )}
                    </Fragment>
                }
            />

            {/* Route for the Contact page */}
            <Route path="/contact" element={<Contact />} />
        </Routes>
    );
}
