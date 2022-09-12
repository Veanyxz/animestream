import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";
import CarouselCard from "./CarouselCard";
import UpcomingCard from "./UpcomingCard";
import ReccomendCard from "./ReccomendCard";
import Carousel from "react-elastic-carousel";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
export default function ReccomendCarousel({ finalQuery }) {
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
      console.log(windowSize);
    });
  });
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const breakPoints = [
    { width: 1, itemsToShow: 2 },

    { width: 500, itemsToShow: 2 },

    { width: 950, itemsToShow: 3 },

    { width: 1200, itemsToShow: 5 },
    { width: 1673, itemsToShow: 1 },
  ];

  return windowSize < 600 ? (
    <Carousel
      autoPlay={true}
      outerSpacing={25}
      emulateTouch={true}
      initialActiveIndex={3}
      breakPoints={breakPoints}
      pagination={false}
      showArrows={false}
    >
      {finalQuery.map((query, index) => (
        <ReccomendCard
          title={query.title.english}
          image={query.image}
          key={uuidv4()}
          rating={query.rating}
          id={query.id}
        ></ReccomendCard>
      ))}
    </Carousel>
  ) : (
    <div className="recommend-div">
      {finalQuery.map((query, index) =>
        index <= 9 ? (
          <ReccomendCard
            title={query.title.english}
            image={query.image}
            key={uuidv4()}
            rating={query.rating}
            id={query.id}
          ></ReccomendCard>
        ) : null
      )}
    </div>
  );
}

