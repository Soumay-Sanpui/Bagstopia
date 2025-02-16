import React from 'react';
import Image from 'next/image';
import { FaCompass, FaShieldAlt, FaLaptop } from 'react-icons/fa';
import productsData from '@/data/products.json';
import PrCard from '@/app/(components)/PrCard';

const BackpackPage = () => {
  const backpacks = productsData.products.filter(product => product.category === 'backpack');

  const features = [
    {
      icon: <FaCompass className="text-2xl text-hvr" />,
      title: "Adventure Ready",
      description: "Perfect for urban explorers"
    },
    {
      icon: <FaShieldAlt className="text-2xl text-hvr" />,
      title: "Premium Protection",
      description: "Secure your valuables"
    },
    {
      icon: <FaLaptop className="text-2xl text-hvr" />,
      title: "Tech Friendly",
      description: "Dedicated laptop compartments"
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 font-julius">
      {/* Hero Section */}
      <div className="relative h-[400px] mb-16">
        <Image
          src="/images/backpack-hero.jpg"
          alt="Premium Backpacks"
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Premium Backpacks</h1>
            <p className="font-poppins max-w-2xl mx-auto">
              Where style meets functionality - discover our collection of luxury backpacks.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        {features.map((feature, index) => (
          <div key={index} className="text-center p-8 border border-hvr rounded-sm hover:shadow-lg transition-shadow">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-600 font-poppins">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Products Grid */}
      <div className="max-w-[1200px] mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {backpacks.map((product) => (
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

export default BackpackPage; 