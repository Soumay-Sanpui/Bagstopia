import React from 'react';
import { FaTimes, FaFilter, FaSort, FaStar, FaTag, FaShippingFast, FaRegCreditCard } from 'react-icons/fa';

const FilterModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const priceRanges = [
        "Under ₹1,000",
        "₹1,000 - ₹2,000",
        "₹2,000 - ₹5,000",
        "₹5,000 - ₹10,000",
        "Above ₹10,000"
    ];

    const materials = [
        "Genuine Leather",
        "Premium Synthetic",
        "Canvas",
        "Nylon",
        "Suede",
        "Vegan Leather",
        "Polyester",
        "Ballistic Nylon",
        "Microfiber",
        "Coated Canvas"
    ];

    const styles = [
        "Classic",
        "Contemporary",
        "Minimalist",
        "Vintage",
        "Luxury",
        "Casual",
        "Bohemian",
        "Professional",
        "Sporty",
        "Avant-garde"
    ];

    const occasions = [
        "Business",
        "Travel",
        "Casual",
        "Evening",
        "Sports",
        "Special Events",
        "Weekend",
        "Daily Commute",
        "Outdoor Adventure",
        "Formal Events"
    ];

    const sizes = [
        "Mini (Under 20L)",
        "Small (20-30L)",
        "Medium (30-40L)",
        "Large (40-50L)",
        "Extra Large (50L+)"
    ];

    const brands = [
        "Premium Collection",
        "Luxury Line",
        "Heritage Series",
        "Modern Elite",
        "Classic Edition",
        "Designer Series"
    ];

    const ratings = ["5 Stars", "4+ Stars", "3+ Stars", "2+ Stars"];

    const additionalFeatures = [
        {
            title: "Security Features",
            options: [
                "Anti-theft Design",
                "RFID Protection",
                "Hidden Compartments",
                "Security Locks",
                "Cut-resistant Material"
            ]
        },
        {
            title: "Convenience",
            options: [
                "Water Resistant",
                "Laptop Compartment",
                "USB Charging Port",
                "Bottle Holder",
                "Easy Access Pockets",
                "Trolley Sleeve"
            ]
        },
        {
            title: "Comfort Features",
            options: [
                "Padded Straps",
                "Ergonomic Design",
                "Weight Distribution",
                "Breathable Back",
                "Adjustable Straps"
            ]
        }
    ];

    const sortingOptions = [
        "Price: Low to High",
        "Price: High to Low",
        "Newest First",
        "Most Popular",
        "Best Rated",
        "Featured"
    ];

    const colorOptions = [
        { name: "Black", hex: "#000000" },
        { name: "Brown", hex: "#964B00" },
        { name: "Navy", hex: "#000080" },
        { name: "Burgundy", hex: "#800020" },
        { name: "Tan", hex: "#D2B48C" },
        { name: "Grey", hex: "#808080" },
        { name: "White", hex: "#FFFFFF" },
        { name: "Gold", hex: "#FFD700" },
        { name: "Silver", hex: "#C0C0C0" },
        { name: "Rose Gold", hex: "#B76E79" }
    ];

    const hardwareFinishes = [
        "Gold-tone",
        "Silver-tone",
        "Brushed Metal",
        "Antique Brass",
        "Matte Black",
        "Rose Gold",
        "Gunmetal"
    ];

    const specialEditions = [
        "Limited Edition",
        "Seasonal Collection",
        "Anniversary Edition",
        "Collaboration Series",
        "Exclusive Release",
        "Custom Made"
    ];

    const sustainability = [
        "Eco-friendly Materials",
        "Sustainable Production",
        "Recycled Materials",
        "Biodegradable",
        "Ethical Manufacturing",
        "Zero Waste Packaging"
    ];

    const priceSliderConfig = {
        min: 0,
        max: 50000,
        step: 1000
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 backdrop-blur-sm">
            <div className="bg-white w-[95%] md:w-[80%] lg:w-[70%] max-h-[90vh] overflow-y-auto rounded-sm border border-hvr shadow-2xl p-8">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-hvr pb-4 mb-6">
                    <div className="flex items-center gap-2">
                        <FaFilter className="text-hvr text-xl" />
                        <h2 className="text-2xl font-bold font-julius text-hvr">Advanced Filter</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-600 hover:text-hvr transition-colors">
                        <FaTimes className="text-xl" />
                    </button>
                </div>

                {/* Sort Options */}
                <div className="mb-8 border-b border-hvr pb-6">
                    <h3 className="font-julius text-lg mb-3 flex items-center gap-2">
                        <FaSort className="text-hvr" />
                        Sort By
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                        {sortingOptions.map((option, index) => (
                            <button
                                key={index}
                                className="px-4 py-2 border border-hvr text-sm rounded-sm hover:bg-hvr hover:text-white transition-colors font-poppins"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Column 1 */}
                    <div className="space-y-6">
                        {/* Price Range */}
                        <div className="mb-6">
                            <h3 className="font-julius text-lg mb-3 flex items-center gap-2">
                                <FaTag className="text-hvr" />
                                Price Range
                            </h3>
                            <div className="space-y-2">
                                {priceRanges.map((range, index) => (
                                    <label key={index} className="flex items-center gap-2 cursor-pointer hover:text-hvr transition-colors">
                                        <input type="checkbox" className="form-checkbox text-hvr rounded-sm focus:ring-hvr" />
                                        <span className="font-poppins">{range}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Materials */}
                        <div className="mb-6">
                            <h3 className="font-julius text-lg mb-3">Material</h3>
                            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                                {materials.map((material, index) => (
                                    <label key={index} className="flex items-center gap-2 cursor-pointer hover:text-hvr transition-colors">
                                        <input type="checkbox" className="form-checkbox text-hvr rounded-sm focus:ring-hvr" />
                                        <span className="font-poppins">{material}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Ratings */}
                        <div className="mb-6">
                            <h3 className="font-julius text-lg mb-3 flex items-center gap-2">
                                <FaStar className="text-hvr" />
                                Rating
                            </h3>
                            <div className="space-y-2">
                                {ratings.map((rating, index) => (
                                    <label key={index} className="flex items-center gap-2 cursor-pointer hover:text-hvr transition-colors">
                                        <input type="checkbox" className="form-checkbox text-hvr rounded-sm focus:ring-hvr" />
                                        <span className="font-poppins">{rating}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-6">
                        {/* Styles */}
                        <div className="mb-6">
                            <h3 className="font-julius text-lg mb-3">Style</h3>
                            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                                {styles.map((style, index) => (
                                    <label key={index} className="flex items-center gap-2 cursor-pointer hover:text-hvr transition-colors">
                                        <input type="checkbox" className="form-checkbox text-hvr rounded-sm focus:ring-hvr" />
                                        <span className="font-poppins">{style}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Occasions */}
                        <div className="mb-6">
                            <h3 className="font-julius text-lg mb-3">Occasion</h3>
                            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                                {occasions.map((occasion, index) => (
                                    <label key={index} className="flex items-center gap-2 cursor-pointer hover:text-hvr transition-colors">
                                        <input type="checkbox" className="form-checkbox text-hvr rounded-sm focus:ring-hvr" />
                                        <span className="font-poppins">{occasion}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Sizes */}
                        <div className="mb-6">
                            <h3 className="font-julius text-lg mb-3">Size</h3>
                            <div className="space-y-2">
                                {sizes.map((size, index) => (
                                    <label key={index} className="flex items-center gap-2 cursor-pointer hover:text-hvr transition-colors">
                                        <input type="checkbox" className="form-checkbox text-hvr rounded-sm focus:ring-hvr" />
                                        <span className="font-poppins">{size}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Column 3 */}
                    <div className="space-y-6">
                        {/* Brands */}
                        <div className="mb-6">
                            <h3 className="font-julius text-lg mb-3">Collections</h3>
                            <div className="space-y-2">
                                {brands.map((brand, index) => (
                                    <label key={index} className="flex items-center gap-2 cursor-pointer hover:text-hvr transition-colors">
                                        <input type="checkbox" className="form-checkbox text-hvr rounded-sm focus:ring-hvr" />
                                        <span className="font-poppins">{brand}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Additional Features Sections */}
                        {additionalFeatures.map((section, index) => (
                            <div key={index} className="mb-6">
                                <h3 className="font-julius text-lg mb-3">{section.title}</h3>
                                <div className="space-y-2">
                                    {section.options.map((option, optionIndex) => (
                                        <label key={optionIndex} className="flex items-center gap-2 cursor-pointer hover:text-hvr transition-colors">
                                            <input type="checkbox" className="form-checkbox text-hvr rounded-sm focus:ring-hvr" />
                                            <span className="font-poppins">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add after the existing three-column grid */}
                <div className="border-t border-hvr mt-8 pt-8">
                    {/* Color Selection */}
                    <div className="mb-8">
                        <h3 className="font-julius text-lg mb-4">Colors</h3>
                        <div className="flex flex-wrap gap-4">
                            {colorOptions.map((color, index) => (
                                <div key={index} className="flex flex-col items-center gap-2">
                                    <button
                                        className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-hvr transition-colors"
                                        style={{ backgroundColor: color.hex }}
                                        title={color.name}
                                    />
                                    <span className="text-xs font-poppins">{color.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Price Range Slider */}
                    <div className="mb-8">
                        <h3 className="font-julius text-lg mb-4">Price Range Slider</h3>
                        <div className="px-4">
                            <input
                                type="range"
                                min={priceSliderConfig.min}
                                max={priceSliderConfig.max}
                                step={priceSliderConfig.step}
                                className="w-full accent-hvr"
                            />
                            <div className="flex justify-between mt-2 text-sm font-poppins text-gray-600">
                                <span>₹{priceSliderConfig.min}</span>
                                <span>₹{priceSliderConfig.max}</span>
                            </div>
                        </div>
                    </div>

                    {/* Hardware Finish */}
                    <div className="mb-8">
                        <h3 className="font-julius text-lg mb-4">Hardware Finish</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {hardwareFinishes.map((finish, index) => (
                                <label key={index} className="flex items-center gap-2 cursor-pointer hover:text-hvr transition-colors">
                                    <input type="checkbox" className="form-checkbox text-hvr rounded-sm focus:ring-hvr" />
                                    <span className="font-poppins">{finish}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Special Editions */}
                    <div className="mb-8">
                        <h3 className="font-julius text-lg mb-4">Special Editions</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {specialEditions.map((edition, index) => (
                                <label key={index} className="flex items-center gap-2 cursor-pointer hover:text-hvr transition-colors">
                                    <input type="checkbox" className="form-checkbox text-hvr rounded-sm focus:ring-hvr" />
                                    <span className="font-poppins">{edition}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Sustainability */}
                    <div className="mb-8">
                        <h3 className="font-julius text-lg mb-4 flex items-center gap-2">
                            <span className="text-green-600">♻️</span>
                            Sustainability
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {sustainability.map((option, index) => (
                                <label key={index} className="flex items-center gap-2 cursor-pointer hover:text-hvr transition-colors">
                                    <input type="checkbox" className="form-checkbox text-hvr rounded-sm focus:ring-hvr" />
                                    <span className="font-poppins">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Advanced Options Toggle */}
                    <div className="mb-8">
                        <button className="flex items-center gap-2 text-hvr hover:text-opacity-80 transition-colors font-julius">
                            <span>Show Advanced Options</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center gap-4 mt-8 pt-6 border-t border-hvr">
                    <div className="text-sm text-gray-600 font-poppins">
                        <span className="text-hvr font-semibold">12</span> filters selected
                    </div>
                    <div className="flex gap-4">
                        <button 
                            onClick={onClose} 
                            className="px-6 py-2 border border-hvr text-hvr hover:bg-hvr hover:text-white transition-colors font-poppins"
                        >
                            Reset All
                        </button>
                        <button 
                            className="px-6 py-2 bg-hvr text-white hover:bg-opacity-90 transition-colors font-poppins flex items-center gap-2"
                        >
                            <span>Apply Filters</span>
                            <span className="bg-white text-hvr rounded-full text-xs px-2 py-0.5">12</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterModal; 