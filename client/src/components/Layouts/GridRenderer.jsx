import { Container, Row, Col } from "react-grid-system";
import { setConfiguration } from "react-grid-system";
import { v4 as uuidv4 } from "uuid";
import GridCard from "../Cards/GridCard";

setConfiguration({ breakpoints: [768, 1100, 1800, 1920, 2100] });

const GridRenderer = ({ finalQuery, setAnimeInfo }) => {
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
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GridRenderer;
