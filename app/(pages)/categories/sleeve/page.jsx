import React from 'react';
import Image from 'next/image';
import { FaLaptop, FaShieldAlt, FaRegClock } from 'react-icons/fa';
import productsData from '@/data/products.json';
import PrCard from '@/app/(components)/PrCard';

const LaptopSleevePage = () => {
  const laptopSleeves = productsData.products.filter(product => product.category === 'sleeve');

  const features = [
    {
      icon: <FaLaptop className="text-2xl text-hvr" />,
      title: "Perfect Fit",
      description: "Custom sizes for all devices"
    },
    {
      icon: <FaShieldAlt className="text-2xl text-hvr" />,
      title: "Maximum Protection",
      description: "Padded design for safety"
    },
    {
      icon: <FaRegClock className="text-2xl text-hvr" />,
      title: "Quick Access",
      description: "Easy in, easy out design"
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 font-julius bg-gray-50">
      {/* Modern Tech Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Premium Laptop Sleeves</h1>
        <p className="font-poppins text-gray-600 max-w-2xl mx-auto">
          Protect your tech in style with our premium laptop sleeves.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-8 rounded-sm shadow-lg border border-hvr">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-600 font-poppins">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Products Section */}
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {laptopSleeves.map((product) => (
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
    </div>
  );
};

export default LaptopSleevePage; 