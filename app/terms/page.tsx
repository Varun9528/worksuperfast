'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Terms() {
  const sections = [
    {
      title: 'Work Policy',
      content: `All work posted on WorkSuperFast must be legal, ethical, and comply with local laws. Work providers must provide accurate descriptions, fair payment terms, and clear requirements. Contractors must deliver quality work within agreed timelines and maintain professional standards.`
    },
    {
      title: 'Payment Terms',
      content: `WorkSuperFast charges a 3% platform fee on all transactions. Payments are processed securely through our integrated payment system. Contractors receive 97% of the agreed payment amount after successful job completion. Dispute resolution is available for payment-related issues.`
    },
    {
      title: 'Platform Fee Rule',
      content: `The 3% platform fee is automatically deducted from all payments to cover platform maintenance, security, payment processing, and customer support. This fee is non-refundable and applies to all successful transactions on the platform.`
    },
    {
      title: 'Data Usage & Privacy',
      content: `We collect and use personal information to provide our services, including profile creation, job matching, and payment processing. Your data is protected with industry-standard security measures. We do not share personal information with third parties without consent, except as required by law.`
    },
    {
      title: 'Fraud Prevention',
      content: `WorkSuperFast employs multiple verification systems to prevent fraud. Users must provide valid identification for contractor registration. Fake profiles, fraudulent job postings, and payment fraud are strictly prohibited and may result in account suspension and legal action.`
    },
    {
      title: 'Admin Rights',
      content: `WorkSuperFast administrators have the right to review, approve, or reject job postings and contractor applications. Admins can suspend or terminate accounts for violations of terms of service, investigate complaints, and make final decisions on dispute resolutions.`
    },
    {
      title: 'Referral Program',
      content: `Users can earn ₹100 for each successful referral when the referred person completes their first verified job. Referral rewards are processed within 7 days of job completion. Self-referrals, fake referrals, and referral fraud are prohibited.`
    },
    {
      title: 'Location Tracking',
      content: `GPS location data is used to match jobs with nearby contractors and verify work completion. Location data is collected only with user permission and is used solely for platform functionality. Users can disable location services but may have limited access to location-based features.`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600">
              Please read these terms carefully before using WorkSuperFast
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Last updated: January 2024
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to WorkSuperFast</h2>
              <p className="text-gray-600 mb-6">
                These Terms of Service govern your use of the WorkSuperFast platform. By accessing or using our services, 
                you agree to be bound by these terms. If you disagree with any part of these terms, please do not use our platform.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Important Notice</h3>
                <p className="text-blue-800">
                  WorkSuperFast is a platform that connects work providers with skilled contractors. We facilitate connections 
                  but are not responsible for the actual work performed or disputes between parties.
                </p>
              </div>
            </div>
          </motion.div>
          
          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8 mt-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Termination</h2>
            <p className="text-gray-600 mb-6">
              You may terminate your account at any time by contacting our support team. WorkSuperFast reserves the right 
              to suspend or terminate accounts that violate these terms or engage in fraudulent activities.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-600 mb-6">
              We may update these terms from time to time. Users will be notified of significant changes via email or 
              platform notifications. Continued use of the platform after changes constitutes acceptance of the new terms.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-600 mb-4">
              If you have questions about these terms, please contact us:
            </p>
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center space-x-2">
                <i className="ri-mail-line text-blue-600"></i>
                <span>support@worksuperfast.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-phone-line text-blue-600"></i>
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-map-pin-line text-blue-600"></i>
                <span>123 Business Tower, Sector 18, Noida, UP 201301</span>
              </div>
            </div>
          </motion.div>
          
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">
              By using WorkSuperFast, you acknowledge that you have read, understood, and agree to these Terms of Service.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}