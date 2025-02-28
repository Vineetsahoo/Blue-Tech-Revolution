import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart, Users, Globe, ArrowRight } from 'lucide-react';
import ContactForm from './ContactForm';
import { motion } from 'framer-motion';

export default function Contact() {
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);

  const statistics = [
    { icon: Users, value: '10K+', label: 'Volunteers Worldwide' },
    { icon: Globe, value: '50+', label: 'Countries Reached' },
    { icon: Heart, value: '100+', label: 'Projects Completed' },
  ];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewsletterSubmitting(true);
    // Add newsletter submission logic here
    setTimeout(() => setIsNewsletterSubmitting(false), 1000);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg text-center"
            >
              <stat.icon className="h-8 w-8 mx-auto text-blue-600 mb-4" />
              <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Get Involved
          </h2>
          <p className="text-xl text-gray-700 mb-6">
            Join us in our mission to clean the oceans
          </p>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-600 mb-8">
              Every contribution matters in our fight against ocean pollution. Whether you want to volunteer,
              donate, or spread awareness, there are many ways to make a difference.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white shadow-xl p-8 rounded-xl"
          >
            <ContactForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="text-gray-700">contact@bluetechrevolution.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Phone</h3>
                <p className="text-gray-700">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Location</h3>
                <p className="text-gray-700">123 Ocean Drive, Marine City, MC 12345</p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex space-x-6">
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Subscribe to Our Newsletter</h3>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  disabled={isNewsletterSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                >
                  {isNewsletterSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Support Our Cause</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Monthly', 'One-time', 'Corporate'].map((type, index) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <h4 className="text-xl font-semibold mb-3">{type} Donation</h4>
                <p className="text-gray-600 mb-4">Support our mission with a {type.toLowerCase()} contribution</p>
                <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                  Learn More <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
        >
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Volunteer Programs</h3>
            <p className="text-gray-600">Join our beach cleanup events and marine conservation programs.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Education Initiatives</h3>
            <p className="text-gray-600">Participate in workshops and awareness programs about ocean conservation.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Partner With Us</h3>
            <p className="text-gray-600">Collaborate with us on environmental projects and initiatives.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}