export default function HomeHeading({ heading }: { heading: string }) {
  return (
    <div className="w-full text-center uppercase font-bold text-3xl px-4 sm:text-4xl mb-4 dark:text-white">
      {heading}
    </div>
  );
}
