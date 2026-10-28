import React from 'react';

export default function IconBadge({ 
  icon: Icon, 
  size = 'md', 
  variant = 'blue', 
  className = '',
  glowing = true
}) {
  const sizeClasses = {
    xs: 'w-7 h-7 p-1 rounded-lg',
    sm: 'w-8 h-8 p-1.5 rounded-xl',
    md: 'w-10 h-10 p-2 rounded-xl',
    lg: 'w-12 h-12 p-2.5 rounded-2xl',
    xl: 'w-14 h-14 p-3 rounded-2xl'
  };

  const iconSizes = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  };

  const variantStyles = {
    blue: 'bg-blue-500/15 border-blue-500/35 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.25)]',
    white: 'bg-white/10 border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)]',
    emerald: 'bg-emerald-500/15 border-emerald-500/35 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]',
    amber: 'bg-amber-500/15 border-amber-500/35 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]',
    rose: 'bg-rose-500/15 border-rose-500/35 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.25)]'
  };

  return (
    <div 
      className={`glass-icon relative inline-flex items-center justify-center border backdrop-blur-md transition-all duration-300 hover:scale-105 ${sizeClasses[size] || sizeClasses.md} ${variantStyles[variant] || variantStyles.blue} ${className}`}
    >
      {Icon && <Icon className={`${iconSizes[size] || iconSizes.md} shrink-0 transition-transform duration-200`} />}
    </div>
  );
}
