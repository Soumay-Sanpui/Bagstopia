"use client"
import Image from "next/image";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import useStore from '@/app/store'; // Import the Zustand store

const PrCard = ({name, price, image, colors, category, id }) => {
  const [isLiked, setIsLiked] = useState(false);
  const addToCart = useStore((state) => state.addToCart); // Get the addToCart function

  const handleHeartClick = () => {
    setIsLiked(!isLiked);
  };

  const handleAddToCart = () => {
    addToCart({ id, name, price, image, colors, category }); // Add product to cart
  };

  // Color mapping object
  const colorMap = {
    black: "bg-black",
    brown: "bg-amber-800",
    gray: "bg-gray-500",
    navy: "bg-navy-800",
    blue: "bg-blue-500",
    red: "bg-red-500",
    pink: "bg-pink-500",
    olive: "bg-olive-700",
    white: "bg-white"
  };

  return (
    <Link href={`/product/${id}`}>
      <div title="Product Card" className="select-none flex flex-col items-center justify-center gap-4 border w-max p-4 rounded-sm hover:bg-gray-50 hover:shadow-lg hover:scale-95 transition-all duration-500 hover:border-2 hover:border-black">
        <div title="Action Buttons" className="flex items-center justify-end gap-2 w-full">
          <div title="Like Button" className="border border-black rounded-full p-1">
            <FaHeart 
              title={isLiked ? 'Unlike' : 'Like'}
              className={`${isLiked ? 'text-red-500' : ' text-black'} cursor-pointer`} 
              onClick={handleHeartClick} 
            />
          </div>
          <div title="Add to Cart Button" className="border border-black rounded-full p-1">
            <FaShoppingCart 
              title="Add to Cart" 
              className="text-black cursor-pointer" 
              onClick={(e)=> {e.stopPropagation(); handleAddToCart();}} 
            />
          </div>
        </div>
        <Image
          title="Product Image"
          src={image}
          alt="product"
          width={300}
          height={300}
        />
        <div id="details" className="w-full">
          <div
            id="color-info"
            title="Color Options"
            className="w-full flex flex-col items-center justify-center gap-2"
          >
            <div className="flex gap-2">
              {colors.map((color) => (
                <div
                  key={color}
                  id="color-box"
                  title={color}
                  className={`${colorMap[color]} w-[20px] h-[20px] rounded-sm border border-black`}
                ></div>
              ))}
            </div>
            <div className="font-julius font-semibold text-center">
              <p title="Product Name">{name}</p>
              <p title="Product Price">
                <span>₹</span>
                <span>{price}</span>
              </p>
              <p title="Product Category" className="text-gray-500 capitalize">{category}</p>
              <button title="Buy Now" className="border border-black bg-black text-white p-2 px-4 hover:bg-white hover:text-black">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PrCard;
