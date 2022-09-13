import Carousel from "react-elastic-carousel";

import HeaderCarouselCard from "../Cards/HeaderCarouselCard";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, useRef } from "react";

const HeaderCarouselRenderer = ({ finalResults }) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const carouselRef = useRef(null);
  let resetTimeout;
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  });
  return (
    <Carousel
      enableAutoPlay={true}
      ref={carouselRef}
      showArrows={false}
      autoPlaySpeed={2000}
      onNextEnd={({ index }) => {
        clearTimeout(resetTimeout);
        resetTimeout = setTimeout(() => {
          carouselRef?.current?.goTo(0);
        }, 4000);
      }}
      pagination={windowSize > 800 ? true : false}
    >
      {finalResults.map((item) => (
        <HeaderCarouselCard
          key={uuidv4()}
          id={item.id}
          epcount={item.totalEpisodes}
          year={item.releaseDate}
          duration={item.duration}
          title={item.title.english}
          description={item.description}
          cover={item.cover}
          coversmall={item.image}
        ></HeaderCarouselCard>
      ))}
    </Carousel>
  );
};

export default HeaderCarouselRenderer;
