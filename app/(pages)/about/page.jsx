import React from 'react';
import Image from 'next/image';
import { FaAward, FaUsers, FaStore, FaShippingFast } from 'react-icons/fa';

const AboutPage = () => {
    const stats = [
        { icon: <FaStore className="text-4xl" />, count: '10+', label: 'Stores Worldwide' },
        { icon: <FaUsers className="text-4xl" />, count: '50K+', label: 'Happy Customers' },
        { icon: <FaAward className="text-4xl" />, count: '15+', label: 'Awards' },
        { icon: <FaShippingFast className="text-4xl" />, count: '100+', label: 'Countries Served' },
    ];

    return (
        <div className="min-h-screen py-16 px-4 font-julius">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">Our Story</h1>
                <p className="font-poppins text-gray-600 max-w-2xl mx-auto">
                    Since 2010, Bags-Topia has been crafting luxury bags that blend timeless elegance with contemporary design.
                </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
                {stats.map((stat, index) => (
                    <div key={index} className="text-center p-6 bg-white shadow-lg rounded-sm hover:shadow-xl transition-shadow border border-hvr">
                        <div className="text-hvr mb-4">{stat.icon}</div>
                        <div className="text-2xl font-bold mb-2">{stat.count}</div>
                        <div className="text-gray-600">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Mission Section */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                <div className="relative h-[400px]">
                    <Image 
                        src="https://www.flipay.in/storage/soft-luggage/614zspstkal-sl1500.jpg" 
                        alt="Luxury Bags" 
                        fill
                        className="object-cover rounded-sm"
                    />
                </div>
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold">Our Mission</h2>
                    <p className="font-poppins text-gray-600 leading-relaxed">
                        At Bags-Topia, we believe that every bag tells a story. Our mission is to create exceptional pieces that 
                        not only complement your style but become an integral part of your journey. Each creation is a testament 
                        to our commitment to quality, innovation, and sustainable luxury.
                    </p>
                    <div className="space-y-4 font-poppins">
                        <div className="flex items-center space-x-4">
                            <div className="w-2 h-2 bg-hvr"></div>
                            <p>Handcrafted Excellence</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-2 h-2 bg-hvr"></div>
                            <p>Sustainable Materials</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-2 h-2 bg-hvr"></div>
                            <p>Timeless Design</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;