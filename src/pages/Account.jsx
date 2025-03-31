import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useStore from '../store/useStore';

const Account = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, updateUserProfile, updateUserAddress } = useStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [editAddressMode, setEditAddressMode] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [addressData, setAddressData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
    
    // Initialize form data with user data
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || ''
      });
      
      if (user.address) {
        setAddressData({
          street: user.address.street || '',
          city: user.address.city || '',
          state: user.address.state || '',
          zipCode: user.address.zipCode || '',
          country: user.address.country || ''
        });
      }
    }
  }, [user, isAuthenticated, navigate]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(profileData);
    setEditMode(false);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    updateUserAddress(addressData);
    setEditAddressMode(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null; // Or a loading state
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-6">My Account</h2>
              
              <nav className="flex flex-col space-y-2">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`px-4 py-2 rounded-md text-left ${activeTab === 'profile' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                >
                  Profile Information
                </button>
                <button 
                  onClick={() => setActiveTab('address')}
                  className={`px-4 py-2 rounded-md text-left ${activeTab === 'address' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                >
                  Address Book
                </button>
                <button 
                  onClick={() => setActiveTab('orders')}
                  className={`px-4 py-2 rounded-md text-left ${activeTab === 'orders' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                >
                  Order History
                </button>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md text-left text-red-600 hover:bg-red-50 mt-6"
                >
                  Logout
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4">
            <div className="bg-white shadow rounded-lg p-6">
              {/* Profile Information */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Profile Information</h2>
                    {!editMode && (
                      <button 
                        onClick={() => setEditMode(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                  
                  {editMode ? (
                    <form onSubmit={handleProfileSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="firstName" className="block text-gray-700 mb-1">First Name</label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={profileData.firstName}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-gray-700 mb-1">Last Name</label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={profileData.lastName}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-gray-700 mb-1">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-gray-700 mb-1">Phone Number</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      
                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditMode(false)}
                          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-gray-500 text-sm">First Name</h3>
                          <p className="text-gray-800">{user.firstName}</p>
                        </div>
                        <div>
                          <h3 className="text-gray-500 text-sm">Last Name</h3>
                          <p className="text-gray-800">{user.lastName}</p>
                        </div>
                        <div>
                          <h3 className="text-gray-500 text-sm">Email Address</h3>
                          <p className="text-gray-800">{user.email}</p>
                        </div>
                        <div>
                          <h3 className="text-gray-500 text-sm">Phone Number</h3>
                          <p className="text-gray-800">{user.phone || "Not provided"}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Address Book */}
              {activeTab === 'address' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Address Book</h2>
                    {!editAddressMode && (
                      <button 
                        onClick={() => setEditAddressMode(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      >
                        Edit Address
                      </button>
                    )}
                  </div>
                  
                  {editAddressMode ? (
                    <form onSubmit={handleAddressSubmit}>
                      <div className="grid grid-cols-1 gap-4 mb-4">
                        <div>
                          <label htmlFor="street" className="block text-gray-700 mb-1">Street Address</label>
                          <input
                            type="text"
                            id="street"
                            name="street"
                            value={addressData.street}
                            onChange={handleAddressChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="city" className="block text-gray-700 mb-1">City</label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={addressData.city}
                              onChange={handleAddressChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="state" className="block text-gray-700 mb-1">State/Province</label>
                            <input
                              type="text"
                              id="state"
                              name="state"
                              value={addressData.state}
                              onChange={handleAddressChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="zipCode" className="block text-gray-700 mb-1">Postal/Zip Code</label>
                            <input
                              type="text"
                              id="zipCode"
                              name="zipCode"
                              value={addressData.zipCode}
                              onChange={handleAddressChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="country" className="block text-gray-700 mb-1">Country</label>
                            <input
                              type="text"
                              id="country"
                              name="country"
                              value={addressData.country}
                              onChange={handleAddressChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                          Save Address
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditAddressMode(false)}
                          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div>
                      {user.address ? (
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <h3 className="font-semibold mb-2">Shipping Address</h3>
                          <address className="not-italic">
                            <p>{user.firstName} {user.lastName}</p>
                            <p>{user.address.street}</p>
                            <p>{user.address.city}, {user.address.state} {user.address.zipCode}</p>
                            <p>{user.address.country}</p>
                          </address>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-600">No address saved yet.</p>
                          <button 
                            onClick={() => setEditAddressMode(true)}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                          >
                            Add Address
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {/* Order History */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Order History</h2>
                  
                  {user.orders && user.orders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Order ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Total
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {user.orders.map(order => (
                            <tr key={order.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm text-gray-900">{order.id}</span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm text-gray-900">{order.date}</span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm text-gray-900">₹{order.total.toLocaleString()}</span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  order.status === 'Delivered' 
                                    ? 'bg-green-100 text-green-800' 
                                    : order.status === 'Processing'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button 
                                  className="text-blue-600 hover:text-blue-900"
                                  onClick={() => navigate(`/order/${order.id}`)}
                                >
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600">No orders found.</p>
                      <button 
                        onClick={() => navigate('/products')}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      >
                        Start Shopping
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Account; 