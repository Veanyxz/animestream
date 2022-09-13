import RecommendCard from "../Cards/RecommendCard";
import Carousel from "react-elastic-carousel";
import { v4 as uuidv4 } from "uuid";
export default function ReccomendCarousel({ finalQuery }) {
  const breakPoints = [
    { width: 1, itemsToShow: 2 },
    { width: 310, itemsToShow: 3 },
    { width: 610, itemsToShow: 4 },
  ];

  return (
    <>
      <Carousel
        className="recommend-carousel"
        style={{ paddingLeft: 4 }}
        autoPlay={true}
        showArrows={false}
        breakPoints={breakPoints}
        emulateTouch={true}
        itemPosition="flex-end"
        pagination={false}
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
    </>
  );
}
