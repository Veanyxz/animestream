import CarouselRenderer from "./CarouselRenderer";
export default function ReccomendCarousel({ finalQuery, rowTitle }) {
  return (
    <>
      <CarouselRenderer
        finalQuery={finalQuery}
        stretchedA={true}
        rowTitle={rowTitle}
      ></CarouselRenderer>
    </>
  );
}
