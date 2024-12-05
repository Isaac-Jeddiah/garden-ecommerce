import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts } from '../../actions/productActions';
import { getUsers } from '../../actions/userActions';
import { adminOrders as adminOrdersAction } from '../../actions/orderActions';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import Sidebar from './Sidebar';
import { adminContactMessages } from "../../actions/contactActions"; // Add this import

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products = [] } = useSelector((state) => state.productsState);
  const { adminOrders = [] } = useSelector((state) => state.orderState);
  const { users = [] } = useSelector((state) => state.userState);
  const { contactMessages = [] } = useSelector( state => state.contactState); // Add this line
  
  useEffect(() => {
    dispatch(getAdminProducts);
    dispatch(getUsers);
    dispatch(adminOrdersAction);
    dispatch(adminContactMessages); // Add this line
  }, [dispatch]);

  const outOfStock = products.filter((product) => product.stock === 0).length;
  const totalAmount = adminOrders.reduce((acc, order) => acc + order.totalPrice, 0);

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

  return (
    <div className="flex">
      
      <Sidebar />
      
      <div className="flex-1 p-10 bg-green-50 ml-64">
        <h1 className="text-3xl font-bold mb-8 text-green-800">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Amount"
            value={`$${totalAmount.toFixed(2)}`}
            link="/admin/orders"
            color="bg-blue-500"
          />
          <DashboardCard
            title="Products"
            value={products.length}
            link="/admin/products"
            color="bg-green-500"
          />
          <DashboardCard
            title="Orders"
            value={adminOrders.length}
            link="/admin/orders"
            color="bg-yellow-500"
          />
          <DashboardCard
            title="Users"
            value={users.length}
            link="/admin/users"
            color="bg-purple-500"
          />
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
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Product Stock Status</h2>
            <div className="w-full h-64">
              <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Top 5 Selling Products</h2>
            <div className="w-full h-64">
              <Bar 
                data={barChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Number of Sales'
                      }
                    },
                    x: {
                      title: {
                        display: true,
                        text: 'Product Name'
                      }
                    }
                  }
                }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, link, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`${color} rounded-lg shadow-md p-6 text-white`}
  >
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-3xl font-bold mb-4">{value}</p>
    <Link
      to={link}
      className="text-sm bg-white bg-opacity-20 hover:bg-opacity-30 py-2 px-4 rounded transition duration-300"
    >
      View Details
    </Link>
  </motion.div>
);

export default Dashboard;

