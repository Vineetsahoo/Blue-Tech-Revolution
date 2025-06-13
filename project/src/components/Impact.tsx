import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { BarChart2, PieChart, TrendingUp, Award, AlertTriangle, CheckCircle, Shield, Droplet, Zap, Wind, Globe } from 'lucide-react';

interface StatProps {
  value: number;
  label: string;
  suffix: string;
  delay: number;
  icon: React.ReactNode;
  color: string;
}

const CountUpAnimation = ({ target, duration = 2000 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });
  
  React.useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, isInView]);
  
  return <span ref={nodeRef}>{count.toLocaleString()}</span>;
};

const ProgressBar = ({ percentage, label, color = "blue" }: { percentage: number; label: string; color?: string }) => {
  const barRef = useRef(null);
  const isInView = useInView(barRef, { once: true, margin: "-100px" });
  
  const gradientMap = {
    blue: "from-blue-600 to-cyan-500",
    green: "from-green-600 to-teal-500",
    purple: "from-purple-600 to-pink-500",
    amber: "from-amber-500 to-orange-600",
    indigo: "from-indigo-600 to-blue-500"
  };
  
  const gradient = gradientMap[color as keyof typeof gradientMap] || gradientMap.blue;

  return (
    <div ref={barRef} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-gray-700 font-medium">{label}</span>
        <div className="flex items-center gap-1">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="text-blue-600 font-bold"
          >
            {isInView ? <CountUpAnimation target={percentage} /> : "0"}%
          </motion.span>
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView && percentage >= 90 ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, delay: 1.7 }}
          >
            <CheckCircle className="w-4 h-4 text-green-500" />
          </motion.div>
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView && percentage < 70 ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, delay: 1.7 }}
          >
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </motion.div>
        </div>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${gradient} rounded-full relative`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        >
          <motion.div 
            className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 skew-x-12"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "loop", delay: 1 }}
          />
        </motion.div>
      </div>
    </div>
  );
};

const StatCounter = ({ value, label, suffix, delay, icon, color = "blue" }: StatProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const gradientMap = {
    blue: "from-blue-600 to-cyan-500",
    green: "from-green-500 to-teal-400",
    purple: "from-purple-600 to-pink-500",
    amber: "from-amber-500 to-orange-500"
  };
  
  const gradient = gradientMap[color as keyof typeof gradientMap] || gradientMap.blue;
  
  return (
    <motion.div
      ref={ref}
      initial={{ y: 30, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      transition={{ duration: 0.8, delay }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-cyan-100/50 rounded-2xl blur-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-100 group-hover:border-blue-200 z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 bg-gradient-to-br ${gradient} rounded-xl text-white`}>
            {icon}
          </div>
          
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: delay + 0.3 }}
            className="w-12 h-12 rounded-full border-4 border-blue-100 flex items-center justify-center font-bold text-blue-600"
          >
            <TrendingUp className="w-5 h-5" />
          </motion.div>
        </div>
        
        <motion.h3 
          className={`text-4xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent flex items-center gap-1`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
        >
          {isInView ? <CountUpAnimation target={value} /> : "0"}
          <span>{suffix}</span>
        </motion.h3>
        
        <p className="text-gray-600 mt-2 text-lg">{label}</p>
        
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: delay + 0.4 }}
          className={`mt-4 h-1.5 bg-gradient-to-r ${gradient} rounded-full origin-left`}
        />
      </div>
    </motion.div>
  );
};

interface Achievement {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  metric: string;
}

const achievements: Achievement[] = [
  {
    year: "2023",
    title: "Global Recognition",
    description: "Received United Nations Ocean Conservation Award for innovative cleanup solutions",
    icon: <Award className="w-5 h-5" />,
    metric: "95% efficiency rating"
  },
  {
    year: "2022",
    title: "Technical Breakthrough",
    description: "Developed nano-filtration technology that removes 99.9% of microplastics",
    icon: <Zap className="w-5 h-5" />,
    metric: "500+ deployments"
  },
  {
    year: "2021",
    title: "Expansion Milestone",
    description: "Expanded operations to 50+ countries with local partnerships",
    icon: <Globe className="w-5 h-5" />,
    metric: "150 new partnerships"
  }
];

