import React from 'react';
import { Clock, MapPin, Phone } from 'lucide-react';

function InfoCard({ icon, title, children }) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md text-center hover:scale-105 transition-transform duration-300">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-navy-900 font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
}

export function ContactInfo() {
  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-emerald-500 font-semibold mb-2">We Are Open To Discuss</h2>
        <h3 className="text-2xl text-navy-900 font-bold">Our Location</h3>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        <InfoCard icon={<Clock className="w-8 h-8 text-emerald-500" />} title="Open Hours">
          <div className="text-gray-600 space-y-1">
            <p>Mon - Fri: 08:00 - 22:00</p>
            <p>Sat - Sun: 10:00 - 23:00</p>
          </div>
        </InfoCard>

        <InfoCard icon={<MapPin className="w-8 h-8 text-emerald-500" />} title="Address">
          <p className="text-gray-600">Shop 21, Mina Zayed, Abu Dhabi, UAE.</p>
        </InfoCard>

        <InfoCard icon={<Phone className="w-8 h-8 text-emerald-500" />} title="Contacts">
          <div className="text-gray-600 space-y-1">
            <p>+971 502369764</p>
            <p>treesherbsandmore@gmail.com</p>
          </div>
        </InfoCard>
      </div>
    </div>
  );
}
