import { v4 as uuidv4 } from "uuid";
import CarouselCard from "../Cards/CarouselCard";
import { motion } from "framer-motion";

export default function VerticalCarousel({ finalQuery, rowTitle, isAnimated }) {
  return (
    <div className="vertical-grid-container">
      <h1
        className="row-title"
        style={{ marginLeft: 17, color: "#D8D8D8" }}
      >
        {rowTitle}
      </h1>
      <div className="vertical-grid">
        {finalQuery.map((query, index) => (
          <motion.div
            initial={{
              opacity: 0,
              translateX: -50,
            }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <CarouselCard
              title={query.title.english}
              image={query.image}
              key={uuidv4()}
              rating={query.rating}
              id={query.id}
              rowTitle={rowTitle}
            ></CarouselCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
