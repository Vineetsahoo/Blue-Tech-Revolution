import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Waves, ChevronDown, 
  Globe, Book, BarChart2, Users, LifeBuoy
} from 'lucide-react';

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
    href: "#contact-form",  // Updated href to match contact form's id
    icon: <LifeBuoy className="w-5 h-5" />
  }
];

const NavDropdown = ({ item }: { item: NavItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button 
        onClick={(e) => handleClick(e as any, item.href)}
        className="flex items-center gap-1 text-white hover:bg-blue-800 px-3 py-2 rounded-md"
      >
        {item.icon && <span className="mr-2">{item.icon}</span>}
        {item.label}
        {item.dropdownItems && <ChevronDown className="w-4 h-4 ml-1" />}
      </button>

      {item.dropdownItems && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute left-0 mt-2 w-72 rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden"
            >
              <div className="p-2">
                {item.dropdownItems.map((dropItem, idx) => (
                  <a
                    key={idx}
                    href={dropItem.href}
                    className="flex items-start gap-4 p-3 hover:bg-blue-50 rounded-lg group transition-colors"
                  >
                    {dropItem.icon && (
                      <div className="text-blue-600 group-hover:text-blue-700">
                        {dropItem.icon}
                      </div>
                    )}
                    <div>
                      <p className="text-gray-900 font-medium">{dropItem.label}</p>
                      {dropItem.description && (
                        <p className="text-sm text-gray-500">{dropItem.description}</p>
                      )}
                    </div>
                  </a>
                ))}
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSupportClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-blue-900/95 backdrop-blur-sm shadow-lg' : 'bg-blue-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Waves className="h-8 w-8 text-blue-400" />
            </motion.div>

            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                {navItems.map((item, index) => (
                  <NavDropdown key={index} item={item} />
                ))}
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-400 hover:text-white hover:bg-blue-800"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-blue-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-2 text-white px-3 py-2 rounded-md hover:bg-blue-700"
                >
                  {item.icon}
                  {item.label}
                </a>
              ))}
              <div className="px-3 py-2">
                <button onClick={handleSupportClick} className="flex items-center gap-2 text-white px-3 py-2 rounded-md hover:bg-blue-700">
                  <LifeBuoy className="w-5 h-5" />
                  Support
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}