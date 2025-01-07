import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions"; 
import Loader from "./layouts/Loader";
import MetaData from "./layouts/MetaData";
import Product from "./product/Product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";

export default function ProductList() {
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
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={"All Products"} />
                    <h1 id="products_heading">Latest Products</h1>
                    <section id="products" className="container mt-5 products-grid">
                        {products &&
                            products.map((product) => (
                                <Product
                                    col={3}
                                    key={product._id}
                                    product={product}
                                />
                            ))}
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
                </Fragment>
            )}
        </Fragment>
    );
}