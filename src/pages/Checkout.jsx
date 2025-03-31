import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useStore from '../store/useStore';

const Checkout = () => {
  const { cart, user } = useStore();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    address: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    country: user?.address?.country || '',
    phone: user?.phone || '',
  });
  
  const [billingAddress, setBillingAddress] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    address: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    country: user?.address?.country || '',
    phone: user?.phone || '',
  });
  
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [shippingMethod, setShippingMethod] = useState('standard');
  
  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  let shippingCost = 0;

  if (shippingMethod === 'standard') {
    shippingCost = subtotal > 5000 ? 0 : 300; // Free shipping on orders over ₹5000
  } else if (shippingMethod === 'express') {
    shippingCost = 500;
  }

  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shippingCost + tax;
  
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (sameAsShipping) {
      setBillingAddress(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSameAsShippingChange = (e) => {
    const checked = e.target.checked;
    setSameAsShipping(checked);
    
    if (checked) {
      setBillingAddress(shippingAddress);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate required fields
    for (const [key, value] of Object.entries(shippingAddress)) {
      if (!value && key !== 'phone') {
        alert(`Please complete all required shipping fields`);
        return;
      }
    }
    
    if (!sameAsShipping) {
      for (const [key, value] of Object.entries(billingAddress)) {
        if (!value && key !== 'phone') {
          alert(`Please complete all required billing fields`);
          return;
        }
      }
    }
    
    // If all validations pass, proceed to payment
    navigate('/payment');
  };
  
  // If cart is empty, redirect to cart page
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow text-center">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">You need to add items to your cart before proceeding to checkout.</p>
          <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                {/* Shipping Information */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="firstName" className="block text-gray-700 mb-2">First Name*</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={shippingAddress.firstName}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-gray-700 mb-2">Last Name*</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={shippingAddress.lastName}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700 mb-2">Street Address*</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={shippingAddress.address}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="city" className="block text-gray-700 mb-2">City*</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-gray-700 mb-2">State/Province*</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={shippingAddress.state}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="zipCode" className="block text-gray-700 mb-2">ZIP / Postal Code*</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={shippingAddress.zipCode}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-gray-700 mb-2">Country*</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={shippingAddress.country}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={shippingAddress.phone}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                {/* Shipping Method */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
                  
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="standard"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="h-5 w-5 text-blue-600"
                      />
                      <span className="ml-2">
                        <span className="font-medium">Standard Shipping</span>
                        <span className="text-gray-600 ml-2">
                          {subtotal > 5000 ? '(Free)' : '₹300'} - Estimated delivery: 3-5 business days
                        </span>
                      </span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="express"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="h-5 w-5 text-blue-600"
                      />
                      <span className="ml-2">
                        <span className="font-medium">Express Shipping</span>
                        <span className="text-gray-600 ml-2">
                          ₹500 - Estimated delivery: 1-2 business days
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
                
                {/* Billing Information */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Billing Information</h2>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={sameAsShipping}
                        onChange={handleSameAsShippingChange}
                        className="h-5 w-5 text-blue-600"
                      />
                      <span className="ml-2 text-sm">Same as shipping address</span>
                    </label>
                  </div>
                  
                  {!sameAsShipping && (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="billingFirstName" className="block text-gray-700 mb-2">First Name*</label>
                          <input
                            type="text"
                            id="billingFirstName"
                            name="firstName"
                            value={billingAddress.firstName}
                            onChange={handleBillingChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="billingLastName" className="block text-gray-700 mb-2">Last Name*</label>
                          <input
                            type="text"
                            id="billingLastName"
                            name="lastName"
                            value={billingAddress.lastName}
                            onChange={handleBillingChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="billingAddress" className="block text-gray-700 mb-2">Street Address*</label>
                        <input
                          type="text"
                          id="billingAddress"
                          name="address"
                          value={billingAddress.address}
                          onChange={handleBillingChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="billingCity" className="block text-gray-700 mb-2">City*</label>
                          <input
                            type="text"
                            id="billingCity"
                            name="city"
                            value={billingAddress.city}
                            onChange={handleBillingChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="billingState" className="block text-gray-700 mb-2">State/Province*</label>
                          <input
                            type="text"
                            id="billingState"
                            name="state"
                            value={billingAddress.state}
                            onChange={handleBillingChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="billingZipCode" className="block text-gray-700 mb-2">ZIP / Postal Code*</label>
                          <input
                            type="text"
                            id="billingZipCode"
                            name="zipCode"
                            value={billingAddress.zipCode}
                            onChange={handleBillingChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="billingCountry" className="block text-gray-700 mb-2">Country*</label>
                          <input
                            type="text"
                            id="billingCountry"
                            name="country"
                            value={billingAddress.country}
                            onChange={handleBillingChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="billingPhone" className="block text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          id="billingPhone"
                          name="phone"
                          value={billingAddress.phone}
                          onChange={handleBillingChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <button 
                  type="submit"
                  className="bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                >
                  Continue to Payment
                </button>
              </form>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                
                <div className="divide-y">
                  {cart.map(item => (
                    <div key={item.id} className="py-3 flex">
                      <div className="flex-shrink-0 mr-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                        <p className="font-medium">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 mt-4 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shippingMethod === 'standard' ? 
                        (shippingCost === 0 ? 'Free' : `₹${shippingCost.toLocaleString('en-IN')}`) : 
                        `₹${shippingCost.toLocaleString('en-IN')}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (18% GST)</span>
                    <span className="font-medium">₹{tax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>₹{total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout; 