import { Link } from 'react-router';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

const Home = () => {
    // Get featured products
    const featuredProducts = products.filter(product => product.rating >= 4.5).slice(0, 4);
    
    // Group products by category - showing more products in each section
    const categories = {
        backpacks: products.filter(product => product.category === 'backpacks').slice(0, 6),
        handbags: products.filter(product => product.category === 'handbags').slice(0, 6),
        travel: products.filter(product => product.category === 'travel').slice(0, 6),
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Premium Bags for Every Journey</h1>
                        <p className="text-xl mb-8">Discover our collection of high-quality bags for all your needs - from daily essentials to adventure travel.</p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/category/backpacks" className="bg-white text-blue-700 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition duration-300">
                                Shop Now
                            </Link>
                            <Link to="/search" className="bg-blue-600 border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300">
                                View All Products
                            </Link>
                            <Link to="/about" className="border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-700 transition duration-300">
                                Learn More
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <img 
                            src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600"
                            alt="Collection of premium bags" 
                            className="rounded-lg shadow-lg w-full h-auto object-cover bg-transparent"
                        />
                    </div>
                </div>
            </section>
            
            {/* Featured Products */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Categories */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Shop By Category</h2>
                    
                    {/* Backpacks */}
                    <div className="mb-16">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-semibold">Backpacks</h3>
                            <Link to="/category/backpacks" className="text-blue-600 hover:text-blue-800 font-medium">
                                View All <span className="ml-1">→</span>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categories.backpacks.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                    
                    {/* Handbags */}
                    <div className="mb-16">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-semibold">Handbags</h3>
                            <Link to="/category/handbags" className="text-blue-600 hover:text-blue-800 font-medium">
                                View All <span className="ml-1">→</span>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categories.handbags.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                    
                    {/* Travel Bags */}
                    <div>
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-semibold">Travel Bags</h3>
                            <Link to="/category/travel" className="text-blue-600 hover:text-blue-800 font-medium">
                                View All <span className="ml-1">→</span>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categories.travel.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            
            <Footer />
        </div>
    );
};

export default Home;