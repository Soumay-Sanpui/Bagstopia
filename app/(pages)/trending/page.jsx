import React from 'react';
import Image from 'next/image';
import { FaFire, FaStar, FaHeart } from 'react-icons/fa';
import productsData from '@/data/products.json';
import PrCard from '@/app/(components)/PrCard';

const TrendingPage = () => {
  // Filter or select trending products (for demo, using first 4 products)
  const trendingProducts = productsData.products.slice(0, 4);

  const highlights = [
    {
      icon: <FaFire className="text-2xl text-hvr" />,
      title: "Most Popular",
      description: "Our best-selling collections"
    },
    {
      icon: <FaStar className="text-2xl text-hvr" />,
      title: "Featured Items",
      description: "Handpicked by our experts"
    },
    {
      icon: <FaHeart className="text-2xl text-hvr" />,
      title: "Customer Favorites",
      description: "Highly rated by our community"
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 font-julius">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Trending Now</h1>
        <p className="font-poppins text-gray-600 max-w-2xl mx-auto">
          Discover our most coveted pieces that are making waves in the world of luxury bags.
        </p>
      </div>

      {/* Highlights Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        {highlights.map((highlight, index) => (
          <div key={index} className="text-center p-8 border border-hvr rounded-sm hover:shadow-lg transition-shadow">
            <div className="mb-4">{highlight.icon}</div>
            <h3 className="text-xl font-bold mb-2">{highlight.title}</h3>
            <p className="text-gray-600 font-poppins">{highlight.description}</p>
          </div>
        ))}
      </div>

      {/* Trending Products Grid */}
      <div className="max-w-[1200px] mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Hot Right Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {trendingProducts.map((product) => (
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

      {/* Luxury Banner */}
      <div className="relative h-[300px] mb-16">
        <Image
          src="https://www.flipay.in/storage/soft-luggage/614zspstkal-sl1500.jpg"
          alt="Luxury Collection"
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Luxury Redefined</h2>
            <p className="font-poppins max-w-xl mx-auto">
              Experience the perfect blend of style, craftsmanship, and sophistication
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingPage;