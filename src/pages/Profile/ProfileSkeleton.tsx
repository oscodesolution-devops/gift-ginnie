const ProfileSkeleton = () => {
  return (
    <div className="container mx-auto p-4 mt-20 md:px-40">
      <div className="space-y-6">
        {/* Skeleton User Info Card */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-gray-300 animate-pulse"></div>
              <div>
                <div className="h-6 w-48 bg-gray-300 rounded animate-pulse mb-2"></div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-gray-300 animate-pulse"></div>
                  <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 p-6">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="h-5 w-5 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
                </div>
              ))}
          </div>
        </div>

        {/* Skeleton Addresses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-4 w-8 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                  <div className="space-y-1 text-sm">
                    {Array(4)
                      .fill(null)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="h-4 w-full bg-gray-300 rounded animate-pulse"
                        ></div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