const AchievementCard = ({ achievement, index }: { achievement: Achievement; index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            {achievement.year}
          </span>
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
            {achievement.icon}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
        <p className="text-gray-600 mb-4">{achievement.description}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-blue-600 font-semibold">{achievement.metric}</span>
          <motion.div
            whileHover={{ x: 5 }}
            className="p-2 bg-blue-50 rounded-lg text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <TrendingUp className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Impact() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
  
  const [activeChart, setActiveChart] = useState('impact');
  
  const stats = [
    { value: 1000000, label: "Tons of debris collected", suffix: "+", delay: 0.2, icon: <Shield className="h-6 w-6" />, color: "blue" },
    { value: 500, label: "Marine species protected", suffix: "+", delay: 0.4, icon: <Droplet className="h-6 w-6" />, color: "green" },
    { value: 100, label: "Coastal communities supported", suffix: "+", delay: 0.6, icon: <Wind className="h-6 w-6" />, color: "purple" },
    { value: 75, label: "Research papers published", suffix: "+", delay: 0.8, icon: <Globe className="h-6 w-6" />, color: "amber" }
  ];

  return (
    <section 
      id="impact" 
      className="py-24 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden"
      ref={containerRef}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="text-center mb-20"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4 shadow-sm">
            <TrendingUp className="w-4 h-4" />
            <span>Making Waves of Change</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Global <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Impact</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Through innovative technology and dedicated efforts, we're making measurable progress in ocean conservation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-20">
          <motion.div 
            className="md:col-span-5 space-y-6"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stats.slice(0, 2).map((stat, index) => (
                <StatCounter key={index} {...stat} />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stats.slice(2, 4).map((stat, index) => (
                <StatCounter key={index} {...stat} />
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="md:col-span-7 rounded-2xl overflow-hidden shadow-2xl"
            style={{ y, opacity }}
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 to-blue-800 p-1">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full filter blur-3xl"></div>
              </div>
              
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621451537084-482c73073a0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center mix-blend-overlay opacity-40" />
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl h-full relative p-6 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-white">Global Impact Metrics</h3>
                  
                  <div className="flex bg-white/10 backdrop-blur-sm rounded-lg p-1">
                    <button 
                      onClick={() => setActiveChart('impact')}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        activeChart === 'impact' ? 'bg-white text-blue-700' : 'text-white'
                      }`}
                    >
                      Impact
                    </button>
                    <button 
                      onClick={() => setActiveChart('trend')}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        activeChart === 'trend' ? 'bg-white text-blue-700' : 'text-white'
                      }`}
                    >
                      Trends
                    </button>
                  </div>
                </div>
                
                <AnimatePresence mode="wait">
                  {activeChart === 'impact' ? (
                    <motion.div 
                      key="impact"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="flex-grow flex flex-col justify-center"
                    >
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <BarChart2 className="h-5 w-5 text-cyan-300" />
                            <h4 className="text-white font-medium">Collection Efficiency</h4>
                          </div>
                          <div className="text-3xl font-bold text-white">95.7%</div>
                          <div className="text-cyan-200 text-sm">+12.4% from last year</div>
                        </div>
                        
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <PieChart className="h-5 w-5 text-cyan-300" />
                            <h4 className="text-white font-medium">Species Recovery</h4>
                          </div>
                          <div className="text-3xl font-bold text-white">82.3%</div>
                          <div className="text-cyan-200 text-sm">+7.8% from last year</div>
                        </div>
                      </div>
                      
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="grid grid-cols-3 gap-6 mb-4">
                          <div className="text-center">
                            <div className="text-cyan-200 text-sm">Areas Covered</div>
                            <div className="text-2xl font-bold text-white">175+</div>
                            <div className="text-xs text-cyan-300">coastal regions</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-cyan-200 text-sm">Tons Processed</div>
                            <div className="text-2xl font-bold text-white">500K+</div>
                            <div className="text-xs text-cyan-300">this year alone</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-cyan-200 text-sm">Volunteers</div>
                            <div className="text-2xl font-bold text-white">25,000+</div>
                            <div className="text-xs text-cyan-300">globally engaged</div>
                          </div>
                        </div>
                        
                        <div className="w-full h-24 relative mt-4">
                          {/* Simplified chart visualization */}
                          <div className="absolute inset-x-0 bottom-0 h-full flex items-end">
                            {[0.6, 0.8, 0.7, 0.9, 1, 0.85, 0.95].map((height, i) => (
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
                  ) : (
                    <motion.div 
                      key="trend"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="flex-grow flex items-center justify-center"
                    >
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 relative">
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            <circle 
                              cx="50" cy="50" r="45" 
                              fill="none" 
                              stroke="rgba(255,255,255,0.1)" 
                              strokeWidth="10" 
                            />
                            <motion.circle 
                              cx="50" cy="50" r="45" 
                              fill="none" 
                              stroke="rgba(56, 189, 248, 0.8)" 
                              strokeWidth="10" 
                              strokeDasharray="282.7"
                              initial={{ strokeDashoffset: 282.7 }}
                              animate={{ strokeDashoffset: 282.7 * 0.25 }}
                              transition={{ duration: 2, ease: "easeInOut" }}
                              strokeLinecap="round"
                              transform="rotate(-90 50 50)"
                            />
                            <text 
                              x="50" y="50" 
                              textAnchor="middle" 
                              dominantBaseline="middle" 
                              fill="white" 
                              fontSize="18" 
                              fontWeight="bold"
                            >
                              75%
                            </text>
                          </svg>
                        </div>
                        <h4 className="text-xl font-semibold text-white mb-2">Target Completion</h4>
                        <p className="text-cyan-200 max-w-md mx-auto">
                          We're 75% of the way to our 2025 goal of eliminating 2 million tons of ocean plastic
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-cyan-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-cyan-400"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Progress Section */}
        <motion.div
          className="mt-16 mb-20 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-blue-100 relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="absolute inset-0 pointer-events-none opacity-50">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-200 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">
                  Our Progress Towards 2025 Goals
                </h3>
                <p className="text-gray-600">
                  Tracking our impact and achievements in real-time
                </p>
              </div>
              
              <div className="flex gap-2 bg-blue-50 p-1 rounded-lg">
                <button className="px-3 py-1 bg-white text-blue-700 shadow-sm rounded-md font-medium text-sm">
                  Quarterly
                </button>
                <button className="px-3 py-1 text-gray-700 hover:bg-white/50 rounded-md font-medium text-sm transition-colors">
                  Yearly
                </button>
                <button className="px-3 py-1 text-gray-700 hover:bg-white/50 rounded-md font-medium text-sm transition-colors">
                  All Time
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <ProgressBar percentage={75} label="Ocean Cleanup Target" color="blue" />
                <ProgressBar percentage={85} label="Species Protection" color="green" />
                <ProgressBar percentage={60} label="Community Engagement" color="amber" />
              </div>
              <div>
                <ProgressBar percentage={90} label="Research Objectives" color="indigo" />
                <ProgressBar percentage={70} label="Educational Outreach" color="purple" />
                <ProgressBar percentage={80} label="Sustainable Practices" color="green" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Achievement Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-center mb-10">Key Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <AchievementCard key={index} achievement={achievement} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Impact Map */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <h3 className="text-2xl font-bold">Global Presence</h3>
            <p className="text-blue-100">Our impact spans across continents</p>
          </div>
          
          <div className="relative h-96 bg-blue-50">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589519160732-57fc6a9b4c2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10"></div>
            
            {/* Sample data points */}
            {[
              { left: "20%", top: "30%", label: "North America", value: "45 sites" },
              { left: "70%", top: "35%", label: "Asia", value: "32 sites" },
              { left: "50%", top: "25%", label: "Europe", value: "28 sites" },
              { left: "30%", top: "60%", label: "South America", value: "19 sites" },
              { left: "80%", top: "65%", label: "Australia", value: "12 sites" },
              { left: "45%", top: "50%", label: "Africa", value: "14 sites" },
            ].map((pos, i) => (
              <motion.div 
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="absolute w-auto h-auto z-10"
                style={{ left: pos.left, top: pos.top }}
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="relative"
                >
                  <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-md"></div>
                  <div className="w-5 h-5 bg-blue-500 rounded-full relative">
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-blue-500 rounded-full opacity-70"
                    />
                  </div>
                  
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white py-1 px-2 rounded shadow-md whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-800">{pos.label}</p>
                    <p className="text-xs text-blue-600 text-center">{pos.value}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="relative py-12 px-6 md:px-12 rounded-3xl overflow-hidden text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>
            <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1564198879220-63f2734f7cec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center"></div>
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <Award className="w-16 h-16 text-white/80 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4">Join Our Mission Today</h3>
            <p className="text-blue-100 text-xl mb-8">
              Be a part of the global movement to save our oceans for future generations
            </p>
            
            <motion.a
              href="#join-us"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold 
              hover:bg-blue-50 transition-all duration-300 shadow-lg"
            >
              Get Involved Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}