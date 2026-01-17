'use client';

import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

const MobileMenu = ({ isOpen, onClose, user }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg z-20">
      <div className="px-4 py-4 space-y-3">
        <Link 
          href="/" 
          className="block py-3 px-4 text-sm font-semibold hover:bg-neutral-100 rounded-lg transition"
          onClick={onClose}
        >
          Home
        </Link>
        <div className="py-3 px-4 text-sm font-semibold hover:bg-neutral-100 rounded-lg transition cursor-pointer">
          Springbnb your home
        </div>
        {user?.role === 'TENANT' && (
          <Link 
            href="/dashboard" 
            className="block py-3 px-4 text-sm font-semibold hover:bg-neutral-100 rounded-lg transition"
            onClick={onClose}
          >
            Dashboard
          </Link>
        )}
        <div className="border-t pt-3">
          {user.name ? (
            <Link 
              href="/profile" 
              className="block py-3 px-4 text-sm font-semibold hover:bg-neutral-100 rounded-lg transition"
              onClick={onClose}
            >
              <div className="flex items-center gap-3">
                <FaUserCircle size={24} className="text-gray-500" />
                <span>{user.name}</span>
              </div>
            </Link>
          ) : (
            <Link 
              href="/login" 
              className="block py-3 px-4 text-sm font-semibold text-rose-500 hover:bg-neutral-100 rounded-lg transition"
              onClick={onClose}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
