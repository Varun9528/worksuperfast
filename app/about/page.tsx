'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function About() {
  const features = [
    {
      icon: 'ri-shield-check-line',
      title: 'Secure Platform',
      description: 'Advanced security measures with verified contractors and secure payment processing.'
    },
    {
      icon: 'ri-time-line',
      title: 'Quick Responses',
      description: 'Get connected with skilled professionals within minutes of posting your work.'
    },
    {
      icon: 'ri-award-line',
      title: 'Quality Assurance',
      description: 'All contractors are verified and rated by previous clients for quality work.'
    },
    {
      icon: 'ri-customer-service-2-line',
      title: '24/7 Support',
      description: 'Round-the-clock customer support to help you with any queries or issues.'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Active Users' },
    { number: '10,000+', label: 'Verified Contractors' },
    { number: '100,000+', label: 'Jobs Completed' },
    { number: '4.8/5', label: 'Average Rating' }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'CEO & Founder',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Indian%20businessman%20CEO%20portrait%20in%20formal%20suit%20smiling%20confidently%20against%20modern%20office%20background%20with%20clean%20lighting%20corporate%20headshot%20style&width=300&height=400&seq=ceo-portrait&orientation=portrait',
      bio: 'Leading WorkSuperFast with 15+ years of experience in technology and business development.'
    },
    {
      name: 'Priya Sharma',
      role: 'CTO',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Indian%20woman%20technology%20executive%20CTO%20portrait%20in%20business%20attire%20smiling%20confidently%20modern%20office%20background%20clean%20corporate%20headshot%20style&width=300&height=400&seq=cto-portrait&orientation=portrait',
      bio: 'Technology visionary with expertise in building scalable platforms and secure systems.'
    },
    {
      name: 'Amit Patel',
      role: 'Head of Operations',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Indian%20businessman%20operations%20manager%20portrait%20in%20formal%20shirt%20smiling%20confidently%20against%20modern%20office%20background%20clean%20corporate%20headshot%20style&width=300&height=400&seq=operations-head&orientation=portrait',
      bio: 'Operations expert ensuring smooth platform functionality and contractor relations.'
    },
    {
      name: 'Deepika Reddy',
      role: 'Head of Marketing',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Indian%20woman%20marketing%20executive%20portrait%20in%20business%20attire%20smiling%20confidently%20modern%20office%20background%20clean%20corporate%20headshot%20style&width=300&height=400&seq=marketing-head&orientation=portrait',
      bio: 'Marketing strategist focused on connecting skilled professionals with opportunities.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About WorkSuperFast
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Connecting skilled professionals with work opportunities across India. 
              Building trust, ensuring quality, and empowering communities.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To create a trusted platform that connects skilled professionals with meaningful work opportunities, 
              fostering economic growth and community development across India.
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
                className="bg-white p-6 rounded-xl shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${feature.icon} text-2xl text-blue-600`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
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
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate professionals dedicated to revolutionizing the way work gets done
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="h-64 bg-gray-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Story
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-6">
                  WorkSuperFast was founded in 2023 with a simple vision: to bridge the gap between skilled professionals 
                  and those who need their services. We recognized that despite India's vast talent pool, many skilled 
                  workers struggled to find consistent work opportunities, while consumers faced challenges in finding 
                  reliable service providers.
                </p>
                
                <p className="text-gray-600 mb-6">
                  Our platform was built with security, transparency, and efficiency at its core. We implemented 
                  comprehensive verification processes, secure payment systems, and a rating mechanism that ensures 
                  quality work and fair compensation for all parties involved.
                </p>
                
                <p className="text-gray-600 mb-6">
                  Today, WorkSuperFast serves thousands of users across India, from IT professionals to construction 
                  workers, from electricians to gardeners. We're proud to have facilitated over 100,000 successful 
                  work connections and contributed to the economic empowerment of countless individuals.
                </p>
                
                <p className="text-gray-600">
                  As we continue to grow, we remain committed to our core values: trust, quality, and community. 
                  We're not just a platform; we're a movement towards a more connected and prosperous India.
                </p>
              </div>
            </div>
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
              Join Our Growing Community
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Whether you're looking for work or need skilled professionals, WorkSuperFast is here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/search-work"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap"
              >
                Find Work
              </Link>
              <Link 
                href="/post-work"
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors cursor-pointer whitespace-nowrap"
              >
                Post Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}