import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function IconBadge({ 
  icon: Icon, 
  size = 'md', 
  variant = 'primary', 
  className = '',
  glowing = false,
  pulse = false,
  style = {}
}) {
  const { theme } = useTheme();

  const sizeClasses = {
    xs: 'w-6 h-6 p-1 text-xs rounded-md',
    sm: 'w-8 h-8 p-1.5 text-sm rounded-lg',
    md: 'w-10 h-10 p-2 text-base rounded-xl',
    lg: 'w-12 h-12 p-2.5 text-lg rounded-2xl',
    xl: 'w-14 h-14 p-3 text-xl rounded-2xl'
  };

  const iconSizes = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  };

  // Themed styles based on active theme
  let containerStyles = {};
  let iconStyles = {};

  if (variant === 'primary') {
    containerStyles = {
      backgroundColor: theme.primaryMuted,
      borderColor: theme.primaryBorder,
      boxShadow: glowing ? `0 0 16px ${theme.glow}` : `0 0 8px ${theme.primaryMuted}`
    };
    iconStyles = { color: theme.primary };
  } else if (variant === 'success') {
    containerStyles = {
      backgroundColor: 'rgba(16, 185, 129, 0.15)',
      borderColor: 'rgba(16, 185, 129, 0.4)',
      boxShadow: glowing ? '0 0 16px rgba(16, 185, 129, 0.35)' : 'none'
    };
    iconStyles = { color: '#10B981' };
  } else if (variant === 'warning') {
    containerStyles = {
      backgroundColor: 'rgba(245, 158, 11, 0.15)',
      borderColor: 'rgba(245, 158, 11, 0.4)',
      boxShadow: glowing ? '0 0 16px rgba(245, 158, 11, 0.35)' : 'none'
    };
    iconStyles = { color: '#F59E0B' };
  } else if (variant === 'danger') {
    containerStyles = {
      backgroundColor: 'rgba(239, 68, 68, 0.15)',
      borderColor: 'rgba(239, 68, 68, 0.4)',
      boxShadow: glowing ? '0 0 16px rgba(239, 68, 68, 0.35)' : 'none'
    };
    iconStyles = { color: '#EF4444' };
  } else {
    // Glass default
    containerStyles = {
      backgroundColor: theme.bgSurface,
      borderColor: theme.cardBorder
    };
    iconStyles = { color: theme.primaryLight };
  }

  return (
    <div 
      className={`relative inline-flex items-center justify-center border backdrop-blur-md transition-all duration-300 hover:scale-105 ${sizeClasses[size] || sizeClasses.md} ${className}`}
      style={{ ...containerStyles, ...style }}
    >
      {pulse && (
        <span 
          className="absolute -top-1 -right-1 flex h-2.5 w-2.5"
        >
          <span 
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ backgroundColor: theme.primary }}
          />
          <span 
            className="relative inline-flex rounded-full h-2.5 w-2.5"
            style={{ backgroundColor: theme.primary }}
          />
        </span>
      )}
      {Icon && <Icon className={`${iconSizes[size] || iconSizes.md} shrink-0 transition-transform duration-200`} style={iconStyles} />}
    </div>
  );
}
