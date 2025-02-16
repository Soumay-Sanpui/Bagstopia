import React from 'react';

const PrivacyPolicyPage = () => {
    const sections = [
        {
            title: "Information We Collect",
            content: "We collect information you provide directly to us, including name, email address, shipping address, and payment information when you make a purchase. We also automatically collect certain information about your device when you use our services."
        },
        {
            title: "How We Use Your Information",
            content: "We use the information we collect to process your orders, send you marketing communications (with your consent), improve our services, and comply with legal obligations."
        },
        {
            title: "Information Sharing",
            content: "We do not sell your personal information. We share your information only with service providers who assist in our operations, and when required by law."
        },
        {
            title: "Your Rights",
            content: "You have the right to access, correct, or delete your personal information. You can also opt out of marketing communications at any time."
        },
        {
            title: "Security",
            content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access or disclosure."
        }
    ];

    return (
        <div className="min-h-screen py-16 px-4 font-julius">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-16">Privacy Policy</h1>
                
                <div className="space-y-12">
                    <p className="text-gray-600 leading-relaxed">
                        At Bags-Topia, we take your privacy seriously. This Privacy Policy describes how we collect, use, 
                        and protect your personal information when you use our services.
                    </p>

                    {sections.map((section, index) => (
                        <div key={index} className="border-l-4 border-hvr pl-6 py-2">
                            <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                            <p className="text-gray-600 leading-relaxed">{section.content}</p>
                        </div>
                    ))}

                    <div className="bg-gray-50 p-6 rounded-sm">
                        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                        <p className="text-gray-600 leading-relaxed">
                            If you have any questions about our Privacy Policy, please contact us at:
                            <br />
                            Email: privacy@bagstopia.com
                            <br />
                            Address: 123 Luxury Avenue, New York, NY 10001
                        </p>
                    </div>

                    <p className="text-gray-500 text-sm">
                        Last updated: March 2024
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage