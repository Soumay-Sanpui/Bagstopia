import React from 'react'
import Link from 'next/link'

const CategoryBar = () => {
    const categories = [
        {
            name: 'All',
            href: '/categories/all',
        },
        {
            name: 'Backpacks',
            href: '/categories/backpack',
        },
        {
            name: 'Trending',
            href: '/categories/trending',
        },
        {
            name: 'Shoulder Bags',
            href: '/categories/shoulder',
        },
        {
            name: 'New Arrivals',
            href: '/categories/new-arrivals',
        },
        {
            name: 'Travel Bags',
            href: '/categories/duffle',
        },
        {
            name: 'Laptop Bags',
            href: '/categories/sleeve',
        },
        {
            name: 'Casual Bags',
            href: '/categories/crossbody',
        }
    ]
  return (
    <div className='flex justify-around bg-gradient-to-r from-black to-hvr text-white p-4 text-sm font-julius items-center sticky top-0 z-10'>
        {
            categories.map((category, index) => (
                    <Link key={index} href={category.href} className='hover:underline underline-offset-4 cursor-pointer font-semibold'>
                        {category.name}
                    </Link>
            ))
        }
    </div>
  )
}

export default CategoryBar