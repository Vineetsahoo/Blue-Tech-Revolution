import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Play, ArrowDown, Sparkles, Waves, Zap, Shield, Globe } from 'lucide-react';
import { BubbleEffect, FloatingElement, ParticleField, GlowCard } from './AnimationUtils';

export default function Hero() {
  const [, setIsVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 1.1]);

  const slides = [
    {
      title: "Ocean Conservation Revolution",
      subtitle: "Protecting Marine Ecosystems",
      description: "Advanced technology meets environmental stewardship to create sustainable solutions for our oceans.",
      icon: Waves,
      color: "from-blue-500 to-cyan-400"
    },
    {
      title: "Clean Energy Innovation",
      subtitle: "Renewable Power Solutions",
      description: "Harnessing the power of nature to create sustainable energy for a greener tomorrow.",
      icon: Zap,
      color: "from-green-500 to-emerald-400"
    },
    {
      title: "Environmental Protection",
      subtitle: "Safeguarding Our Planet",
      description: "Comprehensive technologies designed to protect and preserve our natural world.",
      icon: Shield,
      color: "from-purple-500 to-pink-400"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePlayVideo = () => {
    setShowVideo(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 100);
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById('solutions');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900"
      style={{ opacity, scale }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <ParticleField particleCount={80} />
        <BubbleEffect count={20} />
        
        {/* Dynamic Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br opacity-50"
          animate={{
            background: [
              "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0369a1 100%)",
              "linear-gradient(135deg, #1e293b 0%, #0369a1 50%, #0284c7 100%)",
              "linear-gradient(135deg, #0369a1 0%, #0284c7 50%, #0f172a 100%)",
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Dynamic Slide Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className={`p-3 rounded-full bg-gradient-to-r ${slides[currentSlide].color} shadow-glow`}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      {(() => {
                        const IconComponent = slides[currentSlide].icon;
                        return <IconComponent className="w-6 h-6 text-white" />;
                      })()}
                    </motion.div>
                    <span className="text-cyan-400 font-semibold text-lg">
                      {slides[currentSlide].subtitle}
                    </span>
                  </div>

                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                    <span className="gradient-text">
                      {slides[currentSlide].title}
                    </span>
                  </h1>

                  <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                    {slides[currentSlide].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Interactive Buttons */}
              <div className="flex flex-col sm:flex-row gap-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlayVideo}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full text-white font-semibold text-lg shadow-glow hover:shadow-glow-lg transition-all duration-300"
                >
                  <span className="flex items-center space-x-3">
                    <Play className="w-5 h-5 group-hover:animate-pulse" />
                    <span>Watch Demo</span>
                  </span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToNext}
                  className="group px-8 py-4 glass-morphism rounded-full text-white font-semibold text-lg border border-white/20 hover:border-white/40 transition-all duration-300"
                >
                  <span className="flex items-center space-x-3">
                    <Sparkles className="w-5 h-5 group-hover:animate-spin" />
                    <span>Explore Solutions</span>
                  </span>
                </motion.button>
              </div>

              {/* Slide Indicators */}
              <div className="flex space-x-3">
                {slides.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-cyan-400 scale-125' 
                        : 'bg-gray-600 hover:bg-gray-400'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Right Content - Interactive Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Featured Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FloatingElement delay={0.1}>
                  <GlowCard className="h-40" glowColor="blue">
                    <div className="flex flex-col justify-between h-full">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-500 rounded-lg">
                          <Waves className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-gray-800 dark:text-white">Ocean Tech</span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Advanced marine monitoring systems
                        </p>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-xs text-green-400">Active</span>
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                </FloatingElement>

                <FloatingElement delay={0.2} animation="float-reverse">
                  <GlowCard className="h-40" glowColor="green">
                    <div className="flex flex-col justify-between h-full">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-500 rounded-lg">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-gray-800 dark:text-white">Clean Energy</span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Renewable energy solutions
                        </p>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                          <span className="text-xs text-yellow-400">Growing</span>
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                </FloatingElement>

                <FloatingElement delay={0.3}>
                  <GlowCard className="h-40" glowColor="purple">
                    <div className="flex flex-col justify-between h-full">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-500 rounded-lg">
                          <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-gray-800 dark:text-white">Eco Shield</span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Environmental protection tech
                        </p>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                          <span className="text-xs text-blue-400">Protected</span>
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                </FloatingElement>

                <FloatingElement delay={0.4} animation="float-reverse">
                  <GlowCard className="h-40" glowColor="cyan">
                    <div className="flex flex-col justify-between h-full">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-cyan-500 rounded-lg">
                          <Globe className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-gray-800 dark:text-white">Global Impact</span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Worldwide sustainability network
                        </p>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                          <span className="text-xs text-cyan-400">Connected</span>
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                </FloatingElement>
              </div>

              {/* Stats Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="glass-morphism rounded-2xl p-6"
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <motion.div
                      className="text-2xl font-bold text-cyan-400"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      500+
                    </motion.div>
                    <p className="text-sm text-gray-300">Projects</p>
                  </div>
                  <div>
                    <motion.div
                      className="text-2xl font-bold text-green-400"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      50M+
                    </motion.div>
                    <p className="text-sm text-gray-300">Gallons Saved</p>
                  </div>
                  <div>
                    <motion.div
                      className="text-2xl font-bold text-blue-400"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    >
                      95%
                    </motion.div>
                    <p className="text-sm text-gray-300">Efficiency</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToNext}
          className="flex flex-col items-center space-y-2 text-white/70 hover:text-white transition-colors group"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm font-medium">Discover More</span>
          <ArrowDown className="w-5 h-5 group-hover:animate-bounce" />
        </motion.button>
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative max-w-4xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={videoRef}
                className="w-full rounded-xl shadow-2xl"
                controls
                onLoadedData={() => setIsVideoLoaded(true)}
              >
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowVideo(false)}
                className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors"
              >
                ×
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
