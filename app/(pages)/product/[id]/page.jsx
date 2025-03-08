"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaHeart, FaShoppingCart, FaTruck, FaExchangeAlt, FaShieldAlt } from 'react-icons/fa';
import productsData from '@/data/products.json';
import React from 'react';
import {toast} from "react-hot-toast";
import useStore from "@/app/store";

const ProductPage = ({ params }) => {
  const { id } = React.use(params);
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const addToCart = useStore((state) => state.addToCart);

  useEffect(() => {
    const foundProduct = productsData.products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedColor(foundProduct.colors[0]);
    }
  }, [id]);

  const handleHeartClick = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Removed from Wishlist' : 'Added to Wishlist', {
      style: {
        border: '1px solid #000',
        borderRadius: '0px',
        padding: '16px',
        color: '#000',
        backgroundColor: '#fff',
        fontFamily: 'Julius Sans One, sans-serif',
      },
      iconTheme: {
        primary: '#000',
        secondary: '#fff',
      },
    });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart({ id, name, price, image, colors, category });
    toast.success('Added to Cart', {
      style: {
        border: '1px solid #000',
        padding: '16px',
        color: '#000',
        fontFamily: 'Julius Sans One, sans-serif',
      },
      iconTheme: {
        primary: '#000',
        secondary: '#fff',
      },
    });
  };

  if (!product) return <div>Loading...</div>;

  const colorMap = {
    black: "bg-black",
    brown: "bg-amber-800",
    gray: "bg-gray-500",
    navy: "bg-navy-800",
    blue: "bg-blue-500",
    red: "bg-red-500",
    pink: "bg-pink-500",
    olive: "bg-olive-700",
    white: "bg-white"
  };

  const features = [
    { icon: <FaTruck />, title: "Free Shipping", description: "On orders above ₹999" },
    { icon: <FaExchangeAlt />, title: "Easy Returns", description: "30-day return policy" },
    { icon: <FaShieldAlt />, title: "Secure Payment", description: "100% secure checkout" }
  ];

  return (
    <div className="min-h-screen py-16 px-4 font-julius">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative h-[500px]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-sm"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-gray-500 capitalize">{product.category}</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className="p-2 rounded-full border border-black"
                >
                  <FaHeart className={isLiked ? 'text-red-500' : 'text-black'} />
                </button>
                <button onClick={handleAddToCart} className="p-2 rounded-full border border-black">
                  <FaShoppingCart className="text-black" />
                </button>
              </div>
            </div>

            <div className="text-2xl font-bold">₹{product.price}</div>

            {/* Color Selection */}
            <div>
              <h3 className="font-bold mb-2">Colors</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-sm border-2 ${
                      selectedColor ===  color ? 'border-hvr' : 'border-gray-300'
                    } ${colorMap[color]}`}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Product Description */}
            <div>
              <h3 className="font-bold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed font-poppins">
                Experience luxury and functionality with our {product.name}. Perfect for {product.category} 
                enthusiasts who appreciate premium quality and sophisticated design. Crafted with 
                attention to detail and made from high-quality materials.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-b">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="text-hvr text-xl mb-2">{feature.icon}</div>
                  <div className="font-bold text-sm">{feature.title}</div>
                  <div className="text-gray-500 font-poppins text-xs">{feature.description}</div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button onClick={handleAddToCart} className="flex-1 py-3 px-6 bg-hvr text-white hover:bg-opacity-90 transition-colors">
                Add to Cart
              </button>
              <button className="flex-1 py-3 px-6 border border-hvr hover:bg-hvr hover:text-white transition-colors">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage; 