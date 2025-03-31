import { useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import MobileFilters from '../components/MobileFilters';
import useStore from '../store/useStore';
import products from '../data/products';
import { applyAllFilters, sortProducts } from '../utils/filterUtils';

const SearchResults = () => {
  const { searchTerm, filters } = useStore();
  const [sortOption, setSortOption] = useState('featured');
  
  // Filter and search products based on search term and filters
  const filteredProducts = useMemo(() => {
    // Apply all filters
    const filtered = applyAllFilters(products, {
      searchTerm,
      category: filters.category,
      priceRange: filters.priceRange,
      rating: filters.rating
    });
    
    // Sort the filtered products
    return sortProducts(filtered, sortOption);
  }, [searchTerm, filters, sortOption]);
  
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {searchTerm ? `Search Results for "${searchTerm}"` : 'All Products'}
          </h1>
          <p className="text-gray-600">{filteredProducts.length} products found</p>
        </div>
        
        {/* Mobile Filters */}
        <MobileFilters />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar with filters */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterSidebar />
          </div>
          
          {/* Products grid */}
          <div className="lg:col-span-3">
            {/* Sorting options */}
            <div className="mb-6 flex justify-end">
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-gray-700">Sort by:</label>
                <select 
                  id="sort" 
                  className="border rounded px-3 py-1.5"
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
            
            {/* Product grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow">
                <svg 
                  className="mx-auto h-12 w-12 text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SearchResults; 