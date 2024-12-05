import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { decreaseCartItemQty, increaseCartItemQty, removeItemFromCart } from '../../slices/cartSlice';
import { motion } from 'framer-motion';

export default function Cart() {
    const { items } = useSelector(state => state.cartState)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const increaseQty = (item) => {
        const count = item.quantity;
        if (item.stock == 0 || count >= item.stock) return;
        dispatch(increaseCartItemQty(item.product))
    }
    const decreaseQty = (item) => {
        const count = item.quantity;
        if (count == 1) return;
        dispatch(decreaseCartItemQty(item.product))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')
    }

    return (
        <Fragment>
            {items.length == 0 ?
                <motion.h2
                    className="mt-5 text-center text-2xl font-semibold text-gray-700 dark:text-gray-300"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Your Cart is Empty
                </motion.h2> :
                <Fragment>
                    <motion.h2
                        className="mt-5 text-center text-2xl font-semibold text-gray-700 dark:text-gray-300"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Your Cart: <b>{items.length} items</b>
                    </motion.h2>
                    <div className="container mx-auto mt-8">
                        <div className="flex flex-col md:flex-row justify-between">
                            <div className="w-full md:w-8/12">
                                {items.map(item => (
                                    <motion.div
                                        key={item.product}
                                        className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className="flex w-2/5">
                                            <div className="w-20">
                                                <img className="h-24" src={item.image} alt={item.name} />
                                            </div>
                                            <div className="flex flex-col justify-between ml-4 flex-grow">
                                                <span className="font-bold text-sm">{item.name}</span>
                                                <Link to={`/product/${item.product}`} className="text-red-500 text-xs">Remove</Link>
                                            </div>
                                        </div>
                                        <div className="flex justify-center w-1/5">
                                            <button onClick={() => decreaseQty(item)}>
                                                <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                                </svg>
                                            </button>
                                            <input className="mx-2 border text-center w-8" type="text" value={item.quantity} readOnly />
                                            <button onClick={() => increaseQty(item)}>
                                                <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                                                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                                </svg>
                                            </button>
                                        </div>
                                        <span className="text-center w-1/5 font-semibold text-sm">${item.price}</span>
                                        <span className="text-center w-1/5 font-semibold text-sm">${item.price * item.quantity}</span>
                                    </motion.div>
                                ))}
                            </div>
                            <motion.div
                                className="w-full md:w-4/12 px-8 py-10"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                                <div className="flex justify-between mt-10 mb-5">
                                    <span className="font-semibold text-sm uppercase">Items {items.reduce((acc, item) => (acc + item.quantity), 0)}</span>
                                    <span className="font-semibold text-sm">${items.reduce((acc, item) => (acc + item.quantity * item.price), 0)}</span>
                                </div>
                                <div className="border-t mt-8">
                                    <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                        <span>Total cost</span>
                                        <span>${items.reduce((acc, item) => (acc + item.quantity * item.price), 0)}</span>
                                    </div>
                                    <button
                                        className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                                        onClick={checkoutHandler}
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

