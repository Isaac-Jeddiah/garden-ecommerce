import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteOrder, adminOrders as adminOrdersAction, updateOrder } from '../../actions/orderActions';
import { clearError, clearOrderDeleted } from '../../slices/orderSlice';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import { motion } from 'framer-motion';
import { FiEdit, FiTrash2, FiRefreshCcw } from 'react-icons/fi';
import axios from 'axios';
// import { MDBDataTable} from 'mdbreact';
// import { Button } from 'react-bootstrap';
const OrderList = () => {
//   const { orders = [], loading = true, error, isOrderDeleted } = useSelector((state) => state.orderState);
const [refunding, setRefunding] = useState({});
//   const dispatch = useDispatch();
const { adminOrders = [], loading = true, error, isOrderDeleted }  = useSelector(state => state.orderState)
    const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast(error, { position: toast.POSITION.BOTTOM_CENTER, type: 'error', onOpen: () => dispatch(clearError()) });
      return;
    }
    if (isOrderDeleted) {
      toast('Order deleted successfully', {
        type: 'success',
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearOrderDeleted()),
      });
    }
    dispatch(adminOrdersAction);
  }, [dispatch, error, isOrderDeleted]);

  const deleteHandler = (id) => {
    dispatch(deleteOrder(id));
  };
  
  const refundHandler = async (order) => {
    setRefunding({ ...refunding, [order._id]: true });
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const { data } = await axios.post('/api/v1/payment/refund', { paymentIntentId: order.paymentInfo.id }, config);
      if (data.success) {
        toast('Refund processed successfully', {
          type: 'success',
          position: toast.POSITION.BOTTOM_CENTER
        });
        // Update order status to 'Refunded'
        
        dispatch(updateOrder(order._id, { status: 'Refunded' }));
        dispatch(adminOrdersAction);
      }
    } catch (error) {
      toast(error.response?.data?.message || 'Refund failed', {
        type: 'error',
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
    setRefunding({ ...refunding, [order._id]: false });
    //add function to et staus of payment to refunded
//await order.paymentInfo.status = 'Refunded';

  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10 bg-green-50 ml-64">
        <h1 className="text-3xl font-bold mb-8 text-green-800">Order List</h1>
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
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {adminOrders.map((order) => (
                <motion.tr
                  key={order._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order._id}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <ul>
                      {order.orderItems.map((item, index) => (
                        <li key={index}>{item.name} (x{item.quantity})</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.totalPrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-800' : 
                      order.orderStatus === 'Refunded' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/admin/order/${order._id}`}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <FiEdit className="inline-block mr-1" />
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteHandler(order._id)}
                      className="text-red-600 hover:text-red-900 mr-4"
                    >
                      <FiTrash2 className="inline-block mr-1" />
                      Delete
                    </button>
                    {order.paymentInfo && order.orderStatus !== 'Refunded' &&(
                      <button
                        onClick={() => refundHandler(order)}
                        className="text-yellow-600 hover:text-yellow-900"
                        disabled={refunding[order._id]}
                      >
                        <FiRefreshCcw className="inline-block mr-1" />
                        {refunding[order._id] ? 'Refunding...' : 'Refund'}
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderList;

