import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import CarouselCard from "./CarouselCard";
import UpcomingCard from "./UpcomingCard";
import ReccomendCard from "./ReccomendCard";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
export default function ReccomendCarousel({ finalQuery }) {
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  });
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const calculateCenterSlidePercent = () => {
    if (windowSize >= 1700) return 22;
    else if (windowSize >= 1600) return 25;
    else if (windowSize >= 1100) return 44;
    else if (windowSize >= 790) return 40;
    else if (windowSize >= 560) return 40;
    else if (windowSize >= 450) return 45;
    else if (windowSize >= 350) return 50;
    else return 80;
  };
  return (
    <Carousel
      showThumbs={false}
      style={{ backgroundColor: "red" }}
      centerMode={true}
      infiniteLoop={true}
      showIndicators={false}
      centerSlidePercentage={calculateCenterSlidePercent()}
      autoPlay={true}
      showArrows={false}
      showStatus={false}
      emulateTouch={true}
      stopOnHover={true}
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
  );
}
