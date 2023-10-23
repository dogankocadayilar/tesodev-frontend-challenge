import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import NewsCard from "./NewsCard";
import { useMemo, useState } from "react";

function NewsSlider() {
  // I didn't wrap this inside the useMemo hook because normally this data comes from backend
  const newsData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  const [currentIndex, setCurrentIndex] = useState(0);

  const slideableNumber = useMemo(() => {
    const divider = document.body.clientWidth > 768 ? 3 : 1;

    return Math.ceil(newsData.length / divider) - 1;
  }, [newsData]);

  const showNext = () => {
    setCurrentIndex((prev) => {
      if (prev === slideableNumber) return 0;
      return prev + 1;
    });
  };

  const showPrev = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) return slideableNumber;
      return prev - 1;
    });
  };

  return (
    <div className="py-5 max-w-7xl mx-auto">
      <h2 className="text-4xl pb-5 text-center md:text-left font-bold">
        Top News
      </h2>
      <div className="relative flex items-center overflow-hidden">
        <button
          onClick={showPrev}
          className="absolute bg-gray-200 left-0 rounded-full p-3 mx-2 hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-500 transition-colors z-10"
        >
          <ArrowLeftIcon className="w-8 aspect-square" />
        </button>
        <div
          className="flex md:h-[375px] w-full items-center transition-all duration-500 ease-in-out"
          style={{ translate: `${-100 * currentIndex}%` }}
        >
          {newsData.map((id) => (
            <NewsCard key={id} />
          ))}
        </div>
        <button
          onClick={showNext}
          className="absolute bg-gray-200 right-0 rounded-full p-3 mx-2 hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-500 transition-colors z-10"
        >
          <ArrowRightIcon className="w-8 aspect-square" />
        </button>
      </div>
    </div>
  );
}

export default NewsSlider;
