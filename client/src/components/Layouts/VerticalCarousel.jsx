import Carousel from "react-elastic-carousel";
import { v4 as uuidv4 } from "uuid";
import CarouselCard from "../Cards/CarouselCard";
export default function VerticalCarousel({ finalQuery, rowTitle }) {
  return (
    <div className="vertical-grid-container">
      <h1 className="row-title" style={{ marginLeft: 17 }}>
        {rowTitle}
      </h1>
      <div className="vertical-grid">
        {finalQuery.map((query) => (
          <CarouselCard
            title={query.title.english}
            image={query.image}
            key={uuidv4()}
            rating={query.rating}
            id={query.id}
            rowTitle={rowTitle}
          ></CarouselCard>
        ))}
      </div>
    </div>
  );
}
