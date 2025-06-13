import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { signOut } from '../../lib/auth';
import { LogOut, Settings, ChevronDown, UserCircle, User, Bell, CreditCard, HelpCircle, Heart } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/auth-js';
import AuthModal from './AuthModal';

interface UserMenuState {
  isAuthModalOpen: boolean;
  isDropdownOpen: boolean;
  notifications: number;
}

export default function UserMenu() {
  const { user } = useAuth();
  const [{ isAuthModalOpen, isDropdownOpen, notifications }, setState] = useState<UserMenuState>({
    isAuthModalOpen: false,
    isDropdownOpen: false,
    notifications: 2
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setState(prev => ({ ...prev, isDropdownOpen: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setState(prev => ({ ...prev, isDropdownOpen: false }));
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getInitials = (user: SupabaseUser) => {
    if (user.user_metadata?.full_name) {
      const fullName: string = user.user_metadata.full_name;
      const names: string[] = fullName.split(' ');
      const initials: string = names.map((name: string) => name[0]).join('').toUpperCase();
      return initials;
    }
    return user.email?.[0].toUpperCase() || '?';
  };

  const menuItems = [
    { label: 'Profile', icon: UserCircle, onClick: () => console.log('Profile clicked') },
    { label: 'Notifications', icon: Bell, onClick: () => console.log('Notifications clicked'), badge: notifications },
    { label: 'Settings', icon: Settings, onClick: () => console.log('Settings clicked') },
    { label: 'Subscriptions', icon: CreditCard, onClick: () => console.log('Subscriptions clicked') },
    { label: 'Help & Support', icon: HelpCircle, onClick: () => console.log('Help clicked') },
    { label: 'Sign Out', icon: LogOut, onClick: handleSignOut, className: 'text-red-600 hover:text-red-700 border-t border-gray-100 mt-2 pt-2' },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {user ? (
        <>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setState(prev => ({ ...prev, isDropdownOpen: !prev.isDropdownOpen }))}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="User menu"
          >
            <div className="relative">
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium overflow-hidden shadow-md">
                {getInitials(user)}
                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity"></div>
              </div>
              {notifications > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center shadow-sm"
                >
                  {notifications}
                </motion.span>
              )}
            </div>
            <span className="hidden sm:block text-white font-medium">
              {user.user_metadata?.full_name || user.email?.split('@')[0]}
            </span>
            <motion.div
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-4 w-4 text-blue-300" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 20 }}
                className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-2xl border border-gray-100 py-2 z-50"
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                      {getInitials(user)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.user_metadata?.full_name || user.email}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex justify-between">
                      <div className="text-xs text-gray-500">Member since</div>
                      <div className="text-xs font-medium">Apr 2023</div>
                    </div>
                    <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 w-3/4 rounded-full"></div>
                    </div>
                    <div className="mt-1 flex justify-between items-center">
                      <div className="text-xs font-medium text-blue-600 flex items-center gap-1">
                        <Heart className="h-3 w-3 fill-blue-600" />
                        Pro Member
                      </div>
                      <div className="text-xs text-blue-600 font-medium">75%</div>
                    </div>
                  </div>
                </div>
                
                <div className="py-1">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={index}
                      onClick={item.onClick}
                      whileHover={{ x: 5, backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                      className={`w-full px-4 py-2 text-sm text-left flex items-center gap-3 hover:bg-blue-50 transition-colors ${item.className || 'text-gray-700'}`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto bg-red-100 text-red-600 text-xs font-medium px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setState(prev => ({ ...prev, isAuthModalOpen: true }))}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg transition-all duration-300 shadow-lg"
        >
          <User className="h-5 w-5" />
          <span className="font-medium">Sign In</span>
        </motion.button>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setState(prev => ({ ...prev, isAuthModalOpen: false }))}
      />
    </div>
  );
}