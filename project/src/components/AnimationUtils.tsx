import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface BubbleEffectProps {
  count?: number;
  className?: string;
}

export function BubbleEffect({ count = 15, className = '' }: BubbleEffectProps) {
  const bubbles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 40 + 10,
    delay: Math.random() * 8,
    duration: Math.random() * 4 + 6,
    left: Math.random() * 100,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-gradient-to-b from-blue-400/20 to-cyan-400/20 backdrop-blur-sm"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
          }}
          animate={{
            y: [window.innerHeight + bubble.size, -bubble.size],
            x: [0, Math.random() * 100 - 50],
            scale: [0, 1, 1, 0],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'float' | 'float-reverse';
  delay?: number;
}

export function FloatingElement({ 
  children, 
  className = '', 
  animation = 'float',
  delay = 0
}: FloatingElementProps) {
  return (
    <motion.div
      className={`animate-${animation} ${className}`}
      style={{ animationDelay: `${delay}s` }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

interface ParticleFieldProps {
  particleCount?: number;
  className?: string;
}

export function ParticleField({ particleCount = 50, className = '' }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: any[] = [];
    let animationId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.3 + 0.1,
    });

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
      }
    };

    const updateParticles = () => {
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.globalAlpha = 0.1 * (1 - distance / 100);
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
}

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowCard({ children, className = '', glowColor = 'blue' }: GlowCardProps) {
  return (
    <motion.div
      className={`relative group ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-${glowColor}-600 to-cyan-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200`} />
      <div className="relative bg-white dark:bg-gray-900 rounded-lg p-6">
        {children}
      </div>
    </motion.div>
  );
}

interface WaveBackgroundProps {
  className?: string;
  waves?: number;
}

export function WaveBackground({ className = '', waves = 3 }: WaveBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: waves }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 left-0 w-full"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            height: `${20 + i * 10}px`,
            opacity: 0.1 - i * 0.02,
          }}
        >
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-full"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="fill-current text-blue-500"
            />
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="fill-current text-cyan-400"
            />
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="fill-current text-blue-600"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
