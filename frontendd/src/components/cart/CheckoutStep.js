import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

export default function CheckoutSteps({ shipping, confirmOrder, paymentmethod, payment }) {
    const steps = [
        { name: 'Shipping Info', link: '/shipping', active: shipping },
        { name: 'Confirm Order', link: '/order/confirm', active: confirmOrder },
        { name: 'Payment Method', link: '/paymentmethod', active: paymentmethod },
        //{ name: 'Payment', link: '/payment', active: payment }
    ];

    return (
        <motion.div 
            className="flex justify-center items-center my-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {steps.map((step, index) => (
                <div key={step.name} className="flex items-center">
                    <Link 
                        to={step.link}
                        className={`px-4 py-2 rounded-full ${
                            step.active 
                                ? 'bg-green-500 text-white' 
                                : 'bg-gray-200 text-gray-600'
                        } transition duration-300`}
                    >
                        {step.name}
                    </Link>
                    {index < steps.length - 1 && (
                        <div className={`h-1 w-12 mx-2 ${
                            steps[index + 1].active 
                                ? 'bg-green-500' 
                                : 'bg-gray-300'
                        }`}></div>
                    )}
                </div>
            ))}
        </motion.div>
    )
}