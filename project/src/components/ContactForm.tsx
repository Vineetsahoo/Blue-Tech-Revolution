import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContactForm } from '../hooks/useContactForm';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formTouched, setFormTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const { isSubmitting, error, success, submitForm } = useContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm(formData);
    if (!error) {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setFormTouched({ name: false, email: false, message: false });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
    
    if (!formTouched[id as keyof typeof formTouched]) {
      setFormTouched(prev => ({
        ...prev,
        [id]: true
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id } = e.target;
    setFormTouched(prev => ({
      ...prev,
      [id]: true
    }));
  };

  const getInputClasses = (field: keyof typeof formTouched) => {
    return `mt-1 block w-full rounded-lg border transition-all duration-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
      formTouched[field] && !formData[field] 
        ? 'border-red-300 bg-red-50' 
        : 'border-gray-300'
    }`;
  };

  // Options for subject dropdown
  const subjectOptions = [
    { value: '', label: 'Select a subject' },
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'partnership', label: 'Partnership Opportunity' },
    { value: 'feedback', label: 'Feedback' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-lg relative"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-6">Get in Touch</h3>
      
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-green-50 border border-green-200 rounded-lg p-6 text-center my-8"
          >
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h4 className="text-lg font-semibold text-green-800 mb-2">Message Sent Successfully!</h4>
            <p className="text-green-700">
              Thank you for reaching out. We'll get back to you as soon as possible.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Send Another Message
            </motion.button>
          </motion.div>
        ) : (
          <motion.form 
            id="contact-form" 
            onSubmit={handleSubmit} 
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative">
                <motion.label 
                  htmlFor="name" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                  whileHover={{ x: 2 }}
                >
                  Your Name
                </motion.label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={getInputClasses('name')}
                  placeholder="John Doe"
                />
                {formTouched.name && !formData.name && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mt-1 text-sm text-red-500"
                  >
                    Please enter your name
                  </motion.p>
                )}
              </div>
              
              <div className="relative">
                <motion.label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                  whileHover={{ x: 2 }}
                >
                  Email Address
                </motion.label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={getInputClasses('email')}
                  placeholder="your@email.com"
                />
                {formTouched.email && !formData.email && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mt-1 text-sm text-red-500"
                  >
                    Please enter your email
                  </motion.p>
                )}
              </div>
            </div>
            
            <div>
              <motion.label 
                htmlFor="subject" 
                className="block text-sm font-medium text-gray-700 mb-1"
                whileHover={{ x: 2 }}
              >
                Subject
              </motion.label>
              <select
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                {subjectOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="relative">
              <motion.label 
                htmlFor="message" 
                className="block text-sm font-medium text-gray-700 mb-1"
                whileHover={{ x: 2 }}
              >
                Message
              </motion.label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={getInputClasses('message')}
                placeholder="How can we help you?"
              ></textarea>
              {formTouched.message && !formData.message && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-1 text-sm text-red-500"
                >
                  Please enter your message
                </motion.p>
              )}
            </div>
            
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-start gap-2 bg-red-50 text-red-700 p-4 rounded-lg border border-red-200"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Error sending message</p>
                    <p className="text-sm">{error}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>
            
            <p className="text-xs text-gray-500 text-center mt-4">
              By submitting this form, you agree to our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a> and <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}