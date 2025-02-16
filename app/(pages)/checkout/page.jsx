'use client'
import React from 'react';
import { FaCreditCard, FaShippingFast } from 'react-icons/fa';
import useStore from '@/app/store';
import Link from 'next/link';

const CheckoutPage = () => {
  const cart = useStore((state) => state.cart);
  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div className="min-h-screen py-16 px-4 font-julius">
      <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>
      {cart.length === 0 ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-4">Add some products to your cart to proceed!</p>
          <Link 
            href="/" 
            className="bg-hvr text-white px-6 py-2 rounded-sm hover:bg-opacity-90 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="border p-4 rounded-md shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center border-b py-2">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600">Price: ₹{item.price}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mt-4">
              <span className="text-xl font-semibold">Total:</span>
              <span className="text-2xl font-bold">₹{total}</span>
            </div>
          </div>

          <div className="border p-4 rounded-md shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
            <form>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="cardNumber">Card Number</label>
                <input 
                  type="text" 
                  id="cardNumber" 
                  className="border p-2 w-full rounded-md" 
                  placeholder="1234 5678 9012 3456" 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="expiryDate">Expiry Date</label>
                <input 
                  type="text" 
                  id="expiryDate" 
                  className="border p-2 w-full rounded-md" 
                  placeholder="MM/YY" 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="cvv">CVV</label>
                <input 
                  type="text" 
                  id="cvv" 
                  className="border p-2 w-full rounded-md" 
                  placeholder="123" 
                  required 
                />
              </div>
              <button 
                type="submit" 
                className="w-full py-3 bg-hvr text-white rounded-md hover:bg-opacity-90 transition-colors"
              >
                <FaCreditCard className="inline mr-2" /> Pay Now
              </button>
            </form>
          </div>

          <div className="border p-4 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
            <p className="mb-2"><FaShippingFast className="inline mr-2" /> Free Shipping on orders above ₹999</p>
            <p className="text-gray-600">Your order will be delivered within 3-5 business days.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
