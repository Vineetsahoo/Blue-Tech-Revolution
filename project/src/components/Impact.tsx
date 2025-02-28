import  { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

interface StatProps {
  value: number;
  label: string;
  suffix: string;
  delay: number;
}

const ProgressBar = ({ percentage, label }: { percentage: number; label: string }) => {
  const barRef = useRef(null);
  const isInView = useInView(barRef, { once: true });

  return (
    <div ref={barRef} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-gray-700 font-medium">{label}</span>
        <span className="text-blue-600 font-bold">{percentage}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const StatCounter = ({ value, label, suffix, delay }: StatProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 20, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
      transition={{ duration: 0.8, delay }}
      className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-100"
    >
      <motion.h3 
        className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
        initial={{ opacity: 0 }}
        animate={isInView ? {
          opacity: 1,
          transition: { duration: 2 }
        } : { opacity: 0 }}
      >
        {isInView ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0 }}
          >
            {value}
          </motion.span>
        ) : "0"}
        {suffix}
      </motion.h3>
      <p className="text-gray-600 mt-2 text-lg">{label}</p>
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

  return (
    <section 
      id="impact" 
      className="py-24 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden"
      ref={containerRef}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-30">
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
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            Making Waves of Change
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Global Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Through innovative technology and dedicated efforts, we're making measurable progress in ocean conservation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <motion.div 
            className="md:col-span-7 rounded-2xl overflow-hidden shadow-2xl"
            style={{ y, opacity }}
          >
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1621451537084-482c73073a0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Ocean cleanup efforts in action"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Active Cleanup Sites</h3>
                <p>Operational in 50+ locations worldwide</p>
              </div>
            </div>
          </motion.div>
          
          <div className="md:col-span-5 space-y-6">
            <StatCounter value={1000000} label="Tons of debris collected" suffix="+" delay={0.2} />
            <StatCounter value={500} label="Marine species protected" suffix="+" delay={0.4} />
            <StatCounter value={100} label="Coastal communities supported" suffix="+" delay={0.6} />
            <StatCounter value={75} label="Research papers published" suffix="+" delay={0.8} />
          </div>
        </div>

        {/* New Progress Section */}
        <motion.div
          className="mt-16 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Our Progress Towards 2025 Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <ProgressBar percentage={75} label="Ocean Cleanup Target" />
              <ProgressBar percentage={85} label="Species Protection" />
              <ProgressBar percentage={60} label="Community Engagement" />
            </div>
            <div>
              <ProgressBar percentage={90} label="Research Objectives" />
              <ProgressBar percentage={70} label="Educational Outreach" />
              <ProgressBar percentage={80} label="Sustainable Practices" />
            </div>
          </div>
        </motion.div>

        {/* Achievement Highlights */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            { title: "UN Recognition", desc: "Awarded for outstanding environmental conservation efforts" },
            { title: "Global Partners", desc: "Collaborating with 200+ organizations worldwide" },
            { title: "Innovation Award", desc: "Leading breakthrough in ocean cleaning technology" }
          ].map((achievement, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-blue-100 shadow-lg">
              <h4 className="text-xl font-bold text-blue-600 mb-2">{achievement.title}</h4>
              <p className="text-gray-600">{achievement.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <a
            href="#join-us"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold 
            hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
          >
            Join Our Mission
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}