import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    const usefulLinks = [
        { name: 'Trending', href: '/trending' },
        { name: 'Contact', href: '/contact' },
        { name: 'About Us', href: '/about' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' }
    ];
    const socialLinks = [
        { name: 'Facebook', href: 'https://www.facebook.com', icon: <FaFacebook /> },
        { name: 'Instagram', href: 'https://www.instagram.com', icon: <FaInstagram /> },
        { name: 'Twitter', href: 'https://www.twitter.com', icon: <FaTwitter /> },
        { name: 'LinkedIn', href: 'https://www.linkedin.com', icon: <FaLinkedin /> }
    ];
    return (
        <>
        <footer className="border-t w-screen pt-16 pb-4 flex justify-between items-center mt-24">
            <div className='w-[40%] text-center'>
                <h2 className='text-2xl font-bold font-julius'>Bags-Topia</h2>
                <p>More than just a bag, it's a lifestyle</p>
            </div>
            <div className="border-r w-[10px] h-[30vh] border-gray-300 my-4"></div>
            <div className="flex space-x-4 w-[55%] justify-around">
                <div>
                    <h4 className='text-xl font-bold mb-4'>Useful Links</h4>
                    <ul className="space-y-2">
                        {usefulLinks.map((link) => (
                            <li key={link.name} className='hover:text-hvr w-max'>
                                <Link href={link.href}>{link.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className='text-xl font-bold mb-4'>Social Links</h4>
                    <ul className="space-y-2">
                        {socialLinks.map((link) => (
                            <li key={link.name} className='flex items-center gap-6 hover:text-hvr w-max'>
                                <span>{link.icon}</span>
                                <Link href={link.href}>{link.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='flex flex-col gap-2'>
                    <h4 className='text-xl font-bold mb-4'>Our Newsletter</h4>
                    <p className='w-[70%]'>Subscribe to newsletter to get amazing deals.</p>
                    <input type="email" placeholder='Enter your email' className='border outline-none border-gray-300 p-2 block w-[70%]' />
                    <button className='hover:bg-hvr border border-black hover:text-white hover:border-none transition-all duration-500 w-[70%] px-4 py-2'>Subscribe</button>
                </div>
            </div>
        </footer>
        <div className='flex justify-center items-center my-3 py-6 border-t'>
            <p>© 2025 <span className='font-bold font-julius'>BagsTopia</span>. All rights reserved.</p>
        </div>
        </>
    )
}

export default Footer