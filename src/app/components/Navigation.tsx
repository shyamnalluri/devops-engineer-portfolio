import React from 'react';
import Link from 'next/link';

const navItems = [
  { name: 'HOME', href: '#home' },
  { name: 'ABOUT ME', href: '#about' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'CERTIFICATIONS', href: '#certifications' },
  { name: 'CONTACT', href: '#contact' }
];

const Navigation: React.FC = () => {
  return (
    <nav className="fixed inset-y-0 left-0 w-[214px] bg-black text-white flex flex-col z-50">
      {/* Logo Section */}
      <div className="px-6 py-8">
        <h1 className="text-3xl font-bold text-white">
          SN
        </h1>
      </div>

      {/* Menu Links */}
      <div className="flex-1 flex flex-col">
        <ul className="flex flex-col py-8">
          {navItems.map((item, index) => (
            <li key={item.name} className="block">
              <Link
                href={item.href}
                className={`block px-10 py-4 text-base font-normal hover:text-orange-500 transition-all ${
                  index === 0 
                    ? 'border-l-2 border-orange-500 text-orange-500 font-medium' 
                    : 'border-l-2 border-transparent hover:border-gray-700'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="px-6 pb-4 text-xs text-gray-500 mt-auto">
        <p>Copyright ©2024 Shyam</p>
        <p className="mt-1">Nalluri. All right reserved.</p>
      </div>
    </nav>
  );
};

export default Navigation;