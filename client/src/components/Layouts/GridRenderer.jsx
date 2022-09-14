import { Container, Row, Col } from "react-grid-system";
import { setConfiguration } from "react-grid-system";
import { v4 as uuidv4 } from "uuid";
import GridCard from "../Cards/GridCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

setConfiguration({ breakpoints: [768, 1100, 1800, 1920, 2100] });
const GridRenderer = ({ finalQuery, setAnimeInfo, isAnimate }) => {
  useEffect(() => {
    setIsAnimated(isAnimate);
  }, [isAnimate]);
  const [isAnimated, setIsAnimated] = useState(true);
  return (
    <Container fluid={true}>
      <Row justify="center" gutterWidth={12}>
        {finalQuery.map((query, index) => (
          <Col
            align="center"
            xxl={2}
            md={3}
            sm={4}
            xs={3.95}
            lg={2}
            key={uuidv4()}
          >
            <motion.div
              initial={
                isAnimated
                  ? {
                      opacity: 0,
                      translateX: index % 2 === 0 ? -50 : 50,
                      translateY: -50,
                    }
                  : {}
              }
              animate={
                isAnimated ? { opacity: 1, translateX: 0, translateY: 0 } : {}
              }
              transition={{ duration: 0.3, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <GridCard
                setAnimeInfo={setAnimeInfo}
                title={query.title.english}
                id={query.id}
                image={query.image}
                key={uuidv4()}
                rating={query.rating}
                year={query.releaseDate}
                episodeNumber={query.episodeNumber ? query.episodeNumber : 0}
                results={query}
              ></GridCard>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GridRenderer;
