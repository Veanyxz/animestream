import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import RecommendCard from "./RecommendCard";
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
        <RecommendCard
          title={query.title.english}
          image={query.image}
          key={uuidv4()}
          rating={query.rating}
          id={query.id}
        ></RecommendCard>
      ))}
    </Carousel>
  ) : (
    <div
      className="recommend-div"
      style={{
        display: "grid",
        height: "fit-content",
        gridTemplateColumns: " repeat(auto-fit, minmax(200px, 1fr))",
      }}
    >
      {finalQuery.map((query, index) =>
        index <= 9 ? (
          <RecommendCard
            title={query.title.english}
            image={query.image}
            key={uuidv4()}
            rating={query.rating}
            id={query.id}
          ></RecommendCard>
        ) : null
      )}
    </div>
  );
}
