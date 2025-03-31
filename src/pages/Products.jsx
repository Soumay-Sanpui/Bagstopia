import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import MobileFilters from '../components/MobileFilters';
import useStore from '../store/useStore';
import products from '../data/products';
import { applyAllFilters, sortProducts } from '../utils/filterUtils';

const Products = () => {
  const { filters } = useStore();
  const [sortOption, setSortOption] = useState('featured');
  
  // Apply filters and sort products
  const filteredProducts = applyAllFilters(products, {
    categories: filters.categories,
    priceRange: filters.priceRange,
    rating: filters.rating
  });
  
  const sortedProducts = sortProducts(filteredProducts, sortOption);
  
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-gray-600">Browse our complete collection of premium bags</p>
        </div>
        
        {/* Mobile Filters */}
        <MobileFilters />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar with filters */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterSidebar />
          </div>
          
          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort Options */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{sortedProducts.length} products</p>
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-gray-600">Sort by:</label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={handleSortChange}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
            
            {/* Products */}
            {sortedProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h2 className="text-2xl font-semibold mb-4">No products found</h2>
                <p className="text-gray-600 mb-4">Try adjusting your filters to find what you're looking for.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;