import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Award, 
  Users, 
  Droplets, 
  Zap, 
  TreePine, 
  Fish,
  Globe,
  Target,
  ArrowUpRight,
  CheckCircle,
  Lightbulb,
  Recycle,
  Wind,
  Calendar,
  MapPin,
  Star,
  Activity,
  PlayCircle,
  Download,
  Share2,
  ExternalLink
} from 'lucide-react';
import { FloatingElement, GlowCard, ParticleField, BubbleEffect } from './AnimationUtils';

interface MetricData {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  suffix: string;
  label: string;
  description: string;
  color: string;
  chart?: number[];
}

interface Achievement {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  impact: string;
  color: string;
}

interface ImpactStory {
  id: string;
  title: string;
  location: string;
  impact: string;
  description: string;
  image: string;
  status: 'completed' | 'active' | 'ongoing';
  year: string;
  metrics: Record<string, string>;
}

const metrics: MetricData[] = [
  {
    id: 'water-saved',
    icon: Droplets,
    value: 50000000,
    suffix: '+',
    label: 'Gallons of Water Saved',
    description: 'Through our advanced filtration and conservation technologies',
    color: 'from-blue-500 to-cyan-400',
    chart: [65, 75, 80, 85, 92, 98, 100]
  },
  {
    id: 'energy-generated',
    icon: Zap,
    value: 25000,
    suffix: 'MW',
    label: 'Clean Energy Generated',
    description: 'Renewable energy produced by our sustainable solutions',
    color: 'from-yellow-500 to-orange-400',
    chart: [45, 60, 70, 80, 85, 90, 95]
  },
  {
    id: 'co2-reduced',
    icon: Wind,
    value: 75000,
    suffix: 'tons',
    label: 'CO₂ Emissions Reduced',
    description: 'Carbon footprint reduction through our environmental technologies',
    color: 'from-green-500 to-emerald-400',
    chart: [30, 45, 55, 65, 75, 85, 90]
  },
  {
    id: 'species-protected',
    icon: Fish,
    value: 150,
    suffix: '+',
    label: 'Marine Species Protected',
    description: 'Biodiversity preservation through ocean conservation efforts',
    color: 'from-purple-500 to-pink-400',
    chart: [10, 25, 40, 60, 80, 120, 150]
  },
  {
    id: 'forests-restored',
    icon: TreePine,
    value: 2500,
    suffix: ' acres',
    label: 'Forests Restored',
    description: 'Reforestation projects creating carbon sinks and habitats',
    color: 'from-emerald-500 to-green-400',
    chart: [200, 500, 800, 1200, 1800, 2200, 2500]
  },
  {
    id: 'communities-served',
    icon: Users,
    value: 100000,
    suffix: '+',
    label: 'Communities Served',
    description: 'People benefiting from our sustainable technology solutions',
    color: 'from-indigo-500 to-purple-400',
    chart: [15000, 30000, 45000, 60000, 75000, 90000, 100000]
  }
];

const impactStories: ImpactStory[] = [
  {
    id: 'ocean-cleanup',
    title: 'Pacific Ocean Restoration',
    location: 'Pacific Ocean',
    impact: '50M gallons cleaned',
    description: 'Our advanced filtration systems removed microplastics and pollutants from a 1000 sq mile area.',
    image: '/api/placeholder/400/300',
    status: 'completed' as const,
    year: '2024',
    metrics: { waste: '500 tons', species: '25+', area: '1000 sq mi' }
  },
  {
    id: 'solar-farms',
    title: 'Desert Solar Initiative',
    location: 'Nevada, USA',
    impact: '25MW generated',
    description: 'Large-scale solar installations providing clean energy to 15,000 homes.',
    image: '/api/placeholder/400/300',
    status: 'active' as const,
    year: '2023',
    metrics: { homes: '15,000', co2: '30,000 tons', jobs: '200+' }
  },
  {
    id: 'coral-restoration',
    title: 'Coral Reef Recovery',
    location: 'Great Barrier Reef',
    impact: '95% recovery rate',
    description: 'Innovative coral farming techniques restoring damaged reef ecosystems.',
    image: '/api/placeholder/400/300',
    status: 'ongoing' as const,
    year: '2024',
    metrics: { area: '50 acres', species: '40+', growth: '300%' }
  }
];

