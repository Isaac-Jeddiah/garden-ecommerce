import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { orderCompleted } from '../../slices/cartSlice';
import { validateShipping } from '../cart/Shipping';
import { createOrder } from '../../actions/orderActions';
import { clearError as clearOrderError } from '../../slices/orderSlice';

export default function CashOnDelivery() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    const { user } = useSelector((state) => state.authState);
    const { items: cartItems, shippingInfo } = useSelector((state) => state.cartState);
    const { error: orderError } = useSelector((state) => state.orderState);

    const order = {
        orderItems: cartItems,
        shippingInfo,
        paymentInfo: { id: "COD", status: "Pending" },
    };

    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice;
        order.shippingPrice = orderInfo.shippingPrice;
        order.taxPrice = orderInfo.taxPrice;
        order.totalPrice = orderInfo.totalPrice;
    }

    const handleCOD = async () => {
        validateShipping(shippingInfo, navigate);
        try {
            dispatch(orderCompleted());
            dispatch(createOrder(order));
            toast('Order placed successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
            });
            navigate('/order/success');
        } catch (error) {
            toast(error.message, {
                type: 'error',
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
    };

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg">
                    <h1 className="mb-4">Choose Payment Method</h1>

                    <button
                        id="cod_btn"
                        type="button"
                        className="btn btn-block py-3"
                        onClick={handleCOD}
                    >
                        Cash on Delivery
                    </button>
                </form>
            </div>
        </div>
    );
}
