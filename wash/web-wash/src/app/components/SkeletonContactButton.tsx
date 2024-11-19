import React from 'react';

interface SkeletonButtonProps {
  className?: string;
}

const SkeletonButton: React.FC<SkeletonButtonProps> = ({ className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="h-12 bg-gray-300 rounded-lg"></div>
    </div>
  );
};

export default SkeletonButton;