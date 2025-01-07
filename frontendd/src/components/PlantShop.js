import React from "react";
import { motion } from "framer-motion";
import { Phone, Truck, Store, CreditCard, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AnimatedCard = motion.div;

export default function PlantShop() {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* House Shape Plant Card */}
        <div className="card overflow-hidden">
          <div className="card-content p-6">
            <div className="space-y-4">
              <div className="text-sm">Only On Our Store!</div>
              <h2 className="text-2xl font-bold">House Shape Plant</h2>
              <button
                className="bg-[#0B5D3F] hover:bg-[#094832] text-white px-6 py-3 rounded-md"
                onClick={() => navigate('/shop')} // Navigate to Shop page
              >
                SHOP NOW
              </button>
              <div className="h-[300px] relative">
                <img
                  src="https://img.freepik.com/premium-vector/set-color-images-different-house-plants-pots-various-shapes-realistic-vector-illustration_1284-69652.jpg"
                  alt="House Shape Plants"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Office Plant Card */}
        <div className="card overflow-hidden">
          <div className="card-content p-6">
            <div className="space-y-4">
              <div className="text-sm">Upto 40% Off</div>
              <h2 className="text-2xl font-bold">Office Plant</h2>
              <button
                className="bg-[#0B5D3F] hover:bg-[#094832] text-white px-6 py-3 rounded-md"
                onClick={() => navigate('/shop')} // Navigate to Shop page
              >
                SHOP NOW
              </button>
              <div className="h-[300px] relative">
                <img
                  src="https://hips.hearstapps.com/hmg-prod/images/screen-shot-2023-07-06-at-2-04-54-pm-64a7024cb5493.png?crop=0.8432732316227461xw:1xh;center,top&resize=1200:*"
                  alt="Office Plants"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hanging Planter Card */}
        <div className="card overflow-hidden">
          <div className="card-content p-6">
            <div className="space-y-4">
              <div className="text-sm">Fresh Flower</div>
              <h2 className="text-2xl font-bold">Hanging Planter</h2>
              <button
                className="bg-[#0B5D3F] hover:bg-[#094832] text-white px-6 py-3 rounded-md"
                onClick={() => navigate('/shop')} // Navigate to Shop page
              >
                SHOP NOW
              </button>
              <div className="h-[300px] relative">
                <img
                  src="https://www.shahisajawat.com/cdn/shop/products/product-image-1512361291_2048x.jpg?v=1605553128"
                  alt="Hanging Planters"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ceramic Pot & Plant Section */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <AnimatedCard className="p-6 border rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="space-y-4 md:w-1/2">
              <div className="text-sm">Collection of Cactus</div>
              <h2 className="text-2xl font-bold">Ceramic Pot & Plant</h2>
              <button
                className="bg-[#0B5D3F] hover:bg-[#094832] text-white px-6 py-3 rounded-md"
                onClick={() => navigate('/shop')} // Navigate to Shop page
              >
                SHOP NOW
              </button>
            </div>
            <div className="h-[300px] w-full md:w-1/2 relative mt-4 md:mt-0">
              <img
                src="https://thumbs.dreamstime.com/b/indoor-garden-assorted-houseplants-ceramic-pots-white-shelf-exotic-plants-background-home-decor-banner-stunning-340038667.jpg"
                alt="Ceramic Pots and Plants"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </AnimatedCard>
      </motion.div>

      {/* Features Section */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-12">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-4">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="font-semibold">Need Help ? Call</h3>
          <p className="text-sm text-gray-600">(+216)27 480 368</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#f5f0e6] flex items-center justify-center mb-4">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="font-semibold">Delivery On</h3>
          <p className="text-sm text-gray-600">The Grand Tunis And Sfax</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#e6f0eb] flex items-center justify-center mb-4">
            <Store className="w-6 h-6" />
          </div>
          <h3 className="font-semibold">Click And Collect</h3>
          <p className="text-sm text-gray-600">Withdrawal In Store</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#f5f0e6] flex items-center justify-center mb-4">
            <CreditCard className="w-6 h-6" />
          </div>
          <h3 className="font-semibold">Payment</h3>
          <p className="text-sm text-gray-600">By Credit Card / On Delivery</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#e6eef0] flex items-center justify-center mb-4">
            <RotateCcw className="w-6 h-6" />
          </div>
          <h3 className="font-semibold">Refund</h3>
          <p className="text-sm text-gray-600">Refund on Cancellation</p>
        </div>
      </div>
    </div>
  );
}
