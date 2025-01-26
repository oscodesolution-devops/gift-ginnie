
const CarouselImagesLoading = () => {
  const placeholderCount = 8; // Number of placeholders to match the scrolling layout

  return (
    <div className="w-full relative overflow-hidden">
      <div
        className="flex gap-4 px-4 md:px-8 animate-pulse"
        style={{
          width: `calc(${placeholderCount} * 200px)`,
        }}
      >
        {/* Placeholder skeletons */}
        {Array.from({ length: placeholderCount }).map((_, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-[200px] h-[300px] rounded-lg bg-gray-300"
          ></div>
        ))}
      </div>
    </div>
  );
};
export default CarouselImagesLoading;
