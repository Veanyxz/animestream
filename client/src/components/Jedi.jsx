import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { v4 as uuidv4 } from "uuid";

import RecommendCard from "./RecommendCard";
export default function Jedi({ finalQuery }) {
  const settings = {
    dots: false,
    infinite: true,

    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };
  return (
    <div className="jedi" style={{ marginTop: 3, paddingBottom: 30 ,textAlign:"center",background:"red",padding:30}}>
      <Slider
        adaptiveHeight={true}
        
        // centerMode={true}
        // centerPadding={"100px"}
        autoplaySpeed={2000}
        arrows={false}
        swipeToSlide={true}
        autoplay={true}
        {...settings}
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
      </Slider>
    </div>
  );
}
