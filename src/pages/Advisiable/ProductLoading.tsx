
export default function ProductSkeleton() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col">
      <div className="px-6 py-16 md:py-20 dark:text-white w-full">
        <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 mb-8 animate-pulse"></div>
        <div className="flex flex-col gap-8 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 cursor-pointer animate-pulse"
            >
              <div className="relative">
                <div className="w-full h-64 bg-gray-200 dark:bg-gray-700"></div>
                <div className="absolute top-5 right-4 w-20 h-6 bg-gray-300 dark:bg-gray-600 rounded-sm"></div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="w-1/2 h-6 bg-gray-200 dark:bg-gray-700"></div>
                <div className="w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded-sm"></div>
              </div>
              <div className="flex justify-between items-center text-lg">
                <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700"></div>
                <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
    </div>
  );
}
