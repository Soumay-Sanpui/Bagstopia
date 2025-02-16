import React from 'react';
import Image from 'next/image';
import { FaCrown, FaGem, FaFeather } from 'react-icons/fa';
import productsData from '@/data/products.json';
import PrCard from '@/app/(components)/PrCard';

const ShoulderBagPage = () => {
  const shoulderBags = productsData.products.filter(product => product.category === 'shoulder');

  const highlights = [
    {
      icon: <FaCrown className="text-2xl text-hvr" />,
      title: "Elegant Design",
      description: "Timeless sophistication"
    },
    {
      icon: <FaGem className="text-2xl text-hvr" />,
      title: "Premium Quality",
      description: "Finest materials used"
    },
    {
      icon: <FaFeather className="text-2xl text-hvr" />,
      title: "Lightweight Comfort",
      description: "Easy to carry all day"
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 font-julius">
      {/* Elegant Hero Banner */}
      <div className="relative h-[450px] mb-16">
        <Image
          src="/images/shoulder-hero.jpg"
          alt="Elegant Shoulder Bags"
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-40">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Elegant Shoulder Bags</h1>
            <p className="font-poppins max-w-2xl mx-auto text-lg">
              Elevate your style with our sophisticated collection of shoulder bags.
            </p>
          </div>
        </div>
      </div>

      {/* Products Display */}
      <div className="max-w-[1200px] mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {shoulderBags.map((product) => (
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

export default ShoulderBagPage; 