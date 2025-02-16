import Navbar from "./(components)/Navbar";
import Footer from "./(components)/Footer";
import PrCard from './(components)/PrCard';
import productsData from '@/data/products.json';
import CategoryBar from './(components)/CategoryBar';

export default function Home() {
  return (
    <>
      <Navbar />
      <CategoryBar key="category-bar" />
      <main className="min-h-screen p-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold font-julius mb-4">Welcome to Bags-Topia</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-poppins">
            Discover our collection of premium bags, crafted with excellence and designed for your lifestyle.
          </p>
        </div>

        {/* Featured Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold font-julius mb-8 text-center">Featured Categories</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {productsData.categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 border border-hvr rounded-sm hover:bg-hvr hover:text-white transition-colors font-poppins capitalize"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-bold font-julius mb-8 text-center">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {productsData.products.map((product) => (
              <PrCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                colors={product.colors}
                category={product.category}
              />
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-24 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold font-julius mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6 font-poppins">
            Subscribe to our newsletter for exclusive offers and updates.
          </p>
          <div className="flex gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border border-hvr rounded-sm focus:outline-none focus:ring-1 focus:ring-hvr w-[300px]"
            />
            <button className="px-6 py-2 bg-hvr text-white rounded-sm hover:bg-opacity-90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
