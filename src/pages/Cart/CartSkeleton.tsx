import { TCartResponse } from "./Cart";

export default function CartSkeleton({
  cartItems,
}: {
  cartItems: TCartResponse;
}) {
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col py-8 px-4 dark:text-white">
      {cartItems?.data.items.length === 0 ? (
        <div className="w-full flex flex-col items-center gap-4">
          <div className="w-3/4 h-12 bg-gray-400 animate-pulse rounded-md mb-6"></div>
          <div className="w-1/2 h-10 bg-gray-400 animate-pulse rounded-md"></div>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-6">
            <div className="w-1/4 h-8 bg-gray-400 animate-pulse rounded-md"></div>
          </h1>
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-[35%_65%] gap-10 mb-10"
            >
              {/* Skeleton Image Section */}
              <div className="w-full flex items-center justify-center rounded-lg p-4 bg-gray-300 animate-pulse h-72"></div>

              {/* Skeleton Details Section */}
              <div className="w-full flex flex-col justify-between rounded-lg p-6 bg-gray-300 animate-pulse">
                <div className="h-6 bg-gray-400 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-400 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-400 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-400 rounded w-1/4 mb-2"></div>
                <div className="h-6 bg-gray-400 rounded w-1/3 mb-4"></div>
                <div className="h-10 bg-gray-400 rounded w-1/3"></div>
              </div>
            </div>
          ))}
          {/* Skeleton for total summary */}
          <div className="w-full max-w-5xl flex flex-col gap-4 mt-6 p-6 rounded-lg">
            <div className="w-1/4 h-6 bg-gray-400 animate-pulse rounded-md"></div>
            <div className="w-1/4 h-6 bg-gray-400 animate-pulse rounded-md"></div>
            <div className="w-1/4 h-6 bg-gray-400 animate-pulse rounded-md"></div>
            <div className="w-1/4 h-6 bg-gray-400 animate-pulse rounded-md"></div>
          </div>
        </>
      )}
    </div>
  );
}
