import React from 'react';
import Cart from '@/app/(components)/Cart'; // Import the Cart component

const CartPage = () => {
  return (
    <div className="min-h-screen py-16 px-4 font-julius">
      <h1 className="text-4xl font-bold mb-4 text-center">Your Shopping Cart</h1>
      <Cart /> {/* Render the Cart component */}
    </div>
  );
};

export default CartPage;