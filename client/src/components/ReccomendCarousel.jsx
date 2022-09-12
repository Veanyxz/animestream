import "react-responsive-carousel/lib/styles/carousel.min.css";

import RecommendCard from "./RecommendCard";
import Carousel from "react-elastic-carousel";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
export default function ReccomendCarousel({ finalQuery }) {

  const breakPoints = [
    { width: 1, itemsToShow: 2},

    { width: 500, itemsToShow: 2 },
  ];

  return (
    <>
      <div className="recommend-div">
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
      <Carousel
        style={{ marginTop: 3 }}
        className="recommend-carousel"
        autoPlay={true}
        showArrows={false}
        breakPoints={breakPoints}
        emulateTouch={true}
        pagination={false}
        outerSpacing={25}
        initialActiveIndex={2}
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
    </>
  );
}
