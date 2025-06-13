import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNewsletterSubscription } from '../hooks/useNewsletterSubscription';
import { Mail, Send, CheckCircle, AlertTriangle, ArrowRight, Bell, Info } from 'lucide-react';

export default function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const { isSubmitting, error, success, subscribe } = useNewsletterSubscription();
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await subscribe(email);
    if (!error) {
      setEmail('');
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('contact@bluetechrevolution.com');
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const shimmerEffect = {
    hidden: { backgroundPosition: '200% 0' },
    visible: { 
      backgroundPosition: '-200% 0',
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "linear"
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 -z-10"></div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 opacity-20 bg-[url('/grid-pattern.svg')] bg-center"></div>
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-blue-600/30 rounded-full filter blur-3xl"
          animate={{ 
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/30 rounded-full filter blur-3xl"
          animate={{ 
            x: [0, -20, 0],
            y: [0, 20, 0]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full filter blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2] 
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/20 rounded-full filter blur-3xl"
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.3, 0.2] 
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4
              }}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <motion.div className="flex items-center gap-2 mb-4" variants={itemVariants}>
                <Bell className="h-5 w-5 text-blue-300" />
                <span className="px-3 py-1 bg-blue-900/40 text-blue-200 text-sm font-medium rounded-full">
                  Stay Connected
                </span>
              </motion.div>
              
              <motion.h2 className="text-3xl font-bold text-white mb-6" variants={itemVariants}>
                Subscribe to Our Newsletter
              </motion.h2>
              
              <motion.p className="text-blue-100 text-lg mb-8 max-w-md" variants={itemVariants}>
                Get the latest updates on our ocean cleanup initiatives, research findings, and opportunities to get involved
              </motion.p>
              
              <motion.div
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-blue-300/20 mb-8"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-900/40 rounded-lg text-blue-300 mt-1">
                    <Info className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Prefer direct contact?</h4>
                    <p className="text-blue-200 text-sm mb-2">
                      Reach out to us directly at:
                    </p>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={copyEmail} 
                        className="text-blue-300 hover:text-white transition-colors flex items-center gap-1 group"
                        onMouseEnter={() => setCopied(false)}
                      >
                        <span>contact@bluetechrevolution.com</span>
                        <motion.span
                          animate={copied ? { scale: [1, 1.5, 1] } : {}}
                          transition={{ duration: 0.3 }}
                        >
                          {copied ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <motion.div
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                            </motion.div>
                          )}
                        </motion.span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                variants={shimmerEffect}
                className="hidden lg:block h-0.5 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent w-full mb-8"
              />
            </div>
            
            <motion.div variants={itemVariants}>
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-6">Join Our Community</h3>
                
                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-8"
                    >
                      <div className="flex justify-center mb-4">
                        <div className="p-3 bg-green-500/20 rounded-full">
                          <CheckCircle className="h-10 w-10 text-green-400" />
                        </div>
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-2">Thank You for Subscribing!</h4>
                      <p className="text-blue-200 mb-6">
                        You've been added to our newsletter. Stay tuned for updates on our ocean conservation efforts.
                      </p>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                      >
                        Explore our solutions
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit} 
                      className="space-y-6"
                    >
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-blue-300/30 focus:border-blue-400 focus:ring focus:ring-blue-400/20 rounded-lg placeholder-blue-200/50 text-white"
                            disabled={isSubmitting}
                          />
                          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-blue-300/70">
                            <Mail className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="privacy"
                            type="checkbox"
                            required
                            className="h-4 w-4 rounded border-blue-300/30 bg-blue-900/30 text-blue-600 focus:ring-blue-500"
                          />
                        </div>
                        <label htmlFor="privacy" className="ml-3 text-sm text-blue-200">
                          I agree to receive updates and accept the <a href="#" className="text-blue-300 hover:text-white underline">Privacy Policy</a>
                        </label>
                      </div>
                      
                      <AnimatePresence>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2 text-red-300 bg-red-900/20 p-3 rounded-lg"
                          >
                            <AlertTriangle className="w-5 h-5 text-red-300 flex-shrink-0" />
                            <span>{error}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <motion.div
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="relative"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="relative w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium disabled:opacity-70"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              <span>Processing...</span>
                            </>
                          ) : (
                            <>
                              <Send className="h-5 w-5" />
                              <span>Subscribe Now</span>
                            </>
                          )}
                        </button>
                      </motion.div>
                      
                      <p className="text-xs text-blue-200/70 text-center">
                        We respect your privacy and will never share your information.
                        <br />
                        You can unsubscribe at any time.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="mt-6 flex justify-center gap-6">
                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((platform, index) => (
                  <motion.a 
                    key={platform}
                    href={`#${platform.toLowerCase()}`}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="text-blue-300 hover:text-white transition-colors"
                  >
                    {platform}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}