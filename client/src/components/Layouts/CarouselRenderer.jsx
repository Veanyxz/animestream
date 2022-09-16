import Carousel from "react-elastic-carousel";
import { v4 as uuidv4 } from "uuid";
import CarouselCard from "../Cards/CarouselCard";
import UpcomingCard from "../Cards/UpcomingCard";

export default function CarouselRenderer({
  finalQuery,
  rowTitle,
  isRecent,
  isUpcoming,
  stretchedA,
  initialActiveIndex,
  setIsPlaying,
  setTrailerId,
}) {
  const breakPoints = [
    { width: 1, itemsToShow: isUpcoming ? 2 : 3 },

    { width: 600, itemsToShow: isUpcoming ? 2 : 4 },
    { width: 800, itemsToShow: isUpcoming ? 3 : 4 },
    { width: 900, itemsToShow: isUpcoming ? 4 : 5 },

    { width: 1440, itemsToShow: isUpcoming ? 4 : 6 },
    { width: 1760, itemsToShow: isUpcoming ? 4 : 7 },
    { width: 1920, itemsToShow: isUpcoming ? 4 : 8 },
  ];

  return (
    <div className="carouselinstance">
      <h1
        className="row-title"
        style={{
          color: "#fdba74",
          fontSize: "3rem",
          width: "60%",
          marginLeft: "21px",
          marginBottom: "5px",
        }}
      >
        {rowTitle}
      </h1>
      <Carousel
        initialActiveIndex={initialActiveIndex}
        enableTilt={true}
        enableAutoPlay={true}
        autoPlaySpeed={6000}
        pagination={true}
        showArrows={false}
        breakPoints={breakPoints}
      >
        {finalQuery.map((query, index) =>
          stretchedA ? (
            <CarouselCard
              title={query.title.english}
              image={query.image}
              key={uuidv4()}
              rating={query.rating}
              id={query.id}
              rowTitle={rowTitle}
              episodeNumber={query.episodeNumber ? query.episodeNumber : 0}
            ></CarouselCard>
          ) : (
            <UpcomingCard
              setTrailerId={setTrailerId}
              setIsPlaying={setIsPlaying}
              title={query.title}
              image={query.images.jpg.large_image_url}
              key={uuidv4()}
              rowTitle={rowTitle}
              episodeNum={isRecent ? query.episode : 0}
              trailerVideoId={
                query.trailer !== null ? query.trailer.youtube_id : 0
              }
            ></UpcomingCard>
          )
        )}
      </Carousel>
    </div>
  );
}
