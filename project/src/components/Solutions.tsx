import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Droplets, 
  Zap, 
  Leaf, 
  Recycle, 
  Wind, 
  Sun,
  ArrowRight,
  TrendingUp,
  Shield,
  Globe,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { FloatingElement, GlowCard, WaveBackground } from './AnimationUtils';

interface Solution {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  stats: { label: string; value: string; color: string }[];
  features: string[];
  color: string;
  gradient: string;
  category: 'water' | 'energy' | 'environment';
}

const solutions: Solution[] = [
  {
    id: 'ocean-monitoring',
    title: 'Ocean Monitoring System',
    subtitle: 'Advanced Marine Protection',
    description: 'Real-time monitoring of ocean health using IoT sensors and AI analysis.',
    longDescription: 'Our comprehensive ocean monitoring system uses cutting-edge IoT sensors deployed across marine environments to track water quality, temperature, pH levels, and marine life patterns. AI-powered analytics provide real-time insights and predictive modeling for environmental protection.',
    icon: Droplets,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    stats: [
      { label: 'Sensors Deployed', value: '2,500+', color: 'text-blue-400' },
      { label: 'Accuracy Rate', value: '99.2%', color: 'text-green-400' },
      { label: 'Coverage Area', value: '50,000 km²', color: 'text-cyan-400' }
    ],
    features: [
      'Real-time water quality monitoring',
      'Marine life tracking and analysis',
      'Pollution detection and alerts',
      'Climate change impact assessment'
    ],
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-400',
    category: 'water'
  },
  {
    id: 'renewable-energy',
    title: 'Smart Energy Grid',
    subtitle: 'Clean Power Distribution',
    description: 'Intelligent renewable energy management with AI-optimized distribution.',
    longDescription: 'Revolutionary smart grid technology that optimizes renewable energy distribution using machine learning algorithms. Our system seamlessly integrates solar, wind, and hydroelectric power sources to maximize efficiency and minimize waste.',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    stats: [
      { label: 'Energy Saved', value: '40MW', color: 'text-yellow-400' },
      { label: 'Efficiency Gain', value: '+35%', color: 'text-green-400' },
      { label: 'CO₂ Reduced', value: '25,000t', color: 'text-emerald-400' }
    ],
    features: [
      'AI-powered energy distribution',
      'Multi-source renewable integration',
      'Predictive maintenance system',
      'Grid stability optimization'
    ],
    color: 'yellow',
    gradient: 'from-yellow-500 to-orange-400',
    category: 'energy'
  },
  {
    id: 'ecosystem-restoration',
    title: 'Ecosystem Restoration',
    subtitle: 'Natural Habitat Recovery',
    description: 'Technology-driven ecosystem restoration and biodiversity conservation.',
    longDescription: 'Comprehensive ecosystem restoration program utilizing drone technology, satellite imagery, and biotechnology to restore damaged natural habitats. Our approach combines scientific research with innovative technology for maximum environmental impact.',
    icon: Leaf,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    stats: [
      { label: 'Areas Restored', value: '15,000 ha', color: 'text-green-400' },
      { label: 'Species Protected', value: '250+', color: 'text-emerald-400' },
      { label: 'Success Rate', value: '92%', color: 'text-lime-400' }
    ],
    features: [
      'Drone-based reforestation',
      'Biodiversity monitoring',
      'Soil rehabilitation technology',
      'Wildlife corridor creation'
    ],
    color: 'green',
    gradient: 'from-green-500 to-emerald-400',
    category: 'environment'
  },
  {
    id: 'waste-management',
    title: 'Smart Waste Solutions',
    subtitle: 'Circular Economy Technology',
    description: 'AI-powered waste management and recycling optimization systems.',
    longDescription: 'Intelligent waste management system that uses computer vision and AI to optimize recycling processes, reduce landfill waste, and create circular economy solutions. Smart bins and collection routes maximize efficiency while minimizing environmental impact.',
    icon: Recycle,
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    stats: [
      { label: 'Waste Diverted', value: '85%', color: 'text-purple-400' },
      { label: 'Recycling Rate', value: '+60%', color: 'text-blue-400' },
      { label: 'Cost Savings', value: '30%', color: 'text-green-400' }
    ],
    features: [
      'AI-powered sorting systems',
      'Smart collection optimization',
      'Circular economy integration',
      'Waste-to-energy conversion'
    ],
    color: 'purple',
    gradient: 'from-purple-500 to-pink-400',
    category: 'environment'
  },
  {
    id: 'atmospheric-cleaning',
    title: 'Atmospheric Purification',
    subtitle: 'Air Quality Enhancement',
    description: 'Advanced atmospheric cleaning technology for urban air purification.',
    longDescription: 'Cutting-edge atmospheric purification systems that remove pollutants, capture carbon dioxide, and improve urban air quality. Our technology combines photocatalytic processes with smart city integration for maximum impact.',
    icon: Wind,
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    stats: [
      { label: 'Air Quality Index', value: '+45%', color: 'text-cyan-400' },
      { label: 'Pollutants Removed', value: '12,000kg', color: 'text-blue-400' },
      { label: 'Coverage Radius', value: '5km', color: 'text-indigo-400' }
    ],
    features: [
      'Photocatalytic air purification',
      'Real-time air quality monitoring',
      'Smart city integration',
      'Pollutant capture and processing'
    ],
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-400',
    category: 'environment'
  },
  {
    id: 'solar-innovation',
    title: 'Solar Innovation Hub',
    subtitle: 'Next-Gen Solar Technology',
    description: 'Revolutionary solar panel technology with enhanced efficiency and sustainability.',
    longDescription: 'Next-generation solar technology featuring perovskite-silicon tandem cells, AI-optimized tracking systems, and integrated energy storage. Our solar solutions achieve unprecedented efficiency rates while maintaining environmental sustainability.',
    icon: Sun,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    stats: [
      { label: 'Efficiency Rate', value: '31.2%', color: 'text-orange-400' },
      { label: 'Energy Output', value: '150MW', color: 'text-yellow-400' },
      { label: 'Homes Powered', value: '45,000', color: 'text-amber-400' }
    ],
    features: [
      'Perovskite-silicon tandem cells',
      'AI-optimized solar tracking',
      'Integrated energy storage',
      'Self-cleaning technology'
    ],
    color: 'orange',
    gradient: 'from-orange-500 to-yellow-400',
    category: 'energy'
  }
];

