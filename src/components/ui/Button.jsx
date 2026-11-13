import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer flex items-center justify-center';
  
  const variants = {
    primary: 'bg-white/10 border border-white/20 hover:bg-white/20 hover:border-neon-blue/50 text-white',
    neon: 'bg-neon-blue/10 border border-neon-blue/50 hover:bg-neon-blue/20 text-neon-blue box-glow-purple',
    ghost: 'hover:bg-white/10 text-gray-300 hover:text-white',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
