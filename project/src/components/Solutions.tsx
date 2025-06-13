import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Recycle, Droplet, Shield, Cpu, Database, Globe, BarChart2, Zap, Award, 
         Activity,  X, Play, ExternalLink, Check, Info, ArrowRight, Bookmark } from 'lucide-react';

const solutions = [
  {
    icon: <Recycle className="h-12 w-12 text-blue-500" />,
    title: "Smart Collection Systems",
    description: "Autonomous marine drones and AI-powered collection networks that efficiently gather ocean debris.",
    stats: {
      efficiency: "95%",
      coverage: "500km²",
      accuracy: "99.9%"
    },
    features: [
      "AI-powered debris detection",
      "Autonomous navigation",
      "Real-time monitoring",
      "Solar-powered operation"
    ],
    metrics: {
      carbonReduction: "2500 tons/year",
      energyEfficiency: "85%",
      operationalCost: "-40%"
    },
    caseStudy: {
      location: "Pacific Ocean",
      impact: "200 tons collected",
      duration: "6 months",
      roi: "250%",
      testimonial: {
        quote: "Revolutionary impact on our marine cleanup efforts",
        author: "Dr. Sarah Chen",
        role: "Marine Conservation Director"
      }
    }
  },
  {
    icon: <Droplet className="h-12 w-12 text-blue-500" />,
    title: "Water Filtration",
    description: "Advanced filtration technology that removes microplastics and other pollutants from marine environments.",
    stats: {
      efficiency: "99.9%",
      coverage: "1000L/min",
      accuracy: "98.5%"
    },
    features: [
      "Nano-filtration technology",
      "Multi-stage purification",
      "Automated cleaning cycles",
      "Smart contamination detection"
    ],
    metrics: {
      pollutantsRemoved: "50,000 tons/year",
      waterProcessed: "525M liters/year",
      energyEfficiency: "92%"
    },
    caseStudy: {
      location: "Mediterranean Sea",
      impact: "Reduced microplastic concentration by 95%",
      duration: "12 months",
      roi: "180%",
      testimonial: {
        quote: "Revolutionary impact on water quality and marine life",
        author: "Dr. Emma Martinez",
        role: "Marine Environmental Scientist"
      }
    }
  },
  {
    icon: <Shield className="h-12 w-12 text-blue-500" />,
    title: "Ecosystem Protection",
    description: "Comprehensive monitoring and protection systems to preserve marine biodiversity.",
    stats: {
      coverage: "10,000km²",
      species: "500+",
      accuracy: "97%"
    },
    features: [
      "24/7 ecosystem monitoring",
      "Species tracking system",
      "Threat detection AI",
      "Habitat preservation tools"
    ],
    metrics: {
      speciesProtected: "500+ species",
      habitatRestored: "2,000km²",
      survivalRate: "+65%"
    },
    caseStudy: {
      location: "Great Barrier Reef",
      impact: "40% increase in marine population",
      duration: "24 months",
      roi: "300%",
      testimonial: {
        quote: "Unprecedented success in marine ecosystem preservation",
        author: "Prof. James Wilson",
        role: "Marine Biology Director"
      }
    }
  }
];

interface TechCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  onClick: () => void;
  index: number;
}

const TechCard = ({ title, icon, description, onClick, index }: TechCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
    >
      <motion.button
        onClick={onClick}
        whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        whileTap={{ scale: 0.98 }}
        className="relative group overflow-hidden w-full rounded-2xl bg-gradient-to-br from-white to-blue-50 p-1 shadow-lg hover:shadow-xl transition-all duration-300 text-left"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10 p-6 bg-white/80 backdrop-blur-sm rounded-xl h-full">
          <div className="mb-4 p-3 bg-blue-50 rounded-xl inline-block">
            {icon}
          </div>
          
          <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">{title}</h3>
          <p className="text-gray-600">{description}</p>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center text-blue-500 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-x-5 group-hover:translate-x-0 transition-all duration-300">
              View details <ArrowRight className="ml-1 h-4 w-4" />
            </div>
            
            <div className="p-2 bg-blue-100 rounded-full opacity-0 group-hover:opacity-100 transform rotate-90 group-hover:rotate-0 transition-all duration-300">
              <Cpu className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl transform translate-x-10 -translate-y-10"></div>
        <div className="absolute bottom-0 left-0 h-10 w-10 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full blur-lg transform -translate-x-5 translate-y-5"></div>
      </motion.button>
    </motion.div>
  );
};

