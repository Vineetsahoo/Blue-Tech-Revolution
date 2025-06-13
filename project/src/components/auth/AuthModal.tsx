import React, { useState, useEffect } from 'react';
import { signIn, signUp } from '../../lib/auth';
import { X, Github, Mail, Loader2, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type AuthMode = 'signin' | 'signup' | 'forgot';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return 0;
    
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    return strength;
  };

  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['#f87171', '#fb923c', '#facc15', '#4ade80'];
  
  const passwordStrength = getPasswordStrength(password);
  
  const passwordsMatch = password === confirmPassword || mode !== 'signup';

  const validateForm = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (mode !== 'forgot') {
      if (!password) {
        setError('Password is required');
        return false;
      }
      
      if (mode === 'signup') {
        if (passwordStrength < 2) {
          setError('Password is too weak - use at least 8 characters, uppercase, numbers, and symbols');
          return false;
        }
        
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return false;
        }
      }
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      if (mode === 'signin') {
        await signIn(email, password);
        onClose();
      } else if (mode === 'signup') {
        await signUp(email, password);
        // Show success message or redirect
        onClose();
      } else if (mode === 'forgot') {
        // Call password reset API here
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
        setResetEmailSent(true);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    try {
      // Implement social auth logic here
      console.log(`${provider} auth`);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError('');
    setResetEmailSent(false);
  };

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={contentVariants}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </motion.button>

            <AnimatePresence mode="wait">
              {resetEmailSent ? (
                <motion.div
                  key="reset-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-8"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-green-100 rounded-full">
                      <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Check Your Email</h3>
                  <p className="text-gray-600 mb-6">
                    We've sent a password reset link to <strong>{email}</strong>.
                    The link will expire in 10 minutes.
                  </p>
                  <button
                    onClick={() => switchMode('signin')}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Back to Sign In
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, x: mode === 'forgot' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: mode === 'forgot' ? -20 : 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">
                    {mode === 'signin' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
                  </h2>

                  {/* Social Auth Buttons */}
                  {mode !== 'forgot' && (
                    <>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <motion.button
                          whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                          whileTap={{ y: 0 }}
                          onClick={() => handleSocialAuth('google')}
                          disabled={isLoading}
                          className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                          <Mail className="h-5 w-5 text-red-500" />
                          <span>Google</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                          whileTap={{ y: 0 }}
                          onClick={() => handleSocialAuth('github')}
                          disabled={isLoading}
                          className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                          <Github className="h-5 w-5" />
                          <span>GitHub</span>
                        </motion.button>
                      </div>

                      <div className="relative flex items-center justify-center mb-6">
                        <div className="border-t border-gray-300 w-full"></div>
                        <span className="bg-white px-2 text-sm text-gray-500">or</span>
                      </div>
                    </>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                          required
                          disabled={isLoading}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {/* Password Fields (not shown for forgot password) */}
                    {mode !== 'forgot' && (
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                          </label>
                          {mode === 'signin' && (
                            <button
                              type="button"
                              onClick={() => switchMode('forgot')}
                              className="text-sm text-blue-600 hover:text-blue-800"
                            >
                              Forgot?
                            </button>
                          )}
                        </div>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pr-10 transition-colors"
                            required
                            disabled={isLoading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            disabled={isLoading}
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                        
                        {/* Password Strength Indicator */}
                        {mode === 'signup' && password && (
                          <div className="mt-2">
                            <div className="flex justify-between items-center mb-1">
                              <div className="text-xs text-gray-500">Password strength:</div>
                              <div className="text-xs font-medium" style={{ color: strengthColors[passwordStrength - 1] || '#9ca3af' }}>
                                {password ? strengthLabels[passwordStrength - 1] || 'Very Weak' : ''}
                              </div>
                            </div>
                            <div className="flex gap-1 h-1">
                              {[...Array(4)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ scaleX: 0 }}
                                  animate={{ scaleX: i < passwordStrength ? 1 : 0 }}
                                  transition={{ duration: 0.3, delay: i * 0.1 }}
                                  className="flex-1 rounded-full origin-left"
                                  style={{ 
                                    backgroundColor: i < passwordStrength ? strengthColors[i] : '#e5e7eb',
                                    height: '4px'
                                  }}
                                />
                              ))}
                            </div>
                            
                            {password && passwordStrength < 2 && (
                              <p className="mt-1 text-xs text-amber-600">
                                Add length, numbers, uppercase, and symbols for a stronger password
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Confirm Password Field (signup only) */}
                    {mode === 'signup' && (
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`mt-1 block w-full rounded-lg shadow-sm focus:ring focus:ring-opacity-50 pr-10 transition-all ${
                              confirmPassword && !passwordsMatch
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50'
                                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                            }`}
                            required
                            disabled={isLoading}
                          />
                          {confirmPassword && !passwordsMatch && (
                            <div className="absolute inset-y-0 right-3 flex items-center">
                              <X className="h-5 w-5 text-red-500" />
                            </div>
                          )}
                          {confirmPassword && passwordsMatch && (
                            <div className="absolute inset-y-0 right-3 flex items-center">
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                            </div>
                          )}
                        </div>
                        {confirmPassword && !passwordsMatch && (
                          <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
                        )}
                      </div>
                    )}

                    {/* Remember Me Checkbox */}
                    {mode === 'signin' && (
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="remember"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          disabled={isLoading}
                        />
                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                          Remember me
                        </label>
                      </div>
                    )}

                    {/* Error Message */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200 flex items-start gap-2"
                        >
                          <svg className="h-5 w-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{error}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
                    >
                      {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
                      {isLoading ? 'Processing...' : mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Sign Up' : 'Send Reset Link'}
                    </motion.button>

                    {/* Mode Toggle */}
                    {mode !== 'forgot' ? (
                      <button
                        type="button"
                        onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')}
                        className="w-full text-sm text-blue-600 hover:text-blue-800 py-2"
                      >
                        {mode === 'signin' ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => switchMode('signin')}
                        className="w-full text-sm text-blue-600 hover:text-blue-800 py-2"
                      >
                        Back to Sign In
                      </button>
                    )}
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}