export default function OrderSkeleton() {
    return (
      <div className="w-full min-h-screen p-4 mt-20 flex justify-center dark:text-white">
        <div className="w-full max-w-7xl space-y-8">
          {/* Skeleton Order Card */}
          {[1, 2].map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-black/50 rounded-lg shadow-lg p-6 animate-pulse"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Skeleton Order Info */}
                <div className="lg:w-1/3 space-y-6">
                  <div className="bg-gray-200 dark:bg-gray-800/50 rounded-lg p-4 space-y-2">
                    <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="grid grid-cols-2 gap-2">
                      {Array(6)
                        .fill("")
                        .map((_, i) => (
                          <div
                            key={i}
                            className={`h-4 w-${i % 2 === 0 ? "20" : "24"} bg-gray-300 dark:bg-gray-700 rounded`}
                          ></div>
                        ))}
                    </div>
                  </div>
  
                  {/* Skeleton Delivery Address */}
                  <div className="bg-gray-200 dark:bg-gray-800/50 rounded-lg p-4 space-y-2">
                    <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="space-y-2">
                      {Array(4)
                        .fill("")
                        .map((_, i) => (
                          <div key={i} className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
                        ))}
                    </div>
                  </div>
                </div>
  
                {/* Skeleton Products List */}
                <div className="lg:w-2/3 space-y-6">
                  <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  {[1, 2].map((_, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-200 dark:bg-gray-800/50 rounded-lg p-4 flex flex-col md:flex-row gap-4"
                    >
                      <div className="md:w-1/3 h-48 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                      <div className="md:w-2/3 space-y-2">
                        <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="grid grid-cols-2 gap-2">
                          {Array(6)
                            .fill("")
                            .map((_, i) => (
                              <div
                                key={i}
                                className={`h-4 w-${i % 2 === 0 ? "20" : "24"} bg-gray-300 dark:bg-gray-700 rounded`}
                              ></div>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  