'use client';
import React from 'react';
import Cart from '@/app/(components)/Cart';

const CartPage = () => {
  return (
    <div className="min-h-screen py-16 px-4 font-julius">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Shopping Cart</h1>
      <Cart />
    </div>
  );
};

export default CartPage;