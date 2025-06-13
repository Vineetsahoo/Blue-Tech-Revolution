import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart, Users, Globe, ArrowRight, Send } from 'lucide-react';
import ContactForm from './ContactForm';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function Contact() {
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [isNewsletterSubmitted, setIsNewsletterSubmitted] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);

  const statistics = [
    { icon: Users, value: '10K+', label: 'Volunteers Worldwide' },
    { icon: Globe, value: '50+', label: 'Countries Reached' },
    { icon: Heart, value: '100+', label: 'Projects Completed' },
  ];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewsletterSubmitting(true);
    // Add newsletter submission logic here
    setTimeout(() => {
      setIsNewsletterSubmitting(false);
      setIsNewsletterSubmitted(true);
    }, 1000);
  };

  return (
    <motion.section 
      id="contact" 
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="py-20 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100/50"></div>
        <svg className="absolute top-0 left-0 w-full h-64 text-blue-100 fill-current transform rotate-180" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" opacity="0.3"></path>
        </svg>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-300/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-cyan-300/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div 
          variants={itemVariants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4 shadow-sm">
            Connect With Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Get Involved in Our <span className="text-blue-600">Mission</span>
          </h2>
          <p className="text-xl text-gray-600">
            Join us in our journey to revolutionize ocean conservation through innovation and collaboration
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)" }}
              className="bg-white p-6 rounded-xl shadow-lg text-center transform transition-all duration-300"
            >
              <div className="relative">
                <div className="p-4 bg-blue-100 rounded-full inline-flex mb-4 relative">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                  <div className="absolute inset-0 bg-blue-600/10 rounded-full blur-md"></div>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {stat.value}
              </h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="bg-white shadow-xl p-8 rounded-2xl border border-gray-100"
          >
            <ContactForm />
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Map */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg h-64 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.315540303!2d-74.25987584570312!3d40.69767006766623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1645468227400!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy"
                className="grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
                <h3 className="font-medium text-gray-900">Headquarters</h3>
                <p className="text-sm text-gray-600">123 Ocean Drive, Marine City</p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Contact Information</h3>
              
              <div className="space-y-5">
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <a href="mailto:contact@bluetechrevolution.com" className="text-blue-600 hover:underline">contact@bluetechrevolution.com</a>
                    <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                    <a href="tel:+15551234567" className="text-blue-600 hover:underline">+1 (555) 123-4567</a>
                    <p className="text-sm text-gray-500 mt-1">Mon-Fri from 9am to 5pm EST</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Location</h4>
                    <p className="text-gray-700">123 Ocean Drive, Marine City, MC 12345</p>
                    <a href="https://goo.gl/maps/yourlink" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm flex items-center gap-1 mt-1">
                      Get directions
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Social Media & Newsletter */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl">
              <h3 className="text-xl font-bold mb-6">Connect With Us</h3>
              
              <div className="flex space-x-4 mb-8">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ y: -4, scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
              
              <div>
                <h4 className="font-medium text-lg mb-3">Subscribe to Our Newsletter</h4>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-blue-100"
                      required
                      disabled={isNewsletterSubmitting || isNewsletterSubmitted}
                    />
                    {isNewsletterSubmitted && (
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isNewsletterSubmitting || isNewsletterSubmitted}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium disabled:opacity-70 flex items-center"
                  >
                    {isNewsletterSubmitting ? (
                      <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </motion.button>
                </form>
                
                {isNewsletterSubmitted && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-blue-100 mt-2"
                  >
                    Thank you for subscribing! Check your inbox for confirmation.
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Support Options */}
        <motion.div variants={itemVariants} className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Support Our Cause</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                type: 'Monthly',
                icon: '🔄',
                description: 'Ongoing support with monthly donations'
              }, 
              {
                type: 'One-time', 
                icon: '🎁',
                description: 'Single contribution to our initiatives'
              }, 
              {
                type: 'Corporate', 
                icon: '🏢',
                description: 'Partnership opportunities for businesses'
              }
            ].map((type, index) => (
              <motion.div
                key={type.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-4">{type.icon}</div>
                <h4 className="text-xl font-semibold mb-3">{type.type} Donation</h4>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <motion.button 
                  whileHover={{ x: 5 }}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
                >
                  Learn More <ArrowRight className="h-4 w-4 ml-2" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Programs Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Volunteer Programs",
              description: "Join our beach cleanup events and marine conservation programs.",
              icon: "🌊",
              color: "from-blue-500 to-cyan-500"
            },
            {
              title: "Education Initiatives",
              description: "Participate in workshops and awareness programs about ocean conservation.",
              icon: "🎓",
              color: "from-green-500 to-teal-500"
            },
            {
              title: "Partner With Us",
              description: "Collaborate with us on environmental projects and initiatives.",
              icon: "🤝",
              color: "from-purple-500 to-indigo-500"
            }
          ].map((program, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-lg relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${program.color} opacity-10 rounded-full transform translate-x-5 -translate-y-5`}></div>
              <div className="text-3xl mb-3">{program.icon}</div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">{program.title}</h3>
              <p className="text-gray-600">{program.description}</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                  Get Involved <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          variants={itemVariants}
          className="mt-20 bg-white rounded-2xl p-8 shadow-xl"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
          
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                question: "How can I get involved?",
                answer: "You can volunteer for our cleanup events, donate to support our initiatives, or spread awareness about ocean conservation in your community."
              },
              {
                question: "Where do my donations go?",
                answer: "Your contributions directly fund our ocean cleanup operations, research initiatives, and educational programs aimed at marine conservation."
              },
              {
                question: "Do you offer corporate partnerships?",
                answer: "Yes, we collaborate with businesses committed to sustainability. Contact us to discuss how we can work together."
              },
              {
                question: "How do I join a beach cleanup?",
                answer: "Check our Events page for upcoming cleanups in your area, or contact us to organize one in your community."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-blue-50 p-6 rounded-xl"
              >
                <h4 className="text-lg font-semibold mb-3 text-gray-900">{faq.question}</h4>
                <p className="text-gray-700">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}