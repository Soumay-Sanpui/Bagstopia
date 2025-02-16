'use client'
import React from 'react';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import useStore from '@/app/store';
import Link from 'next/link';

const Cart = () => {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);

  // Calculate total price
  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div className="min-h-screen flex flex-col items-center">
      {cart.length === 0 ? (
        <div className="text-center flex flex-col items-center justify-center">
          <FaShoppingCart className="text-6xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-4">Add some products to your cart to get started!</p>
          <Link 
            href="/" 
            className="bg-hvr text-white px-6 py-2 rounded-sm hover:bg-opacity-90 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          <ul className="space-y-4 mb-8">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center border p-4 rounded-md shadow-md">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-6" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Price: ₹{item.price}</p>
                  <p className="text-gray-600">Category: {item.category}</p>
                  <div className="flex gap-2 mt-1">
                    {item.colors.map((color) => (
                      <div
                        key={color}
                        className={`w-4 h-4 rounded-full border border-gray-300 ${
                          color === 'black' ? 'bg-black' :
                          color === 'brown' ? 'bg-amber-800' :
                          color === 'gray' ? 'bg-gray-500' :
                          color === 'navy' ? 'bg-navy-800' :
                          color === 'blue' ? 'bg-blue-500' :
                          color === 'red' ? 'bg-red-500' :
                          color === 'pink' ? 'bg-pink-500' :
                          color === 'olive' ? 'bg-olive-700' :
                          'bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-red-500 hover:text-red-700 transition-colors"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
          
          {/* Cart Summary */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold">Total:</span>
              <span className="text-2xl font-bold">₹{total}</span>
            </div>
            <div className="flex gap-4">
              <button className="flex-1 bg-hvr text-white py-3 px-6 rounded-sm hover:bg-opacity-90 transition-colors">
                Proceed to Checkout
              </button>
              <Link 
                href="/"
                className="flex-1 text-center border border-hvr py-3 px-6 rounded-sm hover:bg-hvr hover:text-white transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart; 