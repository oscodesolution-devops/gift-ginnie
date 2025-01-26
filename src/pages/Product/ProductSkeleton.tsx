export default function ProductSkeleton() {
  return (
    <div className="w-full min-h-screen sm:mt-20">
      <div className="w-full pt-5 md:grid md:grid-cols-2 gap-8 px-6 md:px-7">
        {/* Image Skeleton */}
        <div className="w-full md:sticky md:top-20 h-auto md:h-[calc(100vh-2rem)] mb-6 md:mb-0 animate-pulse">
          <div className="w-full h-[300px] md:h-[90%] bg-gray-300 dark:bg-gray-700"></div>
        </div>

        {/* Content Skeleton */}
        <div className="dark:text-primary md:h-[calc(100vh-2rem)] md:overflow-y-auto custom-scrollbar animate-pulse">
          <div className="flex flex-col gap-4 border-b dark:border-white/30 pb-6">
            <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700"></div>
            <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700"></div>
            <div className="flex gap-2 flex-wrap">
              <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700"></div>
            </div>
          </div>

          <div className="flex justify-between items-center py-6 border-b dark:border-white/30">
            <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700"></div>
            <div className="flex gap-4 text-sm">
              <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700"></div>
            </div>
          </div>

          <div className="py-6 border-b dark:border-white/30 flex flex-col gap-4">
            <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700"></div>
            <div className="flex gap-2 flex-wrap">
              <div className="h-14 w-14 md:w-16 md:h-16 bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-14 w-14 md:w-16 md:h-16 bg-gray-300 dark:bg-gray-700"></div>
            </div>
          </div>

          <div className="py-6 flex flex-col gap-4">
            <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700"></div>
            <div className="h-3 w-2/3 bg-gray-300 dark:bg-gray-700"></div>
            <div className="h-3 w-3/4 bg-gray-300 dark:bg-gray-700"></div>
          </div>

          <div className="mb-6">
            <div className="h-12 w-full bg-gray-300 dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
