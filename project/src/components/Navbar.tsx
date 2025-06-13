import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Menu, X, Waves, ChevronDown, 
  Globe, Book, BarChart2, Users, LifeBuoy, Search, Bell,
  Sun, Moon, ArrowUp
} from 'lucide-react';
import UserMenu from './auth/UserMenu';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  dropdownItems?: Array<{
    label: string;
    href: string;
    description?: string;
    icon?: React.ReactNode;
  }>;
}

const navItems: NavItem[] = [
  {
    label: "Solutions",
    href: "#solutions",
    icon: <BarChart2 className="w-5 h-5" />,
    dropdownItems: [
      {
        label: "Ocean Cleanup",
        href: "#cleanup",
        description: "AI-powered debris collection",
        icon: <Waves className="w-5 h-5" />
      },
      {
        label: "Research",
        href: "#research",
        description: "Marine ecosystem studies",
        icon: <Book className="w-5 h-5" />
      },
      {
        label: "Global Network",
        href: "#network",
        description: "Worldwide conservation efforts",
        icon: <Globe className="w-5 h-5" />
      }
    ]
  },
  {
    label: "Impact",
    href: "#impact",
    icon: <Users className="w-5 h-5" />
  },
  {
    label: "Support",
    href: "#contact-form",  
    icon: <LifeBuoy className="w-5 h-5" />
  }
];

// Micro-interaction variants for animations
const navItemVariants = {
  hidden: { opacity: 0, y: -5 },
  visible: { opacity: 1, y: 0 }
};

