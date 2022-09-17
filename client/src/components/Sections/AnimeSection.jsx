import axios from "axios";
import { useEffect, useState } from "react";

import CarouselRenderer from "../Layouts/CarouselRenderer";

export default function AnimeSection({ sectiontitle, url, id }) {
  const [fetchedData, setFetchedData] = useState([]);
  useEffect(() => {
    axios.get(url).then((data) => {
      setFetchedData(data.data.results);
    });
  }, []);
  return (
    <section className="section section-anime" id={id}>
      {fetchedData.length > 0 && (
        <CarouselRenderer
          url={url}
          finalQuery={fetchedData}
          stretchedA={true}
          rowTitle={sectiontitle}
        ></CarouselRenderer>
      )}
    </section>
  );
}
