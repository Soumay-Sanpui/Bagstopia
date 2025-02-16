"use client";

import Link from "next/link";
import { FaUser, FaFilter, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import FilterModal from './FilterModal';
import { usePathname } from 'next/navigation';
import { logoutUser } from '@/utils/actions/userActions';

const Navbar = () => {
    const [isFilterModalOpen, setFilterModalOpen] = useState(false);
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user cookie exists and parse it
        const cookies = document.cookie.split(';');
        const userCookie = cookies.find(cookie => cookie.trim().startsWith('user='));
        if (userCookie) {
            try {
                const userData = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
                if (userData) {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error('Error parsing user cookie:', error);
            }
        }
    }, []);

    const handleLogout = async () => {
        const response = await logoutUser();
        if (response.success) {
            setIsLoggedIn(false);
            window.location.href = '/login';
        }
    };

    const NavLinks = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "Trending Now",
            href: "/trending",
        },
        {
            name: "New Releases",
            href: "/new-releases",
        },
        {
            name: "Contact",
            href: "/contact",
        },
        {
            name: "About",
            href: "/about",
        },
    ];

    return (
        <>
            <nav className="bg-background p-4 shadow-sm mb-4 select-none">
                <h3 className="text-2xl text-center font-bold my-4 font-julius">Bags-Topia</h3>
                <div className="flex items-center justify-center">
                    <ul className="flex space-x-4 ml-1">
                        {NavLinks.map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className={pathname === link.href ? 'text-hvr' : 'hover:text-hvr'}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="flex space-x-4 absolute right-5">
                        <span title="User">
                            <FaUser className="hover:text-hvr cursor-pointer" />
                        </span>
                        <span onClick={() => setFilterModalOpen(true)} title="Filter">
                            <FaFilter className="hover:text-hvr cursor-pointer" />
                        </span>
                        <Link href="/cart" title="Cart">
                            <FaShoppingCart className="hover:text-hvr cursor-pointer" />
                        </Link>
                        {isLoggedIn && (
                            <span onClick={handleLogout} title="Logout" className="hover:text-hvr cursor-pointer">
                                <FaSignOutAlt />
                            </span>
                        )}
                    </div>
                </div>
            </nav>
            <FilterModal isOpen={isFilterModalOpen} onClose={() => setFilterModalOpen(false)} />
        </>
    );
};

export default Navbar;