const NavDropdown = ({ item }: { item: NavItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      ref={dropdownRef}
      className="relative" 
      onMouseEnter={() => setIsOpen(true)} 
      onMouseLeave={() => setIsOpen(false)}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-white hover:text-blue-100 px-3 py-2 rounded-md transition-all relative group"
      >
        {item.icon && (
          <motion.span 
            className="mr-2"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {item.icon}
          </motion.span>
        )}
        {item.label}
        {item.dropdownItems && (
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 ml-1" />
          </motion.div>
        )}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 origin-left rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </button>

      {item.dropdownItems && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute left-0 mt-1 w-80 rounded-xl overflow-hidden shadow-2xl border border-blue-100/20 backdrop-blur-lg z-50"
            >
              <div className="bg-gradient-to-br from-white/95 via-white/90 to-blue-50/90 p-3 dark:from-slate-800/95 dark:via-slate-800/90 dark:to-slate-700/90 dark:text-white">
                <div className="grid gap-2">
                  {item.dropdownItems.map((dropItem, idx) => (
                    <motion.a
                      key={idx}
                      href={dropItem.href}
                      onClick={(e) => handleClick(e, dropItem.href)}
                      className="flex items-start gap-4 p-3 hover:bg-blue-50/80 dark:hover:bg-slate-700/80 rounded-lg group transition-all duration-200"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ x: 2 }}
                    >
                      {dropItem.icon && (
                        <motion.div 
                          className="p-2 bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-600 dark:from-blue-500/20 dark:to-cyan-500/20 dark:text-blue-300 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-200"
                          whileHover={{ 
                            scale: 1.05, 
                            rotate: 5,
                            background: "linear-gradient(to bottom right, #bfdbfe, #a5f3fc)"
                          }}
                        >
                          {dropItem.icon}
                        </motion.div>
                      )}
                      <div>
                        <p className="text-gray-900 font-medium dark:text-white">{dropItem.label}</p>
                        {dropItem.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-300">{dropItem.description}</p>
                        )}
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const {  scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const navBackground = useTransform(
    scrollYProgress,
    [0, 0.1],
    ["rgba(30, 58, 138, 0.7)", "rgba(23, 37, 84, 0.95)"]
  );
  
  const searchRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setShowScrollTop(window.scrollY > 300);
    };
    
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    // Check user's preferred color scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // You can remove this function if not needed, or keep it for future use
  // const handleSupportClick = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   const contactForm = document.getElementById('contact-form');
  //   if (contactForm) {
  //     contactForm.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ 
          background: isScrolled ? navBackground : "linear-gradient(to right, rgba(30, 58, 138, 0.7), rgba(30, 64, 175, 0.7))" 
        }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'shadow-lg py-2 backdrop-blur-md' 
            : 'backdrop-blur-sm py-4'
        } dark:from-slate-900/95 dark:to-slate-800/95`}
      >
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 dark:from-blue-500/5 dark:to-cyan-500/5"
        />
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBkPSJNMCAwIEw2MCA2MCBNNjAgMCBMMCAwIE02MCA2MCBMMCAwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYwOCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1kYXNoYXJyYXk9IjEiLz48L3N2Zz4=')] opacity-10"></div>
        
        {/* Scroll progress indicator */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400"
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <motion.a 
                href="#home"
                className="flex-shrink-0 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="relative">
                  <motion.div 
                    className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-md opacity-70"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 0.8, 0.7]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  <Waves className="h-8 w-8 text-white relative" />
                </div>
                <span className="font-bold text-white text-xl ml-1 tracking-tight">
                  Blue<span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">Tech</span>
                </span>
              </motion.a>

              <div className="hidden md:block ml-10">
                <motion.div 
                  className="flex items-center space-x-1"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                  {navItems.map((item, index) => (
                    <motion.div key={index} variants={navItemVariants}>
                      <NavDropdown item={item} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <div ref={searchRef} className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-blue-300 hover:text-white rounded-full transition-colors"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </motion.button>
                
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "300px" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute right-0 top-0 overflow-hidden"
                    >
                      <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
                        <input
                          type="text"
                          placeholder="Search..."
                          className="w-full py-2 pl-4 pr-10 bg-transparent text-white border-none focus:ring-0 focus:outline-none placeholder-blue-200/70"
                          autoFocus
                        />
                        <button className="absolute right-3 text-blue-300">
                          <Search className="h-5 w-5" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <button className="p-2 text-blue-300 hover:text-white rounded-full transition-colors group">
                  <Bell className="h-5 w-5" />
                  <motion.span 
                    className="absolute top-0 right-0 h-2 w-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
                    animate={{ 
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                </button>
              </motion.div>
              
              {/* Theme toggle button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleDarkMode}
                className="p-2 text-blue-300 hover:text-white rounded-full transition-colors"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                <AnimatePresence mode="wait">
                  {isDarkMode ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
              
              <UserMenu />
            </div>

            <div className="md:hidden flex items-center space-x-4">
              <UserMenu />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-blue-300 hover:text-white hover:bg-blue-800/50 transition-colors"
                aria-label="Open menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-gradient-to-b from-blue-800/95 to-blue-900/95 backdrop-blur-md border-t border-white/10"
            >
              <div className="px-3 pt-3 pb-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                    className="flex items-center gap-3 text-blue-100 px-4 py-3 rounded-lg transition-all"
                  >
                    <motion.div 
                      whileHover={{ rotate: 5 }}
                      className="p-2 bg-blue-800/50 rounded-lg"
                    >
                      {item.icon}
                    </motion.div>
                    <span>{item.label}</span>
                    {item.dropdownItems && <ChevronDown className="w-4 h-4 ml-auto" />}
                  </motion.a>
                ))}
                
                <div className="pt-4 pb-2 border-t border-blue-700/50">
                  <div className="flex items-center justify-between px-4 py-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={toggleDarkMode}
                      className="flex items-center gap-3 text-blue-200 rounded-lg p-2"
                    >
                      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                      <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 text-blue-200 rounded-lg p-2"
                    >
                      <Bell className="h-5 w-5" />
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    </motion.button>
                  </div>
                  
                  <div className="px-4 py-2">
                    <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/10 rounded-lg px-3 py-2">
                      <Search className="h-5 w-5 text-blue-300 mr-2" />
                      <input
                        type="text"
                        placeholder="Search..."
                        className="block w-full bg-transparent border-none text-blue-100 focus:outline-none focus:ring-0 placeholder-blue-300/50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg z-40 text-white"
            aria-label="Scroll to top"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}