import React from 'react';

const NavItem = ({ href, icon: Icon, label, isActive, onClick, colors }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
    if (href && href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <a
      href={href || '#'}
      onClick={handleClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 text-sm ${
        isActive 
          ? 'text-white shadow-lg transform scale-105' 
          : 'text-gray-700 hover:text-white hover:shadow-md'
      }`}
      style={{
        backgroundColor: isActive ? colors.warm : 'transparent',
      }}
    >
      <Icon size={18} />
      <span className="hidden sm:block font-medium">{label}</span>
    </a>
  );
};

export default NavItem;
