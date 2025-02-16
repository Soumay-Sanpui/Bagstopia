"use client";
import React, { useEffect, useState } from 'react';
import { FaSort, FaFilter } from 'react-icons/fa';
import productsData from '@/data/products.json';
import PrCard from '@/app/(components)/PrCard';
import Image from 'next/image';

const CategoryPage = ({ params }) => {
    const { category } = React.use(params);
    const [products, setProducts] = useState([]);
    const [sortBy, setSortBy] = useState('featured');

    useEffect(() => {
        // Filter products by category
        const filteredProducts = productsData.products.filter(product => product.category === category);
        setProducts(filteredProducts);
    }, [category]);

    const handleSort = (type) => {
        const sortedProducts = [...products];
        switch(type) {
            case 'price-low':
                sortedProducts.sort((a, b) => parseInt(a.price) - parseInt(b.price));
                break;
            case 'price-high':
                sortedProducts.sort((a, b) => parseInt(b.price) - parseInt(a.price));
                break;
            default:
                // Keep original order for 'featured'
                break;
        }
        setProducts(sortedProducts);
        setSortBy(type);
    };

    const categoryTitles = {
        all: "All Collections",
        tote: "Luxury Tote Bags",
        briefcase: "Executive Briefcases",
        backpack: "Premium Backpacks",
        crossbody: "Designer Crossbody Bags",
        duffle: "Travel Duffle Bags",
        shoulder: "Elegant Shoulder Bags",
        sleeve: "Protective Sleeves",
        messenger: "Professional Messenger Bags"
    };

    const categoryDescriptions = {
        all: "Explore our complete collection of premium bags, each piece crafted with excellence.",
        tote: "Spacious and sophisticated totes for the modern lifestyle.",
        briefcase: "Professional elegance meets functional design.",
        backpack: "Combining comfort with contemporary style.",
        crossbody: "Versatile bags that complement any outfit.",
        duffle: "Perfect companions for your luxurious travels.",
        shoulder: "Classic designs with a modern twist.",
        sleeve: "Sleek protection for your valuable devices.",
        messenger: "Urban style meets practical functionality."
    };

    return (
        <div className="min-h-screen py-16 px-4 font-julius">
            {/* Hero Banner */}
            <div className="relative h-[300px] mb-16">
                <Image
                    src="https://www.flipay.in/storage/soft-luggage/614zspstkal-sl1500.jpg"
                    alt={categoryTitles[category]}
                    fill
                    className="object-cover brightness-50"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">{categoryTitles[category]}</h1>
                        <p className="font-poppins max-w-2xl mx-auto">
                            {categoryDescriptions[category]}
                        </p>
                    </div>
                </div>
            </div>

            {/* Sorting and Filtering */}
            <div className="max-w-[1200px] mx-auto mb-8 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <span className="font-poppins text-gray-600">Sort by:</span>
                    <select 
                        value={sortBy}
                        onChange={(e) => handleSort(e.target.value)}
                        className="border border-hvr rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-hvr"
                    >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>
                <div className="font-poppins text-gray-600">
                    {products.length} products
                </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-[1200px] mx-auto mb-16">
                <h2 className="text-2xl font-bold mb-8 text-center">{category} Collection</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {products.map((product) => (
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
            <div className="max-w-4xl mx-auto text-center bg-gray-50 p-12 rounded-sm border border-hvr">
                <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
                <p className="text-gray-600 mb-6 font-poppins">
                    Subscribe to receive updates about our latest collections and exclusive offers.
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
        </div>
    );
};

export default CategoryPage; 