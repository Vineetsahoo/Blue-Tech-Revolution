import  { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { signOut } from '../../lib/auth';
import { LogOut, Settings, ChevronDown, UserCircle, User } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/auth-js';
import { motion, AnimatePresence } from 'framer-motion';
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
    { label: 'Settings', icon: Settings, onClick: () => console.log('Settings clicked') },
    { label: 'Sign Out', icon: LogOut, onClick: handleSignOut, className: 'text-red-600 hover:text-red-700' },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {user ? (
        <>
          <button
            onClick={() => setState(prev => ({ ...prev, isDropdownOpen: !prev.isDropdownOpen }))}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                {getInitials(user)}
              </div>
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </div>
            <span className="hidden sm:block text-gray-700 font-medium">
              {user.email?.split('@')[0]}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-gray-100 py-1 z-50"
              >
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{user.email}</p>
                  <p className="text-xs text-gray-500">Signed in</p>
                </div>
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className={`w-full px-4 py-2 text-sm text-left flex items-center gap-2 hover:bg-gray-50 transition-colors ${item.className || 'text-gray-700'}`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setState(prev => ({ ...prev, isAuthModalOpen: true }))}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
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