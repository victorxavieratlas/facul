import React from 'react';

const ProfileInfoSkeleton: React.FC = () => {
  return (
    <div className="p-5 pt-4 mb-6 shadow rounded-b-lg animate-pulse">
      {/* Name Placeholder */}
      <div className="mb-3 h-8 bg-gray-300 rounded w-1/2"></div>

      {/* Location Placeholder */}
      <div className="flex items-center mb-1.5">
        {/* SVG Icon Placeholder */}
        <div className="w-4 h-4 bg-gray-300 rounded-full mr-2"></div>
        {/* Text Placeholder */}
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>

      {/* Days Placeholder */}
      <div className="flex items-center mb-1.5">
        <div className="w-4 h-4 bg-gray-300 rounded-full mr-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>

      {/* Hours Placeholder */}
      <div className="flex items-center mb-3">
        <div className="w-4 h-4 bg-gray-300 rounded-full mr-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      </div>

      {/* Price Placeholder */}
      <div className="flex items-center my-4">
        <div className="h-5 bg-gray-300 rounded w-1/4 mr-2"></div>
        <div className="h-5 bg-gray-300 rounded w-1/6"></div>
      </div>
    </div>
  );
};

export default ProfileInfoSkeleton;
