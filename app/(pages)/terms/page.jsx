import React from 'react';
import { FaShieldAlt, FaHandshake, FaUserLock } from 'react-icons/fa';

const TermsPage = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using Bags-Topia's services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. These terms constitute a legally binding agreement between you and Bags-Topia."
    },
    {
      title: "2. Product Information",
      content: "While we strive to display our products as accurately as possible, the actual colors and details you see may vary depending on your monitor. We do not guarantee that your screen's display of any color will be accurate."
    },
    {
      title: "3. Pricing and Payment",
      content: "All prices are in Indian Rupees (₹) and are inclusive of applicable taxes. We reserve the right to modify prices without prior notice. Payment must be made in full before the delivery of any product."
    },
    {
      title: "4. Shipping and Delivery",
      content: "Delivery times may vary depending on your location. While we aim to deliver within the estimated timeframe, we cannot guarantee exact delivery dates. Risk of loss and title for items purchased pass to you upon delivery."
    },
    {
      title: "5. Returns and Refunds",
      content: "We accept returns within 14 days of delivery. Items must be unused and in their original packaging. Refunds will be processed within 7-10 business days after receiving the returned item."
    }
  ];

  const highlights = [
    {
      icon: <FaShieldAlt className="text-3xl text-hvr" />,
      title: "Secure Shopping",
      description: "Your security is our priority"
    },
    {
      icon: <FaHandshake className="text-3xl text-hvr" />,
      title: "Fair Policies",
      description: "Transparent terms for all"
    },
    {
      icon: <FaUserLock className="text-3xl text-hvr" />,
      title: "Privacy Protected",
      description: "Your data is safe with us"
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 font-julius">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
        <p className="font-poppins text-gray-600 max-w-2xl mx-auto">
          Please read these terms carefully before using our services.
        </p>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        {highlights.map((highlight, index) => (
          <div key={index} className="text-center p-8 border border-hvr rounded-sm hover:shadow-lg transition-shadow">
            <div className="mb-4">{highlight.icon}</div>
            <h3 className="text-xl font-bold mb-2">{highlight.title}</h3>
            <p className="text-gray-600 font-poppins">{highlight.description}</p>
          </div>
        ))}
      </div>

      {/* Terms Sections */}
      <div className="max-w-4xl mx-auto space-y-12">
        {sections.map((section, index) => (
          <div key={index} className="border-l-4 border-hvr pl-6 py-2 hover:shadow-lg transition-all duration-300 bg-white">
            <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
            <p className="text-gray-600 leading-relaxed font-poppins">{section.content}</p>
          </div>
        ))}

        {/* Additional Information */}
        <div className="bg-gray-50 p-8 rounded-sm border border-hvr mt-12">
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p className="text-gray-600 font-poppins">
            If you have any questions about these Terms and Conditions, please contact us at:
            <br />
            Email: legal@bagstopia.com
            <br />
            Phone: +1 (555) 123-4567
          </p>
        </div>

        <p className="text-gray-500 text-sm text-center pt-8">
          Last updated: March 2024
        </p>
      </div>
    </div>
  );
};

export default TermsPage;