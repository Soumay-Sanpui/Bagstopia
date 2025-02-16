'use client';
import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const contactInfo = [
        {
            icon: <FaPhone />,
            title: 'Phone',
            details: ['+1 (555) 123-4567', '+1 (555) 765-4321']
        },
        {
            icon: <FaEnvelope />,
            title: 'Email',
            details: ['support@bagstopia.com', 'info@bagstopia.com']
        },
        {
            icon: <FaMapMarkerAlt />,
            title: 'Location',
            details: ['123 Luxury Avenue', 'New York, NY 10001']
        },
        {
            icon: <FaClock />,
            title: 'Business Hours',
            details: ['Mon - Fri: 9AM - 6PM', 'Sat - Sun: 10AM - 4PM']
        }
    ];

    return (
        <div className="min-h-screen py-16 px-4 font-julius">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                <p className="font-poppins text-gray-600 max-w-2xl mx-auto">
                    We'd love to hear from you. Please fill out the form below or use our contact information to reach us.
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Contact Information */}
                <div className="md:col-span-1 space-y-8">
                    {contactInfo.map((info, index) => (
                        <div key={index} className="flex items-start space-x-4">
                            <div className="text-hvr text-xl mt-1">{info.icon}</div>
                            <div>
                                <h3 className="font-bold mb-2">{info.title}</h3>
                                {info.details.map((detail, idx) => (
                                    <p key={idx} className="text-gray-600">{detail}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Name</label>
                            <input
                                type="text"
                                required
                                className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-hvr"
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-hvr"
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Subject</label>
                        <input
                            type="text"
                            required
                            className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-hvr"
                            onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Message</label>
                        <textarea
                            rows="6"
                            required
                            className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-hvr"
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                        ></textarea>
                    </div>
                    <button type="submit" className="bg-hvr text-white px-8 py-3 rounded-sm hover:bg-opacity-90 transition-colors">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage; 