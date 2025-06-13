import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Github, Youtube, ArrowUp, Send, Waves } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Mission', href: '/mission' },
    { name: 'Projects', href: '/projects' },
    { name: 'Get Involved', href: '/get-involved' },
    { name: 'Donate', href: '/donate' },
  ];

  const resources = [
    { name: 'Ocean Facts', href: '/resources/facts' },
    { name: 'Research', href: '/resources/research' },
    { name: 'News & Updates', href: '/news' },
    { name: 'Impact Reports', href: '/impact' },
    { name: 'Partners', href: '/partners' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset success message after a delay
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Wave separator */}
      <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden">
        <svg className="absolute bottom-0 w-full h-20 text-blue-900 fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
      
      <div className="pt-32 bg-gradient-to-b from-blue-900 to-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Newsletter Section */}
          <div className="relative mb-16 bg-gradient-to-r from-blue-800 to-blue-700 rounded-2xl p-8 shadow-xl overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute right-0 -top-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
              <div className="absolute left-0 -bottom-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
                <p className="text-blue-200">Join our newsletter to receive the latest news, updates, and opportunities to get involved.</p>
              </div>
              
              <form onSubmit={handleSubscribe} className="w-full max-w-md flex">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full py-3 pl-4 pr-12 bg-white/10 backdrop-blur-sm border border-blue-400/30 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-blue-200"
                    required
                    disabled={isSubmitting || isSubmitted}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                    <Mail className="h-5 w-5 text-blue-300" />
                  </div>
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-r-lg transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </motion.div>
                  ) : isSubmitted ? (
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </form>
            </div>
            
            {isSubmitted && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 text-center text-sm text-blue-200"
              >
                Thanks for subscribing! We've sent a confirmation email.
              </motion.div>
            )}
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Waves className="h-8 w-8 text-blue-400" />
                <h3 className="text-2xl font-bold">BlueTech Revolution</h3>
              </div>
              <p className="text-blue-200 leading-relaxed">
                Pioneering innovative solutions for ocean cleaning and marine conservation.
                Together, we can make our oceans cleaner and healthier.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-blue-800/50 hover:bg-blue-700 text-blue-300 hover:text-white rounded-full transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                  >
                    <a 
                      href={link.href}
                      className="text-blue-200 hover:text-white transition-colors inline-flex items-center"
                    >
                      <motion.span
                        className="inline-block w-2 h-2 bg-blue-400 rounded-full mr-2"
                        whileHover={{ scale: 1.5 }}
                      />
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Resources</h4>
              <ul className="space-y-3">
                {resources.map((resource, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                  >
                    <a 
                      href={resource.href}
                      className="text-blue-200 hover:text-white transition-colors inline-flex items-center"
                    >
                      <motion.span
                        className="inline-block w-2 h-2 bg-blue-400 rounded-full mr-2"
                        whileHover={{ scale: 1.5 }}
                      />
                      {resource.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3"
              >
                <div className="p-2 bg-blue-800/50 text-blue-300 rounded-full">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="text-blue-200">contact@bluetechrevolution.com</span>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3"
              >
                <div className="p-2 bg-blue-800/50 text-blue-300 rounded-full">
                  <Phone className="h-5 w-5" />
                </div>
                <span className="text-blue-200">+1 (555) 123-4567</span>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-start space-x-3"
              >
                <div className="p-2 bg-blue-800/50 text-blue-300 rounded-full mt-1">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="text-blue-200">123 Ocean Drive, Marine City, MC 12345</span>
              </motion.div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="relative border-t border-blue-800 py-8">
            <div className="absolute right-0 bottom-20">
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-blue-700 hover:bg-blue-600 text-white rounded-full shadow-lg transition-colors"
              >
                <ArrowUp className="h-5 w-5" />
              </motion.button>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-blue-200 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <p>© {currentYear} BlueTech Revolution. All rights reserved.</p>
                <div className="hidden sm:block w-1 h-1 bg-blue-400 rounded-full"></div>
                <p className="text-sm">Protecting oceans for future generations</p>
              </div>
              
              <div className="flex space-x-6">
                <a href="/privacy" className="text-blue-200 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-blue-200 hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="/sitemap" className="text-blue-200 hover:text-white transition-colors">
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
