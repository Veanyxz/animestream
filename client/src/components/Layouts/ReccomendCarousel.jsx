import RecommendCard from "../Cards/RecommendCard";
import Carousel from "react-elastic-carousel";
import { v4 as uuidv4 } from "uuid";
import CarouselRenderer from "./CarouselRenderer";
import AnimeSection from "../Sections/AnimeSection";
export default function ReccomendCarousel({ finalQuery,rowTitle }) {
  const breakPoints = [
    { width: 1, itemsToShow: 2 },
    { width: 310, itemsToShow: 3 },
    { width: 610, itemsToShow: 4 },
  ];

  return (
    <>
      <CarouselRenderer
        finalQuery={finalQuery}
        stretchedA={true}
        rowTitle = {rowTitle}
      ></CarouselRenderer>
    </>
  );
}
