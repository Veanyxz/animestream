import "react-responsive-carousel/lib/styles/carousel.min.css";
import Jedi from "./Jedi";
import RecommendCard from "./RecommendCard";
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
        style={{ marginTop: 3 }}
        className="recommend-carousel"
        autoPlay={true}
        showArrows={false}
        breakPoints={breakPoints}
        emulateTouch={true}
        itemPosition="CENTER"
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
      {/* <div className="recommend-carousel"><Jedi  finalQuery={finalQuery}></Jedi></div> */}

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
