import { Fragment, useEffect } from 'react'
import { motion } from 'framer-motion';
import MetaData from '../layouts/MetaData';
import { MDBDataTable } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux';
import { userOrders as userOrdersAction } from '../../actions/orderActions';
import { Link } from 'react-router-dom';

export default function UserOrders() {
    const { userOrders = [] } = useSelector(state => state.orderState)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userOrdersAction)
    }, [dispatch])

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: "Order ID",
                    field: 'id',
                    sort: "asc"
                },
                {
                    label: "Number of Items",
                    field: 'numOfItems',
                    sort: "asc"
                },
                {
                    label: "Amount",
                    field: 'amount',
                    sort: "asc"
                },
                {
                    label: "Status",
                    field: 'status',
                    sort: "asc"
                },
                {
                    label: "Actions",
                    field: 'actions',
                    sort: "asc"
                }
            ],
            rows: []
        }

        userOrders.forEach(userOrder => {
            data.rows.push({
                id: userOrder._id,
                numOfItems: userOrder.orderItems.length,
                amount: `$${userOrder.totalPrice}`,
                status: userOrder.orderStatus && userOrder.orderStatus.includes('Delivered') ?
                    (<span className="text-green-500">{userOrder.orderStatus}</span>) :
                    (<span className="text-red-500">{userOrder.orderStatus}</span>),
                actions: <Link to={`/order/${userOrder._id}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    <i className='fa fa-eye'></i> View
                </Link>
            })
        })

        return data;
    }

    return (
        <Fragment>
            <MetaData title="My Orders" />
            <motion.div 
                className="container mx-auto px-4 py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">My Orders</h1>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <MDBDataTable
                        data={setOrders()}
                        className="border-collapse w-full"
                        bordered
                        striped
                        hover
                    />
                </div>
            </motion.div>
        </Fragment>
    )
}