export default function Solutions() {
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = [
    { id: 'all', label: 'All Solutions', icon: Globe },
    { id: 'water', label: 'Ocean & Water', icon: Droplets },
    { id: 'energy', label: 'Clean Energy', icon: Zap },
    { id: 'environment', label: 'Environment', icon: Leaf }
  ];

  const filteredSolutions = activeCategory === 'all' 
    ? solutions 
    : solutions.filter(s => s.category === activeCategory);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredSolutions.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredSolutions.length) % filteredSolutions.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section id="solutions" className="relative py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
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
            <span className="gradient-text">Revolutionary</span>
            <br />
            <span className="text-gray-800 dark:text-white">Environmental Tech</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Discover our cutting-edge technologies designed to tackle the world's most pressing environmental challenges through innovation and sustainability.
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
                onClick={() => {
                  setActiveCategory(category.id);
                  setCurrentIndex(0);
                }}
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

        {/* Solutions Carousel */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="relative"
        >
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {filteredSolutions.map((solution) => (
                <div key={solution.id} className="w-full flex-shrink-0">
                  <div className="grid lg:grid-cols-2 gap-8 items-center p-8">
                    {/* Content */}
                    <FloatingElement delay={0.2}>
                      <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                          <motion.div
                            className={`p-4 rounded-2xl bg-gradient-to-r ${solution.gradient} shadow-glow`}
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                          >
                            <solution.icon className="w-8 h-8 text-white" />
                          </motion.div>
                          <div>
                            <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
                              {solution.title}
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                              {solution.subtitle}
                            </p>
                          </div>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                          {solution.description}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4">
                          {solution.stats.map((stat, idx) => (
                            <motion.div
                              key={idx}
                              className="text-center p-4 glass-morphism rounded-xl"
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
                            >
                              <div className={`text-2xl font-bold ${stat.color}`}>
                                {stat.value}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {stat.label}
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Features */}
                        <div className="space-y-3">
                          {solution.features.map((feature, idx) => (
                            <motion.div
                              key={idx}
                              className="flex items-center space-x-3"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${solution.gradient}`} />
                              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                            </motion.div>
                          ))}
                        </div>

                        <motion.button
                          onClick={() => setSelectedSolution(solution)}
                          className={`flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${solution.gradient} text-white rounded-full font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </FloatingElement>

                    {/* Image */}
                    <FloatingElement delay={0.4} animation="float-reverse">
                      <GlowCard className="relative overflow-hidden" glowColor={solution.color}>
                        <motion.img
                          src={solution.image}
                          alt={solution.title}
                          className="w-full h-96 object-cover rounded-lg"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center space-x-2 text-white">
                            <TrendingUp className="w-5 h-5" />
                            <span className="font-semibold">Performance Optimized</span>
                          </div>
                        </div>
                      </GlowCard>
                    </FloatingElement>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation */}
          {filteredSolutions.length > 1 && (
            <div className="flex items-center justify-between mt-8">
              <motion.button
                onClick={prevSlide}
                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </motion.button>

              <div className="flex space-x-2">
                {filteredSolutions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-blue-500 scale-125' 
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextSlide}
                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Detailed Modal */}
      {selectedSolution && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedSolution(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${selectedSolution.gradient}`}>
                    <selectedSolution.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
                      {selectedSolution.title}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      {selectedSolution.subtitle}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSolution(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  ×
                </button>
              </div>

              <img
                src={selectedSolution.image}
                alt={selectedSolution.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />

              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8">
                {selectedSolution.longDescription}
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                    Key Features
                  </h4>
                  <div className="space-y-3">
                    {selectedSolution.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                    Performance Metrics
                  </h4>
                  <div className="space-y-4">
                    {selectedSolution.stats.map((stat, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 glass-morphism rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">{stat.label}</span>
                        <span className={`font-bold ${stat.color}`}>{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
