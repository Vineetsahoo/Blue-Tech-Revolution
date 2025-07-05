import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Github, 
  ArrowUp, 
  Send, 
  Waves,
  Heart,
  Shield,
  Zap,
  Leaf,
  ExternalLink
} from 'lucide-react';
import { WaveBackground } from './AnimationUtils';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setEmail('');
    setIsSubmitting(false);
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Impact', href: '#impact' },
    { name: 'Contact', href: '#contact' },
  ];

  const solutions = [
    { name: 'Ocean Monitoring', href: '#solutions', icon: Waves },
    { name: 'Clean Energy', href: '#solutions', icon: Zap },
    { name: 'Ecosystem Restoration', href: '#solutions', icon: Leaf },
    { name: 'Environmental Protection', href: '#solutions', icon: Shield },
  ];

  const company = [
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Partners', href: '/partners' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ];

  const socialLinks = [
    { 
      name: 'Twitter', 
      icon: Twitter, 
      href: 'https://twitter.com/bluetechrev',
      color: 'hover:text-blue-400'
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      href: 'https://linkedin.com/company/bluetechrev',
      color: 'hover:text-blue-600'
    },
    { 
      name: 'GitHub', 
      icon: Github, 
      href: 'https://github.com/bluetechrev',
      color: 'hover:text-gray-800 dark:hover:text-gray-200'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 text-white overflow-hidden">
      <WaveBackground className="opacity-20" />
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Company Info & Newsletter */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
              {/* Logo and Description */}
              <div>
                <motion.div
                  className="flex items-center space-x-3 mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center"
                    >
                      <Waves className="w-7 h-7 text-white" />
                    </motion.div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 animate-ping opacity-20"></div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold gradient-text">BlueTech Revolution</h2>
                    <p className="text-sm text-cyan-300">Environmental Innovation</p>
                  </div>
                </motion.div>
                
                <p className="text-gray-300 leading-relaxed max-w-md">
                  Pioneering sustainable technologies to protect our oceans, generate clean energy, 
                  and create a better future for generations to come.
                </p>
              </div>

              {/* Newsletter Signup */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
                <p className="text-gray-300 mb-4 text-sm">
                  Get the latest news about our environmental initiatives and technological breakthroughs.
                </p>
                
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent placeholder-gray-400 text-white backdrop-blur-sm transition-all duration-300"
                    />
                    <motion.button
                      type="submit"
                      disabled={isSubmitting || isSubmitted}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300 disabled:opacity-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isSubmitting ? (
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : isSubmitted ? (
                        'Subscribed!'
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm block"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>

              <h4 className="text-md font-semibold mt-8 mb-4">Our Solutions</h4>
              <ul className="space-y-3">
                {solutions.map((solution) => (
                  <li key={solution.name}>
                    <motion.a
                      href={solution.href}
                      className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm"
                      whileHover={{ x: 5 }}
                    >
                      <solution.icon className="w-4 h-4" />
                      <span>{solution.name}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company & Contact */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-3 mb-8">
                {company.map((item) => (
                  <li key={item.name}>
                    <motion.a
                      href={item.href}
                      className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm"
                      whileHover={{ x: 5 }}
                    >
                      <span>{item.name}</span>
                      <ExternalLink className="w-3 h-3" />
                    </motion.a>
                  </li>
                ))}
              </ul>

              {/* Contact Info */}
              <div className="space-y-4">
                <h4 className="text-md font-semibold">Contact Info</h4>
                <div className="space-y-3 text-sm">
                  <motion.div 
                    className="flex items-center space-x-3 text-gray-300"
                    whileHover={{ x: 5 }}
                  >
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <span>hello@bluetechrevolution.com</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center space-x-3 text-gray-300"
                    whileHover={{ x: 5 }}
                  >
                    <Phone className="w-4 h-4 text-cyan-400" />
                    <span>+1 (555) 123-4567</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center space-x-3 text-gray-300"
                    whileHover={{ x: 5 }}
                  >
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span>San Francisco, CA</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-white/10 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              
              {/* Copyright */}
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>© {currentYear} BlueTech Revolution.</span>
                <span>Made with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart className="w-4 h-4 text-red-400 fill-current" />
                </motion.div>
                <span>for our planet.</span>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-6">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 transition-all duration-300 ${social.color}`}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>

              {/* Back to Top */}
              <motion.button
                onClick={scrollToTop}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-sm text-gray-300 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowUp className="w-4 h-4" />
                <span>Back to Top</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
