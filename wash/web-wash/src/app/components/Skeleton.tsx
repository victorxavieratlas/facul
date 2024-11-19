export default function Skeleton() {
    return (
      <div className="animate-pulse">
        {/* Your skeleton loading UI */}
        <div className="h-96 bg-gray-300 rounded"></div>
        <div className="p-5">
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
          {/* ... */}
        </div>
      </div>
    );
  }