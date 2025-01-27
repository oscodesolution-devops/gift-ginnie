export default function CartSkeleton() {
  return (
    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-[35%_65%] gap-10 mb-10">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="w-full flex gap-10 mb-10">
          {/* Skeleton Image Section */}
          <div className="w-1/3 h-72 bg-gray-300 animate-pulse rounded-md"></div>

          {/* Skeleton Details Section */}
          <div className="w-2/3 flex flex-col justify-between rounded-lg p-6 bg-gray-300 animate-pulse">
            <div className="h-6 bg-gray-400 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-400 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-400 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-400 rounded w-1/4 mb-2"></div>
            <div className="h-6 bg-gray-400 rounded w-1/3 mb-4"></div>
            <div className="h-10 bg-gray-400 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
