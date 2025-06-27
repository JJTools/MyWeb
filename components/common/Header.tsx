'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes, FaFire, FaGamepad, FaTools, FaLink } from 'react-icons/fa';

const navItems = [
  { name: '首页', href: '/', icon: null },
  { name: '热门', href: '/hot', icon: <FaFire /> },
  { name: '游戏', href: '/games', icon: <FaGamepad /> },
  { name: '工具', href: '/tools', icon: <FaTools /> },
  { name: '阅后即焚', href: '/burn-after-reading', icon: <FaLink /> },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary-600">多功能网站</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-colors ${
                    isActive
                      ? 'text-primary-600 font-medium'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon && <span>{item.icon}</span>}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                      isActive
                        ? 'bg-primary-50 text-primary-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.icon && <span>{item.icon}</span>}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 