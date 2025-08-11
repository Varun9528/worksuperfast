
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  const features = [
    {
      icon: 'ri-search-eye-line',
      title: 'Find Work Instantly',
      description: 'Browse thousands of verified work opportunities across all categories and locations.',
    },
    {
      icon: 'ri-user-add-line',
      title: 'Hire Skilled Contractors',
      description: 'Connect with verified contractors with ratings, reviews, and proven experience.',
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Secure Payments',
      description: 'Safe and secure payment system with dispute resolution and money-back guarantee.',
    },
    {
      icon: 'ri-time-line',
      title: 'Quick Response',
      description: 'Get responses within minutes from interested contractors or work providers.',
    },
  ];

  const categories = [
    { name: 'Information Technology', icon: 'ri-computer-line', count: '2,450+' },
    { name: 'Construction', icon: 'ri-building-line', count: '1,890+' },
    { name: 'Electrical', icon: 'ri-flashlight-line', count: '1,320+' },
    { name: 'Plumbing', icon: 'ri-drop-line', count: '980+' },
    { name: 'Carpentry', icon: 'ri-hammer-line', count: '760+' },
    { name: 'Painting', icon: 'ri-palette-line', count: '650+' },
    { name: 'Cleaning', icon: 'ri-brush-line', count: '540+' },
    { name: 'Gardening', icon: 'ri-plant-line', count: '430+' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section 
        className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Professional%20workers%20and%20contractors%20in%20modern%20office%20environment%20with%20laptops%20and%20construction%20tools%2C%20blue%20corporate%20background%20with%20clean%20minimal%20design%2C%20people%20collaborating%20on%20projects%2C%20bright%20lighting%2C%20professional%20photography%20style&width=1920&height=800&seq=hero-main&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-blue-900/70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Find Work & Hire Talent
              <br />
              <span className="text-yellow-400">Super Fast</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            >
              Connect with skilled contractors and find verified work opportunities across India. 
              Secure payments, instant responses, and trusted community.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link 
                href="/search-work"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-search-line mr-2"></i>
                Search Work
              </Link>
              <Link 
                href="/post-work"
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-add-circle-line mr-2"></i>
                Post Work
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose WorkSuperFast?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The most trusted platform connecting skilled professionals with work opportunities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <i className={`${feature.icon} text-2xl text-blue-600`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore work opportunities across various industries and skill sets
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <i className={`${category.icon} text-2xl text-blue-600 group-hover:text-white`}></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} jobs available</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of professionals and businesses who trust WorkSuperFast for their work needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/register"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap"
              >
                Join as Professional
              </Link>
              <Link 
                href="/post-work"
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors cursor-pointer whitespace-nowrap"
              >
                Post Your First Job
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
