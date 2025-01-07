import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getAdminProducts } from "../../actions/productActions";
import { getUsers } from '../../actions/userActions';
import { adminOrders as adminOrdersAction } from '../../actions/orderActions';
import { adminContactMessages } from "../../actions/contactActions";
import { Link } from "react-router-dom";
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function Dashboard() {
  const { products = [] } = useSelector(state => state.productsState);
  const { adminOrders = [] } = useSelector(state => state.orderState);
  const { users = [] } = useSelector(state => state.userState);
  const { contactMessages = [] } = useSelector(state => state.contactState);
  const dispatch = useDispatch();
  let outOfStock = 0;

  if (products.length > 0) {
    products.forEach(product => {
      if (product.stock === 0) {
        outOfStock = outOfStock + 1;
      }
    });
  }

  let totalAmount = 0;
  if (adminOrders.length > 0) {
    adminOrders.forEach(order => {
      totalAmount += order.totalPrice;
    });
  }

  const pieChartData = {
    labels: ['In Stock', 'Out of Stock'],
    datasets: [
      {
        data: [products.length - outOfStock, outOfStock],
        backgroundColor: ['#4ade80', '#f87171'],
        hoverBackgroundColor: ['#22c55e', '#ef4444'],
      },
    ],
  };

  const productSales = products.map(product => {
    const sales = adminOrders.reduce((acc, order) => {
      const orderItem = order.orderItems.find(item => item.product === product._id);
      return acc + (orderItem ? orderItem.quantity : 0);
    }, 0);
    return { name: product.name, sales };
  }).sort((a, b) => b.sales - a.sales).slice(0, 5);

  const barChartData = {
    labels: productSales.map(product => product.name),
    datasets: [
      {
        label: 'Sales',
        data: productSales.map(product => product.sales),
        backgroundColor: '#60a5fa',
      },
    ],
  };

  useEffect(() => {
    dispatch(getAdminProducts);
    dispatch(getUsers);
    dispatch(adminOrdersAction);
    dispatch(adminContactMessages);
  }, []);

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <h1 className="my-4">Dashboard</h1>
        <div className="row pr-4">
          <div className="col-xl-12 col-sm-12 mb-3">
            <div className="card text-white bg-primary o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">Total Amount<br /> <b>${totalAmount.toFixed(2)}</b></div>
              </div>
            </div>
          </div>
        </div>
        <div className="row pr-4">
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-success o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">Products<br /> <b>{products.length}</b></div>
              </div>
              <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </Link>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-danger o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">Orders<br /> <b>{adminOrders.length}</b></div>
              </div>
              <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </Link>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-info o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">Users<br /> <b>{users.length}</b></div>
              </div>
              <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </Link>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-warning o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">Contact Messages<br /> <b>{contactMessages.length}</b></div>
              </div>
              <Link className="card-footer text-white clearfix small z-1" to="/admin/contact-messages">
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="row pr-4">
          <div className="col-xl-6 col-sm-12 mb-3">
            <div className="card o-hidden h-100">
              <div className="card-body">
                <h2 className="card-title">Product Stock Status</h2>
                <div>
                  <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-sm-12 mb-3">
            <div className="card o-hidden h-100">
              <div className="card-body">
                <h2 className="card-title">Top 5 Selling Products</h2>
                <div>
                  <Bar
                    data={barChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: { beginAtZero: true },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