const achievements: Achievement[] = [
  {
    icon: Award,
    title: 'Global Climate Leader',
    description: 'Recognized by the UN for outstanding contributions to environmental sustainability',
    impact: '2024 Environmental Excellence Award',
    color: 'from-amber-500 to-yellow-400'
  },
  {
    icon: Target,
    title: 'Carbon Neutral Certified',
    description: 'Achieved 100% carbon neutrality across all operations and partnerships',
    impact: 'Zero Net Emissions Since 2023',
    color: 'from-green-500 to-emerald-400'
  },
  {
    icon: Lightbulb,
    title: 'Innovation Pioneer',
    description: 'Leading breakthrough technologies in renewable energy and ocean conservation',
    impact: '25+ Patents Filed',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    icon: Recycle,
    title: 'Circular Economy Champion',
    description: 'Implementing sustainable practices across the entire product lifecycle',
    impact: '95% Waste Reduction',
    color: 'from-purple-500 to-pink-400'
  }
];

function CountingNumber({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true);
      let startTime: number | null = null;
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * target));
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [isInView, target, duration, isVisible]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

function MiniChart({ data, color }: { data: number[]; color: string }) {
  const maxValue = Math.max(...data);
  
  return (
    <div className="flex items-end space-x-1 h-8 w-20">
      {data.map((value, index) => (
        <motion.div
          key={index}
          className={`bg-gradient-to-t ${color} rounded-sm flex-1`}
          initial={{ height: 0 }}
          animate={{ height: `${(value / maxValue) * 100}%` }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
        />
      ))}
    </div>
  );
}

export default function Impact() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [selectedStory, setSelectedStory] = useState<ImpactStory | null>(null);
  const [activeTab, setActiveTab] = useState<'metrics' | 'stories' | 'achievements'>('metrics');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  const handleStoryClick = (story: ImpactStory) => {
    setSelectedStory(story);
  };

  return (
    <section id="impact" className="relative py-20 bg-gradient-to-b from-gray-900 via-slate-900 to-blue-900 overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <ParticleField particleCount={100} />
        <BubbleEffect count={25} />
        
        {/* Multiple gradient layers for depth */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br opacity-30"
          animate={{
            background: [
              "linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #0369a1 60%, #0284c7 100%)",
              "linear-gradient(135deg, #1e293b 0%, #0369a1 30%, #0284c7 60%, #06b6d4 100%)",
              "linear-gradient(135deg, #0369a1 0%, #0284c7 30%, #06b6d4 60%, #0f172a 100%)",
            ]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Floating geometric shapes */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 border border-cyan-500/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 1.5
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
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
          >
            <span className="text-white">Transforming</span>
            <br />
            <span className="gradient-text">Our Planet's Future</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6"
          >
            Witness the measurable change we're creating through innovative technology, 
            sustainable solutions, and global partnerships.
          </motion.p>

          {/* Interactive Tab Navigation */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center mb-6"
          >
            <div className="glass-morphism rounded-full p-2 flex space-x-2">
              {[
                { id: 'metrics', label: 'Impact Metrics', icon: Activity },
                { id: 'stories', label: 'Success Stories', icon: Star },
                { id: 'achievements', label: 'Recognition', icon: Award }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 text-sm ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-glow'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Dynamic Content Based on Selected Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'metrics' && (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              {/* Enhanced Impact Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {metrics.map((metric, index) => (
                  <FloatingElement key={metric.id} delay={index * 0.1}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      onHoverStart={() => setSelectedMetric(metric.id)}
                      onHoverEnd={() => setSelectedMetric(null)}
                    >
                      <GlowCard 
                        className="h-72 p-5 cursor-pointer relative overflow-hidden" 
                        glowColor={metric.color.includes('blue') ? 'blue' : 
                                   metric.color.includes('green') ? 'green' : 
                                   metric.color.includes('yellow') ? 'yellow' : 
                                   metric.color.includes('purple') ? 'purple' : 'cyan'}
                      >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                          <motion.div
                            className="absolute -top-10 -right-10 w-32 h-32 rounded-full border border-white/20"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          />
                        </div>

                        <div className="relative z-10 flex flex-col h-full">
                          {/* Header with Icon and Chart */}
                          <div className="flex items-center justify-between mb-4">
                            <motion.div
                              className={`w-12 h-12 rounded-xl bg-gradient-to-r ${metric.color} flex items-center justify-center shadow-lg`}
                              animate={{ 
                                scale: selectedMetric === metric.id ? 1.1 : 1,
                                rotate: selectedMetric === metric.id ? [0, 10, -10, 0] : 0
                              }}
                              transition={{ duration: 0.5 }}
                            >
                              <metric.icon className="w-6 h-6 text-white" />
                            </motion.div>
                            
                            {metric.chart && (
                              <motion.div
                                animate={{ scale: selectedMetric === metric.id ? 1.1 : 1 }}
                                transition={{ duration: 0.3 }}
                              >
                                <MiniChart data={metric.chart} color={metric.color} />
                              </motion.div>
                            )}
                          </div>

                          {/* Main Metric */}
                          <div className="mb-3">
                            <motion.div 
                              className="text-2xl md:text-3xl font-bold text-white mb-2"
                              animate={{ 
                                scale: selectedMetric === metric.id ? 1.05 : 1 
                              }}
                            >
                              <CountingNumber target={metric.value} suffix={metric.suffix} />
                            </motion.div>
                            <h3 className="text-lg font-bold text-gray-200 mb-2">
                              {metric.label}
                            </h3>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-gray-400 flex-1 leading-relaxed">
                            {metric.description}
                          </p>

                          {/* Enhanced Progress Indicator */}
                          <motion.div 
                            className="mt-4 pt-3 border-t border-gray-700"
                            animate={{ opacity: selectedMetric === metric.id ? 1 : 0.8 }}
                          >
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-2 text-green-400">
                                <TrendingUp className="w-3 h-3" />
                                <span className="font-medium">+22% this quarter</span>
                              </div>
                              <motion.div
                                className="text-cyan-400 font-medium"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                Live Data
                              </motion.div>
                            </div>
                          </motion.div>
                        </div>
                      </GlowCard>
                    </motion.div>
                  </FloatingElement>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'stories' && (
            <motion.div
              key="stories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              {/* Impact Stories Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {impactStories.map((story, index) => (
                  <FloatingElement key={story.id} delay={index * 0.15}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      onClick={() => handleStoryClick(story)}
                    >
                      <GlowCard className="h-80 cursor-pointer group overflow-hidden">
                        {/* Story Image */}
                        <div className="relative h-40 bg-gradient-to-r from-blue-500 to-cyan-400 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 to-cyan-500/50" />
                          <motion.div 
                            className="absolute inset-0 flex items-center justify-center"
                            whileHover={{ scale: 1.1 }}
                          >
                            <PlayCircle className="w-12 h-12 text-white/80 group-hover:text-white transition-colors" />
                          </motion.div>
                          
                          {/* Status Badge */}
                          <div className="absolute top-3 right-3">
                            <motion.div
                              className={`px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                                story.status === 'completed' ? 'bg-green-500 text-white' :
                                story.status === 'active' ? 'bg-blue-500 text-white' :
                                'bg-yellow-500 text-black'
                              }`}
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              {story.status}
                            </motion.div>
                          </div>
                        </div>

                        {/* Story Content */}
                        <div className="p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <MapPin className="w-3 h-3 text-cyan-400" />
                            <span className="text-xs text-cyan-400">{story.location}</span>
                            <span className="text-gray-500">•</span>
                            <span className="text-xs text-gray-400">{story.year}</span>
                          </div>
                          
                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                            {story.title}
                          </h3>
                          
                          <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                            {story.description}
                          </p>

                          {/* Impact Highlight */}
                          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-lg p-3 mb-3">
                            <div className="text-lg font-bold text-cyan-400 mb-1">
                              {story.impact}
                            </div>
                            <div className="text-xs text-gray-300 uppercase tracking-wide">
                              Primary Impact
                            </div>
                          </div>

                          {/* Quick Metrics */}
                          <div className="grid grid-cols-3 gap-2 text-center">
                            {Object.entries(story.metrics).slice(0, 3).map(([key, value]) => (
                              <div key={key} className="text-xs">
                                <div className="font-semibold text-white text-xs">{value}</div>
                                <div className="text-gray-500 capitalize text-xs">{key}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </GlowCard>
                    </motion.div>
                  </FloatingElement>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              {/* Enhanced Achievements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {achievements.map((achievement, index) => (
                  <FloatingElement key={achievement.title} delay={index * 0.2} animation="float-reverse">
                    <motion.div 
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                    >
                      <GlowCard className="p-6 h-full relative overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                          <motion.div
                            className={`w-full h-full rounded-full bg-gradient-to-br ${achievement.color}`}
                            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                            transition={{ duration: 8, repeat: Infinity }}
                          />
                        </div>

                        <div className="relative z-10 flex items-start space-x-4">
                          <motion.div
                            className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${achievement.color} flex items-center justify-center flex-shrink-0 shadow-xl`}
                            whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            <achievement.icon className="w-7 h-7 text-white" />
                          </motion.div>
                          
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-white mb-2">
                              {achievement.title}
                            </h4>
                            <p className="text-gray-300 mb-3 leading-relaxed">
                              {achievement.description}
                            </p>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span className="font-bold text-green-400">
                                {achievement.impact}
                              </span>
                            </div>
                            
                            {/* Additional action buttons */}
                            <div className="flex space-x-2 mt-3">
                              <motion.button
                                className="text-xs px-3 py-1 glass-morphism rounded-full text-cyan-400 hover:text-white transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <span className="flex items-center space-x-1">
                                  <ExternalLink className="w-2 h-2" />
                                  <span>Learn More</span>
                                </span>
                              </motion.button>
                              <motion.button
                                className="text-xs px-3 py-1 glass-morphism rounded-full text-green-400 hover:text-white transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <span className="flex items-center space-x-1">
                                  <Share2 className="w-2 h-2" />
                                  <span>Share</span>
                                </span>
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </GlowCard>
                    </motion.div>
                  </FloatingElement>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Call to Action */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center"
        >
          <FloatingElement delay={0.8}>
            <motion.div 
              variants={itemVariants}
              className="glass-morphism rounded-3xl p-8 max-w-4xl mx-auto relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-400/10 to-green-500/10" />
              
              <motion.div
                className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center relative"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity }
                }}
              >
                <Globe className="w-8 h-8 text-white" />
                <div className="absolute inset-0 rounded-full border-4 border-cyan-400/30 animate-ping" />
              </motion.div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Join the Revolution
              </h3>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Partner with BlueTech Revolution to amplify your environmental impact and create lasting change for our planet.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold rounded-full shadow-glow hover:shadow-glow-lg transition-all duration-300 relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center space-x-2 relative z-10">
                    <Users className="w-5 h-5" />
                    <span>Partner With Us</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
                
                <motion.button
                  className="px-8 py-4 glass-morphism rounded-full text-white font-bold border border-white/20 hover:border-white/40 transition-all duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center space-x-2">
                    <Download className="w-5 h-5 group-hover:animate-bounce" />
                    <span>Impact Report</span>
                  </span>
                </motion.button>
              </div>

              {/* Trust indicators */}
              <motion.div 
                className="mt-8 pt-6 border-t border-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p className="text-gray-400 mb-3 text-sm">Trusted by leading organizations worldwide</p>
                <div className="flex justify-center items-center space-x-6 opacity-50">
                  {['UN', 'NASA', 'WWF', 'GREENPEACE'].map((org, i) => (
                    <motion.div
                      key={org}
                      className="text-lg font-bold text-gray-300"
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                    >
                      {org}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </FloatingElement>
        </motion.div>
      </div>

      {/* Story Detail Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedStory(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="glass-morphism rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedStory.title}</h3>
                  <div className="flex items-center space-x-4 text-gray-400">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedStory.location}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedStory.year}</span>
                    </span>
                  </div>
                </div>
                <motion.button
                  onClick={() => setSelectedStory(null)}
                  className="w-10 h-10 glass-morphism rounded-full flex items-center justify-center text-gray-400 hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.button>
              </div>

              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-2xl p-6 mb-6">
                <div className="text-3xl font-bold text-cyan-400 mb-2">{selectedStory.impact}</div>
                <div className="text-gray-300">Primary Environmental Impact</div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {selectedStory.description}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {Object.entries(selectedStory.metrics).map(([key, value]) => (
                  <div key={key} className="text-center p-4 glass-morphism rounded-xl">
                    <div className="text-xl font-bold text-white mb-1">{value}</div>
                    <div className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-4">
                <motion.button
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Full Case Study
                </motion.button>
                <motion.button
                  className="px-6 py-3 glass-morphism rounded-full text-cyan-400 border border-cyan-400/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Share Impact
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