const MetricsCard = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05, y: -5 }}
    className="bg-gradient-to-br from-white to-blue-50 p-0.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-[10px] h-full">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg text-blue-600">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <h4 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            {value}
          </h4>
        </div>
      </div>
    </div>
  </motion.div>
);

const TimelineItem = ({ year, title, description }: { year: string; title: string; description: string }) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={itemRef}
      className={`relative pl-10 pb-10 border-l-2 ${isInView ? "border-blue-400" : "border-blue-200"} transition-colors duration-1000`}
    >
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, type: "spring" }}
        className="absolute left-[-9px] top-0 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-md shadow-blue-200"
      />
      
      <motion.span 
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="inline-block px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-700 rounded-full mb-2"
      >
        {year}
      </motion.span>
      
      <motion.h4 
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-lg font-bold mt-1 text-gray-800"
      >
        {title}
      </motion.h4>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-gray-600 mt-1"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

// Helper function for the timeline component
function useInView(ref: React.RefObject<HTMLElement>, options = {}) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);
    
    observer.observe(ref.current);
    
    return () => {
      observer.disconnect();
    };
  }, [ref, options]);
  
  return isInView;
}

const SolutionModal = ({ solution, onClose }: { solution: any; onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('features');
  
  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(5px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
    >
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-gradient-to-br from-white to-blue-50 p-1 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-blue-500/5 rounded-2xl backdrop-blur-[2px] z-0"></div>
        
        <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-2xl overflow-y-auto max-h-[90vh] p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-500 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-2xl text-white md:mt-2">
              {solution.icon}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-wrap gap-3 mb-2">
                {Object.entries(solution.stats).map(([key, value]) => (
                  <span key={key} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {key}: {String(value)}
                  </span>
                ))}
              </div>
              <h2 className="text-3xl font-bold mb-2 text-gray-800">{solution.title}</h2>
              <p className="text-gray-600">{solution.description}</p>
            </div>
          </div>

          {/* Tab navigation */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-6 overflow-x-auto">
            {['features', 'metrics', 'case study'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              {activeTab === 'features' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {solution.features.map((feature: string, index: number) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="flex items-start gap-3 bg-blue-50/50 p-3 rounded-xl"
                      >
                        <div className="p-1 bg-blue-100 rounded-full text-blue-600 mt-0.5">
                          <Check className="w-4 h-4" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-8 p-4 border border-blue-100 rounded-xl bg-blue-50/50">
                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                      <Info className="w-5 h-5" />
                      <h4 className="font-medium">Did you know?</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      This technology has been deployed in over 15 countries and has received multiple international awards for innovation in marine conservation.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'metrics' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Performance Metrics</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(solution.metrics).map(([key, value]) => (
                      <MetricsCard
                        key={key}
                        title={key.replace(/([A-Z])/g, ' $1').trim()}
                        value={value as string}
                        icon={<Activity className="w-4 h-4" />}
                      />
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="font-semibold text-gray-800 mb-3">Efficiency Over Time</h4>
                    <div className="relative h-40 bg-blue-50 rounded-xl overflow-hidden">
                      {/* This would ideally be a real chart component */}
                      <div className="absolute inset-0 flex items-end">
                        {[0.3, 0.5, 0.45, 0.6, 0.75, 0.9, 0.85].map((height, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${height * 100}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className="flex-1 mx-0.5 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-sm"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'case study' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Case Study: {solution.caseStudy.location}</h3>
                  
                  <div className="relative rounded-xl overflow-hidden mb-6">
                    <div className="aspect-video bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <button className="p-4 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors">
                        <Play className="w-6 h-6 text-white" fill="white" />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-4 px-4">
                      <h4 className="text-white font-semibold">Impact in {solution.caseStudy.location}</h4>
                      <p className="text-blue-100 text-sm">Duration: {solution.caseStudy.duration}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <h5 className="font-medium text-gray-700 mb-1">Impact</h5>
                      <p className="text-blue-600 font-semibold">{solution.caseStudy.impact}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <h5 className="font-medium text-gray-700 mb-1">ROI</h5>
                      <p className="text-blue-600 font-semibold">{solution.caseStudy.roi}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0">
                      <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-xl transform translate-x-10 -translate-y-10"></div>
                      <div className="absolute left-0 bottom-0 w-32 h-32 bg-white/10 rounded-full blur-xl transform -translate-x-10 translate-y-10"></div>
                    </div>
                    
                    <div className="relative">
                      <p className="text-blue-100 italic mb-3">"{solution.caseStudy.testimonial.quote}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white">
                          {solution.caseStudy.testimonial.author.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-white">{solution.caseStudy.testimonial.author}</div>
                          <div className="text-sm text-blue-200">{solution.caseStudy.testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            
            <div className="md:col-span-5 space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 relative overflow-hidden shadow-sm">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-0 left-0 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl transform translate-y-4"></div>
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl transform -translate-y-4"></div>
                </div>
                
                <div className="relative">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-500" /> Global Impact
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Implementation Locations</span>
                      <span className="font-medium text-blue-700">25+ countries</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                      ></motion.div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-gray-600">Adoption Rate</span>
                      <span className="font-medium text-blue-700">92%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "92%" }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-md">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <BarChart2 className="w-5 h-5" /> Impact Statistics
                </h4>
                
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-blue-100">Environmental Impact</span>
                      <span className="text-white font-medium">Exceptional</span>
                    </div>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <motion.div 
                          key={star}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * star }}
                          className="w-8 h-1.5 rounded-full bg-blue-400"
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/10 rounded-lg p-3">
                      <span className="text-blue-100 text-sm">Cost Efficiency</span>
                      <div className="text-white font-medium">Very High</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <span className="text-blue-100 text-sm">Scalability</span>
                      <div className="text-white font-medium">Global</div>
                    </div>
                  </div>
                </div>
                
                <button className="w-full mt-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Bookmark className="w-4 h-4" /> Save Case Study
                </button>
              </div>
              
              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all">
                  Request Demo
                </button>
                <button className="py-3 px-4 bg-white border border-blue-200 hover:border-blue-300 text-blue-600 rounded-lg shadow-sm hover:shadow transition-all">
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface SuccessStory {
  image: string;
  location: string;
  title: string;
  impact: string;
  metrics: {
    value: string;
    label: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    avatar?: string;
  };
}

const successStories: SuccessStory[] = [
  {
    image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f",
    location: "Great Pacific Cleanup",
    title: "Largest Ocean Cleanup Operation",
    impact: "Removed over 100,000 tons of plastic waste",
    metrics: [
      { value: "103,250", label: "Tons Collected" },
      { value: "15,000", label: "Square KM Cleaned" },
      { value: "89%", label: "Waste Recycled" }
    ],
    testimonial: {
      quote: "The impact has been truly transformative for our marine ecosystem.",
      author: "Dr. Maria Rodriguez",
      role: "Marine Biologist",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    }
  },
  {
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",
    location: "Mediterranean Initiative",
    title: "Coastal Protection Program",
    impact: "Protected 2,000 km of coastline",
    metrics: [
      { value: "2,000", label: "KM Protected" },
      { value: "45", label: "Species Saved" },
      { value: "95%", label: "Recovery Rate" }
    ],
    testimonial: {
      quote: "A breakthrough in coastal ecosystem preservation.",
      author: "Prof. James Chen",
      role: "Environmental Scientist",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    }
  },
  {
    image: "https://images.unsplash.com/photo-1559825481-12a05cc00344",
    location: "Caribbean Conservation",
    title: "Coral Reef Restoration",
    impact: "Restored 500 acres of coral reef",
    metrics: [
      { value: "500", label: "Acres Restored" },
      { value: "250+", label: "Species Protected" },
      { value: "78%", label: "Growth Rate" }
    ],
    testimonial: {
      quote: "Revolutionary approach to reef rehabilitation.",
      author: "Dr. Sarah Palmer",
      role: "Marine Conservationist",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    }
  }
];

const SuccessStoryCard = ({ story }: { story: SuccessStory }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group bg-gradient-to-br from-white to-blue-50 p-0.5 rounded-2xl shadow-xl overflow-hidden h-full"
    >
      <div className="bg-white rounded-[10px] overflow-hidden h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <motion.img 
            src={story.image} 
            alt={story.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-4 w-full">
            <div className="flex justify-between items-start">
              <div>
                <span className="inline-block px-2 py-1 bg-blue-600/90 text-white text-xs font-medium rounded-full mb-2">
                  {story.location}
                </span>
                <h3 className="text-xl font-bold text-white">{story.title}</h3>
              </div>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ExternalLink className="h-4 w-4 text-white" />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <p className="text-gray-700 mb-4">{story.impact}</p>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            {story.metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-blue-600 font-bold text-xl bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  {metric.value}
                </div>
                <div className="text-gray-500 text-sm">{metric.label}</div>
              </div>
            ))}
          </div>

          {story.testimonial && (
            <div className="mt-auto border-t border-gray-100 pt-4">
              <div className="relative">
                <p className="text-gray-600 italic mb-3 text-sm">"{story.testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  {story.testimonial.avatar && (
                    <img 
                      src={story.testimonial.avatar} 
                      alt={story.testimonial.author}
                      className="w-10 h-10 rounded-full ring-2 ring-blue-100"
                    />
                  )}
                  <div>
                    <div className="font-medium text-gray-800">{story.testimonial.author}</div>
                    <div className="text-xs text-gray-500">{story.testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProcessStep = ({ icon, title, index }: { icon: React.ReactNode, title: string, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2 }}
    viewport={{ once: true }}
    className="relative text-center"
  >
    <div className="relative">
      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-blue-600 relative z-10">
        {icon}
      </div>
      
      {index < 3 && (
        <div className="hidden md:block absolute top-8 left-[60%] w-full h-[2px] bg-blue-100">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="h-full bg-blue-400"
          />
        </div>
      )}
    </div>
    
    <div className="relative">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: index * 0.2 + 0.3 }}
        viewport={{ once: true }}
        className="absolute -top-1 -right-1 bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
      >
        {index + 1}
      </motion.div>
      <h4 className="font-semibold text-gray-800">{title}</h4>
    </div>
  </motion.div>
);

export default function Solutions() {
  const [selectedSolution, setSelectedSolution] = useState<typeof solutions[0] | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  
  return (
    <section 
      id="solutions" 
      ref={containerRef}
      className="py-20 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50" />
        
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 overflow-hidden opacity-20"
        >
          <div className="absolute top-0 -left-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 -right-40 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </motion.div>
        
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 text-sm font-medium mb-4">
            Advanced Technologies
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Innovative Solutions for
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Ocean Conservation</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leveraging cutting-edge technology to protect our marine ecosystems
          </p>
          
          {/* New: Interactive Search/Filter Component */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative flex items-center rounded-full border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 overflow-hidden">
              <input 
                type="text"
                placeholder="Search solutions..."
                className="w-full py-3 px-4 border-none focus:ring-0 bg-transparent"
              />
              <div className="absolute right-0 top-0 h-full flex items-center px-3 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {['All', 'Cleanup', 'Filtration', 'Monitoring', 'Conservation'].map((filter) => (
                <button 
                  key={filter}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filter === 'All' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-white text-gray-600 hover:bg-blue-50'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {solutions.map((solution, index) => (
            <TechCard
              key={index}
              {...solution}
              index={index}
              onClick={() => setSelectedSolution(solution)}
            />
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedSolution && (
            <SolutionModal
              solution={selectedSolution}
              onClose={() => setSelectedSolution(null)}
            />
          )}
        </AnimatePresence>

        <div className="mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 text-sm font-medium mb-4">
              Real World Impact
            </span>
            <h3 className="text-3xl font-bold mb-4">Success Stories</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover how our solutions are making a real difference in ocean conservation worldwide
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <SuccessStoryCard key={index} story={story} />
            ))}
          </div>
        </div>

        {/* New: Global Impact Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <h3 className="text-2xl font-bold">Global Impact</h3>
            <p className="text-blue-100">Our technologies deployed across the world</p>
          </div>
          
          <div className="relative h-[400px] bg-blue-50">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589519160732-57fc6a9b4c2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10"></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              {/* This would be replaced with an actual interactive map component */}
              <p className="text-lg text-gray-500 px-6 text-center">Interactive global deployment map coming soon</p>
            </div>
            
            {/* Sample data points */}
            {[
              { left: "20%", top: "30%" },
              { left: "70%", top: "20%" },
              { left: "50%", top: "40%" },
              { left: "30%", top: "60%" },
              { left: "80%", top: "50%" },
              { left: "60%", top: "70%" },
            ].map((pos, i) => (
              <motion.div 
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="absolute w-4 h-4 bg-blue-500 rounded-full"
                style={{ left: pos.left, top: pos.top }}
              >
                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-blue-500 rounded-full opacity-70"
                />
              </motion.div>
            ))}
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4 bg-white">
            {[
              { label: "Deployment Sites", value: "150+" },
              { label: "Countries", value: "45" },
              { label: "Debris Collected", value: "1.2M tons" },
              { label: "Species Protected", value: "500+" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold mb-8 text-center">Innovation Timeline</h3>
          <div className="max-w-3xl mx-auto">
            <TimelineItem
              year="2023"
              title="AI-Powered Collection System"
              description="Launch of autonomous marine drones with advanced AI capabilities"
            />
            <TimelineItem
              year="2022"
              title="Global Network Expansion"
              description="Extended our conservation efforts to 50+ coastal regions"
            />
            <TimelineItem
              year="2021"
              title="Smart Filtration Technology"
              description="Introduced revolutionary nano-filtration systems"
            />
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-100 rounded-full opacity-50 blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-8 text-center">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <ProcessStep icon={<Cpu />} title="AI Processing" index={0} />
              <ProcessStep icon={<Database />} title="Data Collection" index={1} />
              <ProcessStep icon={<Globe />} title="Global Network" index={2} />
              <ProcessStep icon={<BarChart2 />} title="Analytics" index={3} />
            </div>
            
            {/* New: Video Demonstration */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-10 relative rounded-xl overflow-hidden"
            >
              <div className="aspect-video bg-gradient-to-r from-blue-700 to-blue-900 flex items-center justify-center">
                <button className="relative z-10 p-5 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors group">
                  <Play className="w-8 h-8 text-white fill-white" />
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 0.2, 0.7]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-white/30"
                  />
                </button>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-28 h-28 rounded-full bg-blue-500/20 blur-2xl"
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <h4 className="text-white font-semibold">See Our Technology in Action</h4>
                <p className="text-blue-100 text-sm">Watch how our solutions are deployed in real-world scenarios</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center relative overflow-hidden shadow-xl"
        >
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-60 animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500 rounded-full mix-blend-overlay filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
          </div>
          
          <div className="relative">
            <Award className="w-16 h-16 mx-auto mb-6 text-blue-100" />
            <h3 className="text-3xl font-bold mb-4">ISO Certified Technology</h3>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Our solutions meet international environmental standards and have received multiple awards for innovation
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {['ISO 14001', 'ISO 9001', 'Green Tech Award', 'Ocean Innovation Prize'].map((cert) => (
                <div key={cert} className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="#demo"
            className="inline-flex items-center gap-3 relative overflow-hidden group"
          >
            <span className="relative z-10 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full text-lg font-semibold transform group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-xl">
              Schedule a Demo
              <Zap className="w-5 h-5 inline ml-2" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 rounded-full"
              initial={false}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}