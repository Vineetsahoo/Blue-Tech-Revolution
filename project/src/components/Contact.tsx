import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Calendar,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Users,
  Building,
  Zap,
  Headphones,
  Video,
  FileText,
  ExternalLink,
  Copy,
  Check,
  ChevronDown
} from 'lucide-react';
import { FloatingElement, GlowCard, WaveBackground, ParticleField, BubbleEffect } from './AnimationUtils';

interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  details: string[];
  gradient: string;
  action?: string;
}

interface ServiceOption {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    title: 'Email Us',
    details: ['hello@bluetechrevolution.com', 'support@bluetechrevolution.com'],
    gradient: 'from-blue-500 to-cyan-400',
    action: 'Send Email'
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
    gradient: 'from-green-500 to-emerald-400',
    action: 'Call Now'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['123 Ocean Drive', 'San Francisco, CA 94102'],
    gradient: 'from-purple-500 to-pink-400',
    action: 'Get Directions'
  },
  {
    icon: Video,
    title: 'Video Call',
    details: ['Schedule a virtual meeting', 'Available 24/7'],
    gradient: 'from-orange-500 to-red-400',
    action: 'Book Meeting'
  }
];

const serviceOptions: ServiceOption[] = [
  {
    id: 'partnership',
    title: 'Partnership Inquiry',
    description: 'Explore collaboration opportunities',
    icon: Users,
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'consulting',
    title: 'Environmental Consulting',
    description: 'Get expert sustainability advice',
    icon: Building,
    color: 'from-green-500 to-emerald-400'
  },
  {
    id: 'technology',
    title: 'Technology Solutions',
    description: 'Implement our cutting-edge tech',
    icon: Zap,
    color: 'from-purple-500 to-pink-400'
  },
  {
    id: 'support',
    title: 'Customer Support',
    description: 'Get help with existing solutions',
    icon: Headphones,
    color: 'from-orange-500 to-yellow-400'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    service: '',
    budget: '',
    timeline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form and show success
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        service: '',
        budget: '',
        timeline: ''
      });
      setIsSubmitted(true);
      setSelectedService('');
      
      // Hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@bluetechrevolution.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error('Failed to copy email');
    }
  };

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
    hidden: { opacity: 0, y: 50 },
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
    <section id="contact" className="relative py-20 bg-gradient-to-b from-slate-900 via-blue-900 to-cyan-900 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <ParticleField particleCount={80} />
        <BubbleEffect count={20} />
        <WaveBackground />
        
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br opacity-40"
          animate={{
            background: [
              "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #0369a1 50%, #0284c7 75%, #06b6d4 100%)",
              "linear-gradient(135deg, #1e293b 0%, #0369a1 25%, #0284c7 50%, #06b6d4 75%, #0f172a 100%)",
              "linear-gradient(135deg, #0369a1 0%, #0284c7 25%, #06b6d4 50%, #0f172a 75%, #1e293b 100%)",
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        {/* Floating elements */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-24 h-24 border border-cyan-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                delay: i * 0.8
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
          >
            <span className="text-white">Ready to Make</span>
            <br />
            <span className="gradient-text">Real Change?</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-6"
          >
            Connect with our team of environmental innovators. Whether you're looking to partner, 
            implement our solutions, or explore new possibilities, we're here to help transform your sustainability vision into reality.
          </motion.p>

          {/* Quick action buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            <motion.button
              onClick={copyEmail}
              className="glass-morphism px-6 py-3 rounded-full text-cyan-400 hover:text-white transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
            </motion.button>
            <motion.button
              className="glass-morphism px-6 py-3 rounded-full text-green-400 hover:text-white transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Call</span>
            </motion.button>
            <motion.button
              className="glass-morphism px-6 py-3 rounded-full text-purple-400 hover:text-white transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="w-4 h-4" />
              <span>Download Brochure</span>
            </motion.button>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Enhanced Contact Form */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <FloatingElement delay={0.2}>
              <motion.div variants={itemVariants}>
                <GlowCard className="p-8">
                  <div className="flex items-center space-x-3 mb-8">
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Send className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white">Send Us a Message</h3>
                  </div>

                  {/* Service Selection */}
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-300 mb-4">
                      What can we help you with?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {serviceOptions.map((service) => (
                        <motion.button
                          key={service.id}
                          type="button"
                          onClick={() => {
                            setSelectedService(service.id);
                            setFormData(prev => ({ ...prev, service: service.title }));
                          }}
                          className={`p-4 rounded-xl border transition-all duration-300 text-left ${
                            selectedService === service.id
                              ? 'border-cyan-400 bg-cyan-400/10'
                              : 'border-gray-600 hover:border-gray-500'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center`}>
                              <service.icon className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-semibold text-white text-sm">{service.title}</span>
                          </div>
                          <p className="text-xs text-gray-400">{service.description}</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <motion.input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 glass-morphism rounded-xl text-white placeholder-gray-400 border border-gray-600 focus:border-cyan-400 focus:outline-none transition-all duration-300"
                          placeholder="Your full name"
                          whileFocus={{ scale: 1.02 }}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <motion.input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 glass-morphism rounded-xl text-white placeholder-gray-400 border border-gray-600 focus:border-cyan-400 focus:outline-none transition-all duration-300"
                          placeholder="your@email.com"
                          whileFocus={{ scale: 1.02 }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-semibold text-gray-300 mb-2">
                          Company/Organization
                        </label>
                        <motion.input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 glass-morphism rounded-xl text-white placeholder-gray-400 border border-gray-600 focus:border-cyan-400 focus:outline-none transition-all duration-300"
                          placeholder="Your company name"
                          whileFocus={{ scale: 1.02 }}
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-semibold text-gray-300 mb-2">
                          Subject *
                        </label>
                        <motion.input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 glass-morphism rounded-xl text-white placeholder-gray-400 border border-gray-600 focus:border-cyan-400 focus:outline-none transition-all duration-300"
                          placeholder="Brief subject line"
                          whileFocus={{ scale: 1.02 }}
                        />
                      </div>
                    </div>

                    {/* Advanced Fields Toggle */}
                    <motion.button
                      type="button"
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm font-medium">
                        {showAdvanced ? 'Hide' : 'Show'} Advanced Options
                      </span>
                      <motion.div
                        animate={{ rotate: showAdvanced ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {showAdvanced && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="budget" className="block text-sm font-semibold text-gray-300 mb-2">
                                Budget Range
                              </label>
                              <select
                                id="budget"
                                name="budget"
                                value={formData.budget}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 glass-morphism rounded-xl text-white border border-gray-600 focus:border-cyan-400 focus:outline-none transition-all duration-300"
                              >
                                <option value="">Select budget range</option>
                                <option value="under-50k">Under $50K</option>
                                <option value="50k-100k">$50K - $100K</option>
                                <option value="100k-500k">$100K - $500K</option>
                                <option value="500k-1m">$500K - $1M</option>
                                <option value="over-1m">Over $1M</option>
                              </select>
                            </div>
                            <div>
                              <label htmlFor="timeline" className="block text-sm font-semibold text-gray-300 mb-2">
                                Project Timeline
                              </label>
                              <select
                                id="timeline"
                                name="timeline"
                                value={formData.timeline}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 glass-morphism rounded-xl text-white border border-gray-600 focus:border-cyan-400 focus:outline-none transition-all duration-300"
                              >
                                <option value="">Select timeline</option>
                                <option value="immediate">Immediate (1-2 weeks)</option>
                                <option value="short">Short-term (1-3 months)</option>
                                <option value="medium">Medium-term (3-6 months)</option>
                                <option value="long">Long-term (6+ months)</option>
                              </select>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                        Message *
                      </label>
                      <motion.textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 glass-morphism rounded-xl text-white placeholder-gray-400 border border-gray-600 focus:border-cyan-400 focus:outline-none transition-all duration-300 resize-none"
                        placeholder="Tell us about your project, goals, or questions..."
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold text-base rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center justify-center space-x-3 relative z-10">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            <span>Send Message</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>

                    {/* Success/Error Messages */}
                    <AnimatePresence>
                      {isSubmitted && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center space-x-3 p-4 bg-green-500/20 border border-green-500/30 rounded-xl"
                        >
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-green-300 font-medium">
                            Message sent successfully! We'll get back to you within 24 hours.
                          </span>
                        </motion.div>
                      )}
                      
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center space-x-3 p-4 bg-red-500/20 border border-red-500/30 rounded-xl"
                        >
                          <AlertCircle className="w-5 h-5 text-red-400" />
                          <span className="text-red-300 font-medium">{error}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </GlowCard>
              </motion.div>
            </FloatingElement>
          </motion.div>

          {/* Enhanced Contact Information */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <FloatingElement key={info.title} delay={0.3 + index * 0.1}>
                  <motion.div variants={itemVariants}>
                    <GlowCard className="p-6 group cursor-pointer">
                      <div className="flex items-start space-x-4">
                        <motion.div
                          className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${info.gradient} flex items-center justify-center flex-shrink-0`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <info.icon className="w-7 h-7 text-white" />
                        </motion.div>
                        
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                            {info.title}
                          </h4>
                          <div className="space-y-2 mb-4">
                            {info.details.map((detail, i) => (
                              <p key={i} className="text-gray-300 group-hover:text-gray-200 transition-colors">
                                {detail}
                              </p>
                            ))}
                          </div>
                          {info.action && (
                            <motion.button
                              className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-2 group-hover:translate-x-1 transition-all duration-300"
                              whileHover={{ x: 5 }}
                            >
                              <span>{info.action}</span>
                              <ExternalLink className="w-3 h-3" />
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </GlowCard>
                  </motion.div>
                </FloatingElement>
              ))}
            </div>


          </motion.div>
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center"
        >
          <FloatingElement delay={1}>
            <motion.div 
              variants={itemVariants}
              className="glass-morphism rounded-3xl p-12 max-w-4xl mx-auto relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-400/10 to-green-500/10" />
              
              <motion.div
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center relative"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity }
                }}
              >
                <Sparkles className="w-10 h-10 text-white" />
                <div className="absolute inset-0 rounded-full border-4 border-cyan-400/30 animate-ping" />
              </motion.div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Start Your Sustainability Journey?
              </h3>
              <p className="text-base text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of organizations already making a difference. 
                Let's create something extraordinary together.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-full shadow-glow hover:shadow-glow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule Free Consultation
                </motion.button>
                
                <motion.button
                  className="px-8 py-4 glass-morphism rounded-full text-white font-semibold border border-white/20 hover:border-white/40 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download Impact Report
                </motion.button>
              </div>
            </motion.div>
          </FloatingElement>
        </motion.div>
      </div>
    </section>
  );
}
