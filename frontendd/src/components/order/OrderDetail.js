import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Loader from '../layouts/Loader';
import { orderDetail as orderDetailAction,cancelOrder } from '../../actions/orderActions';

export default function OrderDetail() {
    //console.log('OrderDetail');
    const { orderDetail, loading } = useSelector(state => state.orderState)
    const { shippingInfo = {}, user = {}, orderStatus = "Processing", orderItems = [], totalPrice = 0, paymentInfo = {} } = orderDetail;
     const isPaid = paymentInfo && paymentInfo.status === "succeeded" ? true : false;
    // const paymentsta=paymentInfo.status;
    
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(orderDetailAction(id))
    }, [id])


    const handleCancelOrder = () => {
        dispatch(cancelOrder(id));
    };
    return (
        <Fragment>
            {loading ? <Loader /> :
                <motion.div 
                    className="container mx-auto px-4 py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.h1 
                        className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200"
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Order ID - {orderDetail._id}
                    </motion.h1>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                        <h4 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Shipping Info</h4>
                        <p className="mb-2"><span className="font-semibold">Name:</span> {user.name}</p>
                        <p className="mb-2"><span className="font-semibold">Phone:</span> {shippingInfo.phoneNo}</p>
                        <p className="mb-4"><span className="font-semibold">Address:</span> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.state}, ${shippingInfo.country}`}</p>
                        <p className="mb-2"><span className="font-semibold">Amount:</span> ${totalPrice}</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                        <h4 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Payment</h4>
                        {/* <p className={`font-semibold ${isPaid ? 'text-green-500' : 'text-red-500'}`}>
                            {isPaid ? 'PAID' : 'NOT PAID'}
                        </p> */}
                        <p className={`font-semibold ${isPaid ? 'text-green-500' : 'text-red-500'}`}>
                            {paymentInfo.status}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                        <h4 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Order Status:</h4>
                        <p className={`font-semibold ${orderStatus && orderStatus.includes('Delivered') ? 'text-green-500' : 'text-yellow-500'}`}>
                            {orderStatus}
                        </p>
                    </div>
{/*  cancel order button*/ }


{ orderStatus !== 'Cancelled' && orderStatus !== 'Delivered' && (
    <button onClick={handleCancelOrder} className="btn btn-danger">Cancel Order</button>
)}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h4 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Order Items:</h4>
                        {orderItems && orderItems.map(item => (
                            <motion.div 
                                key={item.product}
                                className="flex items-center border-b border-gray-200 dark:border-gray-700 py-4 last:border-b-0"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                <div className="ml-4 flex-grow">
                                    <Link to={`/product/${item.product}`} className="text-blue-500 hover:underline">{item.name}</Link>
                                    <p className="text-gray-600 dark:text-gray-400">{item.quantity} x ${item.price} = <span className="font-semibold">${(item.quantity * item.price).toFixed(2)}</span></p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            }
        </Fragment>
    )
}

