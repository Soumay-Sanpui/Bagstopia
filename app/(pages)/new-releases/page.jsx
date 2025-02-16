import React from 'react';
import Image from 'next/image';
import { FaCrown, FaGem, FaClock } from 'react-icons/fa';
import productsData from '@/data/products.json';
import PrCard from '@/app/(components)/PrCard';

const NewReleasesPage = () => {
  // For demo, using last 4 products as new releases
  const newReleases = productsData.products.slice(-4);

  const features = [
    {
      icon: <FaCrown className="text-2xl text-hvr" />,
      title: "Premium Quality",
      description: "Crafted with finest materials"
    },
    {
      icon: <FaGem className="text-2xl text-hvr" />,
      title: "Limited Edition",
      description: "Exclusive collections"
    },
    {
      icon: <FaClock className="text-2xl text-hvr" />,
      title: "Just Arrived",
      description: "Fresh from our artisans"
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 font-julius">
      {/* Hero Banner */}
      <div className="relative h-[400px] mb-16">
        <Image
          src="https://www.flipay.in/storage/soft-luggage/614zspstkal-sl1500.jpg"
          alt="New Releases"
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">New Releases</h1>
            <p className="font-poppins max-w-2xl mx-auto">
              Be the first to explore our latest masterpieces, where innovation meets timeless elegance.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        {features.map((feature, index) => (
          <div key={index} className="text-center p-8 bg-white shadow-lg rounded-sm border border-hvr">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-600 font-poppins">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* New Releases Grid */}
      <div className="max-w-[1200px] mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Latest Arrivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {newReleases.map((product) => (
            <PrCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              colors={product.colors}
              category={product.category}
            />
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="max-w-4xl mx-auto text-center bg-gray-50 p-12 rounded-sm border border-hvr">
        <h3 className="text-2xl font-bold mb-4">Be the First to Know</h3>
        <p className="text-gray-600 mb-6 font-poppins">
          Subscribe to receive exclusive updates about our new releases and special offers.
        </p>
        <div className="flex gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 border border-hvr rounded-sm focus:outline-none focus:ring-1 focus:ring-hvr w-[300px]"
          />
          <button className="px-6 py-2 bg-hvr text-white rounded-sm hover:bg-opacity-90 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewReleasesPage; 