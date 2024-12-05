import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck } from 'lucide-react';
import MetaData from '../layouts/MetaData';
import CheckoutSteps from '../cart/CheckoutStep';

export default function PaymentMethod() {
  const navigate = useNavigate();
  navigate('/paymentmethod');
  return (
    <>
      <MetaData title={'Payment Method'} />
      <CheckoutSteps shipping confirmOrder paymentmethod />
      
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
            Select Payment Method
          </h2>
          
          <div className="space-y-4">
            <button
              onClick={() => navigate('/payment')}
              className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:shadow-lg transition duration-200 bg-white"
            >
              <div className="flex items-center">
                <CreditCard className="h-6 w-6 text-blue-500 mr-3" />
                <div className="text-left">
                  <p className="text-lg font-semibold text-gray-900">Card Payment</p>
                  <p className="text-sm text-gray-500">Pay securely with your credit/debit card</p>
                </div>
              </div>
              <span className="text-blue-500">&rarr;</span>
            </button>

            <button
              onClick={() => navigate('/cashondelivery')}
              className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:border-green-500 hover:shadow-lg transition duration-200 bg-white"
            >
              <div className="flex items-center">
                <Truck className="h-6 w-6 text-green-500 mr-3" />
                <div className="text-left">
                  <p className="text-lg font-semibold text-gray-900">Cash on Delivery</p>
                  <p className="text-sm text-gray-500">Pay when you receive your order</p>
                </div>
              </div>
              <span className="text-green-500">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}