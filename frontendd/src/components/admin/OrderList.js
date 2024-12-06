

import { Fragment, useEffect, useState  } from "react"
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deleteOrder, adminOrders as adminOrdersAction,updateOrder } from "../../actions/orderActions"
import { clearError, clearOrderDeleted } from "../../slices/orderSlice"
import Loader from '../layouts/Loader';
import { MDBDataTable} from 'mdbreact';
import {toast } from 'react-toastify'
import Sidebar from "./Sidebar"

import { FiEdit, FiTrash2, FiRefreshCcw } from 'react-icons/fi';
import axios from 'axios';


export default function OrderList() {
    const { adminOrders = [], loading = true, error, isOrderDeleted }  = useSelector(state => state.orderState)

    const dispatch = useDispatch();
    //const { orders = [], loading = true, error, isOrderDeleted } = useSelector((state) => state.orderState);
    
    const [refunding, setRefunding] = useState({});
    

    const setOrders = () => {
        const data = {
            columns : [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Number of Items',
                    field: 'noOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows : []
        }

        adminOrders.forEach( order => {
            data.rows.push({
                id: order._id,
                noOfItems: order.orderItems.length,
                amount : `$${order.totalPrice}`,
                status: <p style={{color: order.orderStatus.includes('Processing') ? 'red' : 'green'}}>{order.orderStatus}</p> ,
                actions: (
                    <Fragment>
                        <Link to={`/admin/order/${order._id}`} className="btn btn-primary"> <i className="fa fa-pencil"></i></Link>
                        <Button onClick={e => deleteHandler(e, order._id)} className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </Button>
                        
                    {order.paymentInfo.id!=="COD" && order.paymentInfo.status !== 'Refunded' &&  order.orderStatus!=="Delivered" &&(
                      <button style={{ marginLeft: '10px' }}
                        onClick={() => refundHandler(order)}
                        className="text-yellow-600 hover:text-yellow-900"
                        disabled={refunding[order._id]}
                      >
                        <FiRefreshCcw className="inline-block mr-1" />
                        {refunding[order._id] ? 'Refunding...' : 'Refund'}
                      </button>
                    )}
                    </Fragment>
                )
            })
        })

        return data;
    }

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteOrder(id))
    }
    
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


    useEffect(() => {
        if(error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearError()) }
            })
            return
        }
        if(isOrderDeleted) {
            toast('Order Deleted Succesfully!',{
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearOrderDeleted())
            })
            return;
        }

        dispatch(adminOrdersAction)
    },[dispatch, error, isOrderDeleted])


    return (
        <div className="row">
        <div className="col-12 col-md-2">
                <Sidebar/>
        </div>
        <div className="col-12 col-md-10">
            <h1 className="my-4">Order List</h1>
            <Fragment>
                {loading ? <Loader/> : 
                    <MDBDataTable
                        data={setOrders()}
                        bordered
                        striped
                        hover
                        className="px-3"
                    />
                }
            </Fragment>
        </div>
    </div>
    )
}