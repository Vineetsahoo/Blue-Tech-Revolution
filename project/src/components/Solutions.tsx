import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Recycle, Droplet, Shield, Cpu, Database, Globe, BarChart2, Zap, Award, 
         Activity, ChevronRight, X } from 'lucide-react';

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
}

const TechCard = ({ title, icon, description, onClick }: TechCardProps) => (
  <motion.button
    onClick={onClick}
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.98 }}
    className="relative group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-left w-full"
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
      <Cpu className="w-5 h-5 text-blue-400" />
    </div>
  </motion.button>
);

const MetricsCard = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-blue-100"
  >
    <div className="flex items-center gap-3">
      <div className="p-2 bg-blue-100 rounded-lg">{icon}</div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <h4 className="text-lg font-bold text-blue-600">{value}</h4>
      </div>
    </div>
  </motion.div>
);

const TimelineItem = ({ year, title, description }: { year: string; title: string; description: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    className="relative pl-8 border-l-2 border-blue-200 mb-8"
  >
    <div className="absolute left-[-9px] top-0 w-4 h-4 bg-blue-500 rounded-full" />
    <span className="text-sm text-blue-600 font-semibold">{year}</span>
    <h4 className="text-lg font-bold mt-1">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const SolutionModal = ({ solution, onClose }: { solution: any; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    onClick={onClose} // Close when clicking outside
  >
    <motion.div
      className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Add close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 hover:bg-blue-50 rounded-full transition-colors"
      >
        <X className="w-6 h-6 text-blue-600 hover:text-blue-800" />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">{solution.title}</h3>
          <p className="text-gray-600 mb-6">{solution.description}</p>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Key Features</h4>
            <ul className="space-y-2">
              {solution.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-3">Performance Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(solution.metrics).map(([key, value]) => (
                <MetricsCard
                  key={key}
                  title={key.replace(/([A-Z])/g, ' $1').trim()}
                  value={value as string}
                  icon={<Activity className="w-4 h-4" />}
                />
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <h4 className="font-semibold mb-4">Case Study</h4>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
            <h4 className="font-semibold mb-4">Impact Statistics</h4>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

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

const SuccessStoryCard = ({ story }: { story: SuccessStory }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white rounded-2xl shadow-xl overflow-hidden"
  >
    <div className="relative h-48 overflow-hidden">
      <img 
        src={story.image} 
        alt={story.title}
        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4 text-white">
        <span className="text-sm font-medium bg-blue-600/90 px-2 py-1 rounded-full">
          {story.location}
        </span>
        <h3 className="text-xl font-bold mt-2">{story.title}</h3>
      </div>
    </div>

    <div className="p-6">
      <p className="text-gray-600 mb-4">{story.impact}</p>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        {story.metrics.map((metric, index) => (
          <div key={index} className="text-center">
            <div className="text-blue-600 font-bold text-xl">{metric.value}</div>
            <div className="text-gray-500 text-sm">{metric.label}</div>
          </div>
        ))}
      </div>

      {story.testimonial && (
        <div className="border-t pt-4">
          <p className="text-gray-600 italic mb-3">"{story.testimonial.quote}"</p>
          <div className="flex items-center gap-3">
            {story.testimonial.avatar && (
              <img 
                src={story.testimonial.avatar} 
                alt={story.testimonial.author}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div>
              <div className="font-medium">{story.testimonial.author}</div>
              <div className="text-sm text-gray-500">{story.testimonial.role}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  </motion.div>
);

export default function Solutions() {
  const [selectedSolution, setSelectedSolution] = useState<typeof solutions[0] | null>(null);

  return (
    <section id="solutions" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
            Advanced Technologies
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Innovative Solutions for
            <span className="text-blue-600"> Ocean Conservation</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leveraging cutting-edge technology to protect our marine ecosystems
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {solutions.map((solution, index) => (
            <TechCard
              key={index}
              {...solution}
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
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
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

        <div className="mt-20">
          <h3 className="text-2xl font-bold mb-8">Innovation Timeline</h3>
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

        <div className="mt-20 bg-white/50 backdrop-blur-sm rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-8 text-center">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { icon: <Cpu />, title: "AI Processing" },
              { icon: <Database />, title: "Data Collection" },
              { icon: <Globe />, title: "Global Network" },
              { icon: <BarChart2 />, title: "Analytics" }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  {step.icon}
                </div>
                <h4 className="font-semibold">{step.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 p-6 bg-blue-600 rounded-2xl text-white text-center"
        >
          <Award className="w-12 h-12 mx-auto mb-4 text-blue-100" />
          <h3 className="text-2xl font-bold mb-2">ISO Certified Technology</h3>
          <p className="text-blue-100">Our solutions meet international environmental standards</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 text-center"
        >
          <a
            href="#demo"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Schedule a Demo
            <Zap className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}