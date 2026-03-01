import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  variant = 'rectangular', 
  width, 
  height 
}) => {
  const styles: React.CSSProperties = {
    width: width,
    height: height,
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'rounded h-3 w-full';
      case 'circular':
        return 'rounded-full';
      case 'rounded':
        return 'rounded-lg';
      case 'rectangular':
      default:
        return '';
    }
  };

  return (
    <div 
      className={`animate-skeleton bg-[#E8E8E8] ${getVariantClasses()} ${className}`}
      style={styles}
    />
  );
};

export default Skeleton;
