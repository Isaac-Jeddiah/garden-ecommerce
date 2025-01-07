'use client'

import { Fragment, useEffect, useState } from "react"
import { Home, Settings, MapPin } from 'lucide-react'

export default function AboutSection() {
  return (
    <div id="about-section" className="container mx-auto px-4 py-12">
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-emerald-500 font-medium mb-4">ABOUT US</h2>
        <h1 className="text-4xl md:text-5xl font-bold text-navy-900 max-w-3xl mx-auto">
          A Beautiful plant like a good friend around the house
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold">Outdoor Plant</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center">
              <Settings className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold">Indore Plants</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold">Features Goes Here</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="relative">
            <img 
              src="https://hartley-botanic.co.uk//wp-content/uploads/2019/12/HartleyBotanic-Malvern2018-Highgrow-3155.jpg" 
              alt="Greenhouse with plants"
              className="w-full h-[300px] object-cover rounded-lg"
            />
            <div className="absolute bottom-4 right-4 bg-white rounded-lg p-4 shadow-lg">
              <div className="text-4xl font-bold text-emerald-600">25+</div>
              <div className="text-sm text-gray-600">Year Of Experience</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://demo.misbahwp.com/plant-garden/wp-content/themes/plant-garden-pro/images/about_us/about_us1.png" 
              alt="Garden with flowers"
              className="w-full h-[200px] object-cover rounded-lg"
            />
            <img 
              src="https://demo.misbahwp.com/plant-garden/wp-content/themes/plant-garden-pro/images/about_us/about_us2.png" 
              alt="Plant close-up"
              className="w-full h-[200px] object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

