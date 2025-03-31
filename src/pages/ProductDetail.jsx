import { useParams, Link } from 'react-router';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import useStore from '../store/useStore';
import products from '../data/products';

const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart } = useStore();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  useEffect(() => {
    // Find the product by ID
    const foundProduct = products.find(p => p.id === parseInt(productId));
    
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Find related products (same category, different ID)
      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      
      setRelatedProducts(related);
    }
  }, [productId]);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value > 0 ? value : 1);
  };
  
  const handleAddToCart = () => {
    if (product) {
      // Add product to cart with the selected quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow text-center">
          <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
          <p className="text-gray-600 mb-8">The product you're looking for does not exist or has been removed.</p>
          <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Back to Home
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
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex space-x-2 text-sm">
            <li><Link to="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li><span className="text-gray-500 mx-2">/</span></li>
            <li>
              <Link 
                to={`/category/${product.category}`} 
                className="text-blue-600 hover:underline"
              >
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
            </li>
            <li><span className="text-gray-500 mx-2">/</span></li>
            <li className="text-gray-700">{product.name}</li>
          </ol>
        </nav>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product Image */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full object-cover"
            />
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg 
                    key={index}
                    className={`w-5 h-5 ${
                      index < Math.floor(product.rating) 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 ml-2">({product.rating})</span>
            </div>
            
            {/* Price */}
            <div className="text-3xl font-bold text-gray-900 mb-6">
              ₹{product.price.toLocaleString('en-IN')}
            </div>
            
            {/* Description */}
            <p className="text-gray-700 mb-8">
              {product.description}
            </p>
            
            {/* Availability */}
            <div className="mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                product.inStock 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            
            {/* Add to Cart */}
            <div className="flex items-center mb-8">
              <div className="mr-4">
                <label htmlFor="quantity" className="sr-only">Quantity</label>
                <input 
                  type="number" 
                  id="quantity" 
                  className="w-16 border border-gray-300 rounded px-3 py-2"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`px-6 py-3 rounded-md font-semibold ${
                  product.inStock
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                } transition-colors`}
              >
                Add to Cart
              </button>
            </div>
            
            {/* Category */}
            <div className="text-sm text-gray-600">
              Category: 
              <Link 
                to={`/category/${product.category}`} 
                className="text-blue-600 hover:underline ml-1"
              >
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail; 