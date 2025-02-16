'use client'
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import useStore from '@/app/store';

const Cart = () => {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {cart.length === 0 ? (
        <div className="text-center flex flex-col items-center justify-center">
          <FaShoppingCart className="text-6xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
          <p className="text-gray-600">Add some products to your cart to get started!</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {cart.map((item) => (
            <li key={item.id} className="flex items-center border p-4 rounded-md shadow-md">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">Price: ₹{item.price}</p>
                <p className="text-gray-600">Color: {item.colors.join(', ')}</p>
              </div>
              <button 
                onClick={() => removeFromCart(item.id)} 
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart; 