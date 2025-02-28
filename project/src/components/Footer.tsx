import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Github, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Mission', href: '/mission' },
    { name: 'Projects', href: '/projects' },
    { name: 'Get Involved', href: '/get-involved' },
    { name: 'Donate', href: '/donate' },
  ];

  const resources = [
    { name: 'Ocean Facts', href: '/resources/facts' },
    { name: 'Research', href: '/resources/research' },
    { name: 'News & Updates', href: '/news' },
    { name: 'Impact Reports', href: '/impact' },
    { name: 'Partners', href: '/partners' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gradient-to-b from-blue-900 to-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">BlueTech Revolution</h3>
            <p className="text-blue-200 leading-relaxed">
              Pioneering innovative solutions for ocean cleaning and marine conservation.
              Together, we can make our oceans cleaner and healthier.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-blue-300 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a 
                    href={resource.href}
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-blue-300" />
              <span className="text-blue-200">contact@bluetechrevolution.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-blue-300" />
              <span className="text-blue-200">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-blue-300" />
              <span className="text-blue-200">123 Ocean Drive, Marine City, MC 12345</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-blue-200">
              © {currentYear} BlueTech Revolution. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-blue-200 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-blue-200 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/sitemap" className="text-blue-200 hover:text-white transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
