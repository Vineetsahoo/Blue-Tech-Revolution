import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";
    img.onload = () => setIsImageLoaded(true);
  }, []);

  return (
    <div id="home" className="relative h-screen overflow-hidden bg-slate-900">
      {/* Background Video */}
      <div className="absolute inset-0 opacity-50">
        <video
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className="object-cover w-full h-full"
        >
          <source src="/ocean-tech.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Background Image (fallback) */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ 
          scale: isImageLoaded ? 1 : 1.1, 
          opacity: isImageLoaded && !isVideoLoaded ? 0.5 : 0 
        }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1484291470158-b8f8d608850d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        }}
      />

      {/* Enhanced Gradient Overlays */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/75 to-blue-900/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-500/10 to-blue-600/20"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ backgroundSize: '200% 100%' }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
            animate={{
              x: [Math.random() * 100, Math.random() * -100],
              y: [Math.random() * 100, Math.random() * -100],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="max-w-4xl mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-blue-500/10 backdrop-blur-sm text-blue-300 text-sm mb-4">
              Welcome to the Future
            </span>
          </motion.div>

          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            Blue Tech{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Revolution
            </span>
          </motion.h1>

          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100/80 mb-8 max-w-2xl mx-auto"
          >
            Pioneering sustainable solutions for our oceans through cutting-edge technology and innovation
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#solutions"
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-4 rounded-full text-lg font-semibold text-white overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
            >
              <span className="relative z-10">Discover Our Solutions</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700"
                initial={false}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.3 }}
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors"
            >
              Contact Us →
            </a>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-sm">
          <motion.div 
            className="w-1.5 h-3 bg-white/50 rounded-full mt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
}