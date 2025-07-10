import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Calendar,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Users,
  Building,
  Zap,
  Headphones,
  Video,
  Globe,
  Clock,
  MessageSquare,
  Star,
  Award,
  ExternalLink
} from 'lucide-react';
import { FloatingElement, GlowCard, WaveBackground } from './AnimationUtils';

interface ContactMethod {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  details: string[];
  action: string;
  gradient: string;
  color: string;
}

interface ServiceOption {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const contactMethods: ContactMethod[] = [
  {
    id: 'email',
    title: 'Email Support',
    subtitle: 'Get in Touch Digitally',
    description: 'Send us a message and we\'ll respond within 24 hours.',
    icon: Mail,
    details: ['hello@bluetechrevolution.com', 'support@bluetechrevolution.com'],
    action: 'Send Email',
    gradient: 'from-blue-500 to-cyan-400',
    color: 'blue'
  },
  {
    id: 'phone',
    title: 'Phone Support',
    subtitle: 'Speak Directly',
    description: 'Talk to our team for immediate assistance and consultation.',
    icon: Phone,
    details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
    action: 'Call Now',
    gradient: 'from-green-500 to-emerald-400',
    color: 'green'
  },
  {
    id: 'location',
    title: 'Visit Our Office',
    subtitle: 'Meet in Person',
    description: 'Come visit our headquarters for face-to-face meetings.',
    icon: MapPin,
    details: ['123 Ocean Drive', 'San Francisco, CA 94102'],
    action: 'Get Directions',
    gradient: 'from-purple-500 to-pink-400',
    color: 'purple'
  },
  {
    id: 'video',
    title: 'Video Conference',
    subtitle: 'Virtual Meetings',
    description: 'Schedule a video call with our experts at your convenience.',
    icon: Video,
    details: ['Available 24/7', 'Global time zones supported'],
    action: 'Book Meeting',
    gradient: 'from-orange-500 to-red-400',
    color: 'orange'
  }
];

const serviceOptions: ServiceOption[] = [
  {
    id: 'partnership',
    title: 'Strategic Partnership',
    description: 'Explore collaboration opportunities and joint ventures',
    icon: Users,
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'consulting',
    title: 'Environmental Consulting',
    description: 'Expert sustainability advice and implementation',
    icon: Building,
    color: 'from-green-500 to-emerald-400'
  },
  {
    id: 'technology',
    title: 'Technology Solutions',
    description: 'Cutting-edge environmental technology deployment',
    icon: Zap,
    color: 'from-purple-500 to-pink-400'
  },
  {
    id: 'support',
    title: 'Customer Support',
    description: '24/7 support for existing solutions and services',
    icon: Headphones,
    color: 'from-orange-500 to-yellow-400'
  }
];

const stats = [
  { number: '500+', label: 'Projects Completed', icon: Award, color: 'text-blue-400' },
  { number: '98%', label: 'Client Satisfaction', icon: Star, color: 'text-green-400' },
  { number: '24/7', label: 'Support Available', icon: Clock, color: 'text-purple-400' },
  { number: '50+', label: 'Countries Served', icon: Globe, color: 'text-orange-400' }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, GreenTech Innovations',
    content: 'BlueTech Revolution transformed our sustainability approach. Their expertise and technology solutions exceeded all expectations.',
    rating: 5,
    avatar: '👩‍💼'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Environmental Director, EcoSolutions',
    content: 'Outstanding partnership! Their team delivered results that made a real impact on our environmental goals.',
    rating: 5,
    avatar: '👨‍🔬'
  },
  {
    name: 'Dr. Emily Watson',
    role: 'Research Lead, CleanEnergy Corp',
    content: 'The consulting services provided were invaluable. Professional, knowledgeable, and truly committed to our success.',
    rating: 5,
    avatar: '👩‍🔬'
  }
];

const categories = [
  { id: 'all', label: 'All Contact Methods', icon: MessageSquare },
  { id: 'urgent', label: 'Urgent Support', icon: AlertCircle },
  { id: 'business', label: 'Business Inquiries', icon: Building },
  { id: 'technical', label: 'Technical Support', icon: Headphones }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    service: '',
    priority: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeCategory, setActiveCategory] = useState('all');

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

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
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        service: '',
        priority: 'normal'
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredMethods = activeCategory === 'all' 
    ? contactMethods 
    : contactMethods.filter(method => {
        switch (activeCategory) {
          case 'urgent': return method.id === 'phone' || method.id === 'video';
          case 'business': return method.id === 'email' || method.id === 'location';
          case 'technical': return method.id === 'email' || method.id === 'video';
          default: return true;
        }
      });

  return (
    <section id="contact" className="relative py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <WaveBackground className="opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="gradient-text">Get in Touch</span>
            <br />
            <span className="text-gray-800 dark:text-white">Let's Create Impact</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Connect with our team of environmental innovators. Whether you're looking to partner, 
            implement solutions, or explore new possibilities, we're here to help transform your sustainability vision into reality.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                variants={itemVariants}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-blue-500 text-white shadow-glow'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 shadow-md'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
                <span>{category.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Contact Methods Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {filteredMethods.map((method) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <GlowCard className="p-6 bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-r ${method.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {method.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {method.subtitle}
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {method.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    {method.details.map((detail, index) => (
                      <p key={index} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {detail}
                      </p>
                    ))}
                  </div>
                  
                  <button className={`w-full py-2 px-4 bg-gradient-to-r ${method.gradient} text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group-hover:scale-105`}>
                    <span>{method.action}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </GlowCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
        >
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <GlowCard className="p-8 bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl">
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Send us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your Company"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Service Interest
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="How can we help you?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-green-700 dark:text-green-300">
                      Message sent successfully! We'll get back to you soon.
                    </span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center space-x-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-700 dark:text-red-300">
                      Failed to send message. Please try again.
                    </span>
                  </motion.div>
                )}
              </form>
            </GlowCard>
          </motion.div>

          {/* Stats and Testimonials */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Company Stats */}
            <GlowCard className="p-8 bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Why Choose Us
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="flex items-center justify-center mb-3">
                        <Icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                      <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlowCard>

            {/* Testimonials */}
            <GlowCard className="p-8 bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                What Our Clients Say
              </h3>
              
              <div className="space-y-6">
                {testimonials.slice(0, 2).map((testimonial, index) => (
                  <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-6 last:pb-0">
                    <div className="flex items-center mb-3">
                      <div className="text-2xl mr-3">{testimonial.avatar}</div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.role}
                        </p>
                      </div>
                      <div className="ml-auto flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm italic">
                      "{testimonial.content}"
                    </p>
                  </div>
                ))}
              </div>
            </GlowCard>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <GlowCard className="p-12 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 dark:from-blue-500/20 dark:to-cyan-400/20 backdrop-blur-sm border border-blue-200 dark:border-blue-800 rounded-3xl shadow-xl">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
                Ready to Transform Your Environmental Impact?
              </h3>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Join hundreds of organizations already making a difference with our innovative solutions. 
                Let's discuss how we can help you achieve your sustainability goals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Calendar className="w-5 h-5" />
                  <span>Schedule Free Consultation</span>
                </motion.button>
                
                <motion.button
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>View Case Studies</span>
                </motion.button>
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <FloatingElement className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl">
        <div />
      </FloatingElement>
      <FloatingElement className="absolute bottom-32 right-16 w-32 h-32 bg-cyan-400/10 rounded-full blur-xl">
        <div />
      </FloatingElement>
      <FloatingElement className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl">
        <div />
      </FloatingElement>
    </section>
  );
}
