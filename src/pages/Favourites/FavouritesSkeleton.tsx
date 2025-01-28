export default function FavouritesSkeleton() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col py-8 px-4 dark:text-white">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-[35%_65%] gap-10 mb-10">
        {/* Skeleton Loader for Image Section (35%) */}
        <div className="w-full dark:border-white dark:border-2 flex items-center justify-center rounded-lg p-4 shadow-md animate-pulse">
          <div className="w-full h-32 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        </div>
        {/* Skeleton Loader for Details Section (65%) */}
        <div className="w-full dark:border-white dark:border-2 flex flex-col justify-between gap-4 rounded-lg p-6 shadow-md animate-pulse">
          <div className="w-1/3 h-8 bg-gray-300 dark:bg-gray-700 rounded-md mb-2"></div>
          <div className="w-full h-6 bg-gray-300 dark:bg-gray-700 rounded-md mb-4"></div>
          <div className="flex justify-start gap-4 items-center text-lg">
            <div className="w-1/4 h-6 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
            <div className="w-1/4 h-6 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
